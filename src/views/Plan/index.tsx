//React
import {
    useState,
    useEffect,
    useContext
} from 'react';

//Capacitor 
import { HttpResponse } from '@capacitor/core';

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
import Post from '../../interfaces/Post';
import ToolbarButton from '../../interfaces/ToolbarButton';
import DialogState from '../../interfaces/DialogState';

//Assets
import pattern from '../../assets/images/patterns/pattern1.png';

//Styles
import styles from './Plan.module.css';
import UserService from '../../services/UserService';


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
    const [profilePicture, setProfilePicture] = useState<string>("");


    //Effects
    useEffect(() => {
        setAppState(actionTypes.app.SET_BUSY, true);

        if (post._id === undefined) {
            setContent(undefined);
            return;
        }

        PlanService.findById(post._id)
            .then((res: HttpResponse) => {
                setContent(res.data);
                setAppState(actionTypes.app.SET_BUSY, false);
            })
            .catch((error: any) => {
                setContent(undefined);
                setAppState(actionTypes.app.SET_BUSY, false);
            });
        //eslint-disable-next-line
    }, [post._id]);


    useEffect(() => {
        UserService.findByUsername(post.author)
            .then((res: HttpResponse) => {
                setProfilePicture(res.data[0].picture);
            })
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
            icon: profilePicture,
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
     * handleLikePost
     * 
     */
    const handleLikePost = async () => {
        setAppState(actionTypes.app.SET_BUSY, true);

        const payload = {
            action: isFavorited ? "dislike" : "like",
            userId: userState.userdata._id,
        };

        PlanService.like(post._id, payload)
            .then(onLikeResponse)
            .catch(onLikeResponse);
    }


    /**
     * onLikeResponse
     * 
     */
    const onLikeResponse = (response?: HttpResponse) => {
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: response?.data.message || "Hiba történt.",
            closeable: true,
            onClose: () => null
        }

        if (response?.status === 200) {
            //A bejegyzés adatainak frissítése 
            setContent(response.data.post);

            //Ha még a korábbiakban nem likeolta a bejegyzést, értesítés küldése
            if (!isFavorited) {
                sendNotification();
            }

            //Jóváhagyott bejegyzések lekérése és betöltés a cache-be
            PlanService.findApproved()
                .then((response: HttpResponse) =>
                    setAppState(actionTypes.app.SET_CACHE, response.data));
        }

        setDialogState(dialogState);
        setAppState(actionTypes.app.SET_BUSY, false);
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
