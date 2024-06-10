//React
import {
    useState,
    useEffect,
    useContext,
} from 'react';

//Context
import { AppContext } from '../../../context/App';
import { UserContext } from '../../../context/User';
import { DialogContext } from '../../../context/Dialog';

//Onsen UI
import {
    LazyList,
} from 'react-onsenui';

//Views
import Plan from '../../Plan';
import Editor from '../../Editor';

//Components
import ListItem from '../ListItem';
import Placeholder from '../Placeholder';
import Text from '../../../components/Text';
import Container from '../../../components/Container';

//Shared
import {
    actionTypes,
    dialogTypes,
} from '../../../shared/const';

//Services
import PlanService from '../../../services/PlanService';

//Interfaces
import Post from '../../../interfaces/Post';
import DialogState from '../../../interfaces/DialogState';

//Styles
import styles from './Content.module.css';


/**
 * Content
 * 
 * @returns 
 */
function Content() {
    //Context
    const { userState } = useContext(UserContext);
    const { setDialogState } = useContext(DialogContext);
    const { appState, setAppState } = useContext(AppContext);


    //States
    const [plans, setPosts] = useState<Array<Post>>([]);


    //Effects
    useEffect(() => {
        getPosts();
        //eslint-disable-next-line
    }, []);


    /**
     * getPosts
     * 
     * Bejegyzések lekérése
     * 
     */
    const getPosts = async () => {
        //DialogState
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            closeable: true,
            onClose: () => null
        }

        //Query
        const query = userState.userdata.group === 1 ? {} : { author: userState.userdata.username };

        //HTTP lekérdézés
        const response = await PlanService.findByQuery(query);
        dialogState.text = response.message;

        if (!response.payload) {
            setDialogState(dialogState);
            return;
        }

        setPosts(response.payload);
    }


    /**
     * visitPost
     * 
     */
    const visitPost = (post: Post) => {
        appState.navigator.pushPage({
            component: Plan,
            props: { post }
        })
    }


    /**
     * deletePostHandler
     * 
     */
    const deletePostHandler = (post: Post) => {
        const dialogState: DialogState = {
            type: dialogTypes.CONFIRM,
            text: `Biztosan törölni szeretnéd a(z) '${post.name.substring(0, 16)}...' bejegyzést?`,
            buttons: ["Mégsem", "Törlés"],
            closeable: true,
            onSubmit: () => deletePost(post),
            onClose: () => null
        }

        setDialogState(dialogState);
    }


    /**
     * deletePost
     * 
     * Bejegyzés törlése request
     * 
     * @param post 
     */
    const deletePost = async (post: Post) => {
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: `Bejegyzés törölve.`,
            closeable: true,
            onClose: () => null
        }

        const response = await PlanService.delete(post._id);
        dialogState.text = response.message;

        if (!response.payload) {
            setDialogState(dialogState);
            return;
        }

        const filteredLocalContent = appState.cache.filter((localPost: Post) => localPost._id !==  (response.payload as Post)._id);
        setAppState(actionTypes.app.SET_CACHE, filteredLocalContent);

        //Bejegyzések ismételt lekérése a state frissítéshez
        getPosts();
    }
    

    /**
     * approvePostHandler
     * 
     * Bejegyzés jóvájagyásának megerősítése
     */
    const approvePostHandler = (post: Post) => {
        const dialogState: DialogState = {
            type: dialogTypes.CONFIRM,
            text: `Biztosan jóváhagyod a(z) '${post.name.substring(0, 16)}...' bejegyzést?`,
            buttons: ["Mégsem", "Jóváhagyás"],
            closeable: true,
            onSubmit: () => approvePost(post),
            onClose: () => null
        }

        setDialogState(dialogState);
    }


    /**
     * approvePost
     * 
     * Bejegyzés jóváhagyása request
     * 
     * @param post 
     */
    const approvePost = async (post: Post) => {
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: `Bejegyzés jóváhagyva.`,
            closeable: true,
            onClose: () => null
        }

        const response = await PlanService.approve(post._id);
        dialogState.text = response.message;

        if (!response.payload) {
            setDialogState(dialogState);
            return;
        }

        updateCache();
    }


    /**
     * updateCache
     * 
     */
    const updateCache = async () => {
        const query = { approved: true };
        const response = await PlanService.findByQuery(query);

        if (response.payload) {
            setAppState(actionTypes.app.SET_CACHE, response.payload);
        }

        //Bejegyzések ismételt lekérése a state frissítéshez
        getPosts();
    }


    /**
     * onEditPost
     * 
     * @param post 
     */
    const onEditPost = (post: Post) => {
        appState.navigator.replacePage({
            component: Editor,
            props: { post }
        })
    }


    /**
     * renderList
     * 
     * @returns 
     */
    const renderList = () => {
        return (
            <div className={styles.col}>
                <LazyList
                    className={styles.list}
                    length={plans.length}
                    renderRow={renderRow}
                    calculateItemHeight={() => 44}>
                </LazyList>
            </div>
        )
    }


    /**
     * renderRow
     * 
     * @param index 
     * @returns 
     */
    const renderRow = (index: number) => {
        return (
            <ListItem
                key={index}
                post={plans[index]}
                onVisit={visitPost}
                onEdit={onEditPost}
                onApprove={approvePostHandler}
                onDelete={deletePostHandler} />
        )
    }


    /**
     * renderPlaceholder
     * 
     * @returns 
     */
    const renderPlaceholder = () => {
        return (
            <div className={styles.col}>
                <Text node="placeholder_postsmanager" />
            </div>
        )
    }

    //Tartalom megnyitása csak áruházból letöltött alkalmazás esetén
    if (appState.device?.platform === "web") return <Placeholder />

    return (
        <Container>
            <div className={styles.row}>
                {plans.length === 0 ?
                    renderPlaceholder()
                    :
                    renderList()
                }
            </div>
        </Container>
    )
}

export default Content;