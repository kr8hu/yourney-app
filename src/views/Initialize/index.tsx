//React
import {
    useEffect,
    useContext,
    useState
} from 'react';

//Capacitor
import { Device } from '@capacitor/device';

//Onsen UI
import {
    Page,
    ProgressCircular
} from 'react-onsenui';

//Axios
import axios from 'axios';

//Views
import Landing from '../Landing';

//Context
import { AppContext } from '../../context/App';
import { UserContext } from '../../context/User';
import { DialogContext } from '../../context/Dialog';

//Components
import Text from '../../components/Text';
import Container from '../../components/Container';
import PatternLayout from '../../components/layouts/PatternLayout';

//Services
import PlanService from '../../services/PlanService';
import MediaCacheService from '../../services/MediaCacheService';
import NotificationService from '../../services/NotificationService';

//Interfaces
import Post from '../../interfaces/Post';
import MediaCache from '../../interfaces/MediaCache';
import DialogState from '../../interfaces/DialogState';

//Shared
import xml from '../../shared/strings.xml';
import {
    actionTypes,
    dialogTypes,
    loadingStates,
    url,
} from '../../shared/const';
import { blobToBase64 } from '../../shared/utils';

//Assets
import pattern from '../../assets/images/backgrounds/splash.jpg';

//Styles
import styles from './Initialize.module.css';


/**
 * Props
 * 
 */
interface Props {
    navigator: any;
}


/**
 * Initialize
 *  
 * @returns
 */
function Initialize({ navigator }: Props) {
    //Context
    const { userState } = useContext(UserContext);
    const { setAppState } = useContext(AppContext);
    const { setDialogState } = useContext(DialogContext);


    //States
    const [progress, setProgress] = useState<number>(loadingStates.init);
    const [progressText, setProgressText] = useState<string>("Betöltés");


    useEffect(() => {
        switch (progress) {
            case loadingStates.init: {
                setProgress(loadingStates.strings);
                return;
            }
            case loadingStates.strings: {
                getStrings();
                setProgressText("Alkalmazás adatok betöltése");
                return;
            }
            case loadingStates.content: {
                getContent();
                setProgressText("Tartalom lekérése");
                return;
            }
            case loadingStates.notifications: {
                getNotifications();
                setProgressText("Értesítések lekérése");
                return;
            }
            case loadingStates.device: {
                getDeviceInfo();
                setProgressText("Eszközadatok lekérése");
                return;
            }
            default: {
                openApplication();
                setProgressText("Alkalmazás megnyitása");
                return;
            }
        }
        //eslint-disable-next-line
    }, [progress]);


    /**
     * getStrings
     * 
     * Szöveges tartalmak betöltése xml fájlból
     */
    const getStrings = async () => {
        const config = {
            method: 'GET',
            url: xml,
            headers: {
                "Content-Type": "application/xml; charset=utf-8"
            },
        }

        const response = await axios.request(config);

        if (response) {
            localStorage.setItem("Yourney_strings", response.data);
            setProgress((current: number) => current + 1);
        }
    }


    /**
     * getContent
     * 
     * Jóváhagyott bejegyzések lekérése és betöltése a statebe
     * 
     * @returns 
     */
    const getContent = async () => {
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: "",
            closeable: false,
            onClose: () => openApplication()
        }

        try {
            const response = await PlanService.findApproved();

            if (response?.data) {
                localStorage.setItem("Yourney_cache", JSON.stringify(response.data));

                createMediaCache();

                setAppState(actionTypes.app.SET_CACHE, response.data);
                setProgress((current: number) => current + 1);
            }
        }
        catch (error) {
            dialogState.text = `Hiba lépett fel a tartalmak lekérdezésekor.`;
            setDialogState(dialogState);
        }
    }


    /**
     * createMediaCache
     * 
     * Médiatartalmak gyorsítótárazása
     * @returns 
     */
    const createMediaCache = async () => {
        //Cache array
        let mediaCache: Array<MediaCache> = [];

        //Bejegyzések cache
        const storedCache = localStorage.getItem("Yourney_cache");

        if (storedCache !== null) {
            //Cache parseolása json formátumra
            const posts: Array<Post> = JSON.parse(storedCache);

            //Bejegyzés fotói
            for (let post of posts) {
                for (let i = 0; i < post.photos.length; i++) {
                    //Kép url
                    const photoUrl = `${url}/public/images/plans/${post.photos[i]}`;

                    //Kép átalakítása base64 formátumra
                    const base64image = await blobToBase64(photoUrl);

                    //Tárolás a mediacache-ben
                    mediaCache.push({
                        key: post.photos[i],
                        value: base64image
                    });
                }

                //Helyszín fotói
                for (let location of post.locations) {
                    for (let j = 0; j < location.photos.length; j++) {
                        //Kép url
                        const photoUrl = `${url}/public/images/plans/${location.photos[j]}`;

                        //Kép átalakítása base64 formátumra
                        const base64image = await blobToBase64(photoUrl);

                        //Tárolás a mediacache-ben
                        mediaCache.push({
                            key: location.photos[j],
                            value: base64image
                        });
                    }
                }
            }

            //Előzőleg mentett cache törlése
            MediaCacheService.clear();

            //Cache feltöltése az adatokkal
            MediaCacheService.set(mediaCache);
        }
    }


    /**
     * getNotifications
     * 
     * A bejelentkezett felhasználó számára beérkezett értesítések lekérdezése és betöltése a statebe
     * 
     * @returns 
     */
    const getNotifications = async () => {
        //Vendég felhasználó esetén átugorja ezt a folyamatot, ugrás a következőre
        if (!userState.userdata) {
            setProgress((current: number) => current + 1);
            return;
        }

        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: "",
            closeable: false,
            onClose: () => openApplication()
        }

        try {
            const response = await NotificationService.findByAddressee(userState.userdata.username);

            if (response?.data) {
                localStorage.setItem("Yourney_notifications", JSON.stringify(response.data));
                setAppState(actionTypes.app.SET_NOTIFICATIONS, response.data);
                setProgress((current: number) => current + 1);
            }
        }
        catch (error) {
            dialogState.text = `Hiba lépett fel az értesítések lekérdezésekor.`;
            setDialogState(dialogState);
        }
    }


    /**
     * getDeviceInfo
     * 
     * Eszközadatok lekérése
     */
    const getDeviceInfo = async () => {
        const deviceInfo = await Device.getInfo();

        if (deviceInfo) {
            setAppState(actionTypes.app.SET_DEVICE, deviceInfo);
            setProgress((current: number) => current + 1);
        }
    }


    /**
     * openApplication
     * 
     * Route stack resetelése és alkalmazás megnyitása a landing page-vel.
     */
    const openApplication = () => {
        navigator.resetPage({ component: Landing });
    }


    return (
        <Page>
            <Container fill className={styles.container}>
                <PatternLayout
                    fullscreen
                    backgroundImage={pattern}>
                    <Text
                        className={styles.title}
                        node="appname" />

                    <Text className={styles.text}>
                        {progressText}
                    </Text>

                    <ProgressCircular indeterminate />
                </PatternLayout>
            </Container>
        </Page>
    )
}

export default Initialize;