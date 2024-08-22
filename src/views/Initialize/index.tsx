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
import bg_1 from '../../assets/images/landing/ai/1.jpeg';
import bg_2 from '../../assets/images/landing/ai/2.jpeg';
import bg_3 from '../../assets/images/landing/ai/3.jpeg';
import bg_4 from '../../assets/images/landing/ai/4.jpeg';
import bg_5 from '../../assets/images/landing/ai/5.jpeg';
import bg_6 from '../../assets/images/landing/ai/6.jpeg';

//Styles
import styles from './Initialize.module.css';


/**
 * Interfaces
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
     */
    const getStrings = async () => {
        //HTTP kérés tulajdonságai
        const config = {
            method: 'GET',
            url: xml,
            headers: {
                "Content-Type": "application/xml; charset=utf-8"
            },
        }

        //HTTP kérés
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

        //HTTP kérés
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

        //HTTP kérés
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
     * getBackgroundByID
     * 
     */
    const getBackgroundByID = (id: number) => {
        switch (id) {
            case 1: return bg_1;
            case 2: return bg_2;
            case 3: return bg_3;
            case 4: return bg_4;
            case 5: return bg_5;
            case 6: return bg_6;
            default: return bg_1;
        }
    }


    /**
     * openApplication
     * 
     */
    const openApplication = () => {
        const rand = Math.floor(Math.random() * 6);
        const background = getBackgroundByID(rand);

        navigator.resetPage({
            component: Landing,
            props: { background },
        });
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