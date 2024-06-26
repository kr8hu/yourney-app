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
import CacheService from '../../services/CacheService';
import NotificationService from '../../services/NotificationService';

//Interfaces
import DialogState from '../../interfaces/DialogState';

//Shared
import xml from '../../shared/strings.xml';
import {
    actionTypes,
    cacheType,
    dialogTypes,
    loadingStates,
} from '../../shared/const';

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
        //HTTP lekérdezés tulajdonságai
        const config = {
            method: 'GET',
            url: xml,
            headers: {
                "Content-Type": "application/xml; charset=utf-8"
            },
        }

        //HTTP lekérdezés
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
        //Dialog tulajdonságai
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            closeable: false,
            onClose: () => null
        }

        //Query
        const query = { approved: true };

        //HTTP lekérdezés
        const response = await PlanService.findByQuery(query);
        dialogState.text = response.message;

        if (response.payload) {
            //Tartalom betöltése az alkalmazás statejébe
            setAppState(actionTypes.app.SET_CONTENT, response.payload);

            //Adatok elhelyezése a cacheben
            createCache(cacheType.CONTENT, response.payload);
        } else {
            //A korábban létrehozott cache tartalmának lekérése
            const cachedContent = await CacheService.findAll(cacheType.CONTENT);

            //A lekért cache betöltése az alkalmazásba
            setAppState(actionTypes.app.SET_CONTENT, cachedContent);

            //Hibaüzenet megjelenítése
            setDialogState(dialogState);
        }

        setProgress((current: number) => current + 1);
    }


    /**
     * getNotifications
     * 
     * A bejelentkezett felhasználó számára beérkezett értesítések lekérdezése és betöltése a statebe
     * 
     * @returns 
     */
    const getNotifications = async () => {
        if (!userState.userdata) {
            //Vendég felhasználó esetén nem fut le ez a folyamat, ugrás a következő műveletre
            setProgress((current: number) => current + 1);
            return;
        }

        //Query
        const query = {
            addressee: userState.userdata.username
        };

        //HTTP lekérdezés
        const response = await NotificationService.findByQuery(query);

        if (response.payload) {
            //Betöltés az alkalmazásba
            setAppState(actionTypes.app.SET_NOTIFICATIONS, response.payload);

            //Adatok elhelyezése a cacheben
            createCache(cacheType.NOTIFICATION, response.payload);
        } else {
            //Cache tartalmának lekérése
            const cachedNotifications = await CacheService.findAll(cacheType.NOTIFICATION);

            //Betöltés az alkalmazásba
            setAppState(actionTypes.app.SET_NOTIFICATIONS, cachedNotifications);
        }

        setProgress((current: number) => current + 1);
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
     * createCache
     * 
     * @param contents 
     */
    const createCache = async (type: string, contents: any) => {
        CacheService.clear(type);

        for (let content of contents) {
            await CacheService.create(type, content);
        }

        if (type === cacheType.CONTENT) {
            CacheService.clear(cacheType.MEDIA);
            CacheService.convert();
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
            <Container
                stretch
                className={styles.container}>
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