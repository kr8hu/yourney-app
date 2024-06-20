//React
import {
    useState,
    useEffect,
    useContext
} from 'react';

//Context
import { AppContext } from '../../context/App';
import { UserContext } from '../../context/User';
import { DialogContext } from '../../context/Dialog';

//Onsen UI
import {
    Page,
    Icon,
    Fab
} from 'react-onsenui';

//Components
import Title from './Title';
import Metadata from './Metadata';
import Description from './Description';
import Locations from './Locations';

import Map from '../../components/Map';
import Text from '../../components/Text';
import Section from '../../components/Section';
import Toolbar from '../../components/Toolbar';
import Container from '../../components/Container';
import SwipeGallery from '../../components/SwipeGallery';
import PatternLayout from '../../components/layouts/PatternLayout';

//Shared
import {
    actionTypes,
    dialogTypes
} from '../../shared/const';

import {
    getCategoryNameByID
} from '../../shared/utils';

//Services
import PlanService from '../../services/PlanService';
import NotificationService from '../../services/NotificationService';

//Interfaces
import User from '../../interfaces/User';
import Post from '../../interfaces/Post';
import ToolbarButton from '../../interfaces/ToolbarButton';
import DialogState from '../../interfaces/DialogState';

//Assets
import pattern from '../../assets/images/patterns/pattern1.png';

//Services
import UserService from '../../services/UserService';

//Styles
import styles from './Plan.module.css';


/**
 * Props
 * 
 */
interface Props {
    navigator: any;
    post: Post;
}


/**
 * Plan
 * 
 * @returns 
 */
function Plan({ navigator, post }: Props) {
    //Context
    const { userState } = useContext(UserContext);
    const { setAppState } = useContext(AppContext);
    const { setDialogState } = useContext(DialogContext);


    //States
    const [distance, setDistance] = useState<number>(0);
    const [content, setContent] = useState<Post | undefined>(undefined);
    const [author, setAuthor] = useState<User | undefined>(undefined);


    //Effects
    useEffect(() => {
        getPlan();
        //eslint-disable-next-line
    }, [post._id]);


    useEffect(() => {
        getAuthor();
        //eslint-disable-next-line
    }, [post.author]);


    /**
     * Toolbar Buttons
     * 
     */
    const toolbarButtons: Array<ToolbarButton> = [
        {
            icon: "fa-times",
            onClick: () => navigator.popPage()
        }
    ];


    /**
     * isFavorited
     * 
     * Tároljuk, hogy a bejegyzés a kedvencek között találhato-e a felhasználónál
     */
    const isFavorited = content?.likes?.includes(userState.userdata?._id);


    /**
     * Category
     * 
     */
    const category = getCategoryNameByID(post.category);


    /**
     * Meta
     * 
     */
    const meta = [
        {
            icon: author ? author.picture : "",
            title: "plan_meta_author",
            text: post.author
        },
        {
            icon: "fa-info-circle",
            title: "plan_meta_category",
            text: category
        },
        {
            icon: "fa-map-signs",
            title: "plan_meta_distance",
            text: distance ? `${distance.toFixed(1)} km` : 'N/A'
        }
    ];


    /**
     * getAuthor
     * 
     * A programtervet készítő felhasználó adatainak lekérdezése és tárolás a stateben
     */
    const getAuthor = async () => {
        //Query
        const query = { username: post.author };

        //HTTP lekérdezés
        const response = await UserService.findByQuery(query);

        if (response.payload) {
            setAuthor(response.payload);
        }
    }


    /**
     * getPlan
     * 
     * Programterv adatainak lekérdezése és tárolás a stateben.
     * @returns 
     */
    const getPlan = async () => {
        if (post._id === undefined) {
            setContent(undefined);
            return;
        }

        //Betöltési állapot módosítása
        setAppState(actionTypes.app.SET_BUSY, true);

        //HTTP lekérdezés
        const response = await PlanService.findById(post._id);

        if (response) {
            setAppState(actionTypes.app.SET_BUSY, false);
            setContent(response.payload);
        }
    }


    /**
     * handleLikePost
     * 
     */
    const handleLikePost = async () => {
        //DialogState
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            closeable: true,
            onClose: () => null
        }

        //Payload
        const payload = {
            action: isFavorited ? "dislike" : "like",
            userId: userState.userdata._id,
        };

        //HTTP lekérdezés
        const response = await PlanService.like(post._id, payload);
        dialogState.text = response.message;

        //Hibakezelés
        if (!response.payload) {
            setDialogState(dialogState);
            return;
        }

        //A bejegyzés adatainak frissítése 
        setContent(response.payload);

        //Ha még a korábbiakban nem likeolta a bejegyzést, értesítés küldése
        if (!isFavorited) {
            sendNotification();
        }

        updateCache();
    }


    /**
     * updateMediaCache
     * 
     */
    const updateCache = async () => {
        //Query
        const query = { approved: true };

        //HTTP lekérdezés
        const response = await PlanService.findByQuery(query);

        if (response.payload) {
            setAppState(actionTypes.app.SET_CONTENT, response.payload)
        }
    }


    /**
     * sendNotification
     * 
     * Értesítés küldése a bejegyzés készítőjének
     */
    const sendNotification = () => {
        const payload = {
            sender: userState.userdata.username,
            addressee: post.author,
            subject: `Kedvelte a programtervedet.`,
            message: `${userState.userdata.username} nevű felhasználó kedvelte a ${post.name} című programterv bejegyzésedet.`
        }

        NotificationService.create(payload);
    }


    /**
     * renderMap
     * 
     * @returns 
     */
    const renderMap = () => {
        if (post.locations.length === 0 || post.locations[0]?.coords?.length === 0) {
            return (
                <Text
                    node="map_not_available" />
            )
        }

        return (
            <Container>
                <Section
                    title="Térkép">
                    <div className={styles.content}>
                        <Map
                            zoom={14}
                            minZoom={10}
                            maxZoom={20}
                            center={post.locations[0]?.coords}
                            locations={post.locations}
                            onDistanceCalculated={setDistance} />
                    </div>
                </Section>
            </Container>
        )
    }


    /**
     * renderLikeButton
     * 
     * @returns 
     */
    const renderLikeButton = () => {
        //Üres tartalom esetén nem jeleníti meg a like gombot.
        if (!content) return null;

        //Ha vendég felhasználó jár az oldalon akkor nem jeleníti meg a like gombot.
        if (!userState.userdata) return null;

        //Ha a bejegyzés készítője jár az oldalon akkor nem jeleníti meg a like gombot.
        if (userState.userdata?.username === post.author) return null;

        return (
            <Fab
                position="bottom right"
                onClick={handleLikePost}>
                <Icon
                    className={styles.fabIcon}
                    icon={{
                        default: isFavorited ? "ion-ios-heart-dislike" : "ion-ios-heart",
                        material: isFavorited ? "ion-md-heart-dislike" : "ion-md-heart"
                    }}
                    fixedWidth />
            </Fab>
        )
    }


    return (
        <Page renderFixed={renderLikeButton}>
            <Container className={styles.container}>
                {/* Toolbar */}
                <Toolbar
                    fixed
                    text="title_page_plan"
                    buttons={toolbarButtons} />

                {/* Tartalom */}
                <PatternLayout
                    opaque
                    backgroundImage={pattern}>
                    <div className={styles.row}>
                        {/* Galéria */}
                        <div className={styles.col}>
                            <SwipeGallery images={post.photos} />
                        </div>

                        {/* Cím */}
                        <div className={styles.col}>
                            <Title text={post.name} />
                        </div>

                        {/* Leírás */}
                        <div className={styles.col}>
                            <Description
                                text={post.description} />
                        </div>

                        {/* Metadata */}
                        <div className={styles.col}>
                            <Metadata dataset={meta} />
                        </div>

                        {/* Locations */}
                        <div className={styles.col}>
                            <Locations dataset={post.locations} />
                        </div>

                        {/* Térkép */}
                        <div className={styles.col}>
                            {renderMap()}
                        </div>
                    </div>
                </PatternLayout>
            </Container>
        </Page>
    )
}

export default Plan;
