//React
import {
    useContext,
    useEffect,
    useState
} from 'react';

//Context
import { AppContext } from '../../../../../context/App';
import { UserContext } from '../../../../../context/User';

//Onsen UI
import { LazyList } from 'react-onsenui';

//Views
import Plan from '../../../../Plan';

//Components
import Text from '../../../../../components/Text';
import Preview from '../../../../../components/Preview';
import Container from '../../../../../components/Container';

//Interfaces
import Post from '../../../../../interfaces/Post';

//Styles
import styles from './Content.module.css'

/**
 * Content
 * 
 * @returns 
 */
function Content() {
    //Context
    const { appState } = useContext(AppContext);
    const { userState } = useContext(UserContext);


    //State
    const [favourites, setFavourites] = useState<Array<Post>>([]);


    useEffect(() => {
        if (appState.cache.length === 0) return;

        const favouritePosts = appState.cache.filter((post: Post) => post.likes.includes(userState.userdata._id));

        if (favouritePosts) {
            setFavourites(favouritePosts);
        }
        //eslint-disable-next-line
    }, [appState.cache]);


    /**
     * renderList
     * 
     * @returns 
     */
    const renderList = () => {
        return (
            <LazyList
                length={favourites.length}
                renderRow={renderCard}
                calculateItemHeight={() => 350}>
            </LazyList>
        )
    }


    /**
     * renderCard
     * 
     * @returns 
     */
    const renderCard = (idx: number) => {
        return (
            <div className={styles.col}>
                <Preview
                    key={idx}
                    className={styles.card}
                    title={favourites[idx].name}
                    text={favourites[idx].description}
                    image={favourites[idx].photos[0]}
                    onClick={() => appState.navigator.pushPage({ component: Plan, props: { post: favourites[idx] } })} />
            </div>
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
                <Text
                    className={styles.placeholder}
                    node="placeholder_favourites" />
            </div>
        )
    }


    return (
        <Container className={styles.container}>
            <div className={styles.row}>
                {favourites.length === 0 ? renderPlaceholder() : renderList()}
            </div>
        </Container>
    )
}

export default Content;
