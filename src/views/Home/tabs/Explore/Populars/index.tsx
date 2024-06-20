//React
import {
    useContext
} from 'react';

//Context
import { AppContext } from '../../../../../context/App';

//Views
import Plan from '../../../../Plan';
import Feed from '../../../../Feed';

//Components
import Preview from '../../../../../components/Preview';
import Text from '../../../../../components/Text';
import Button from '../../../../../components/Button';

//Shared
import {
    sortByProperty,
    getCategoryNameByID,
} from '../../../../../shared/utils';

//Interfaces
import Post from '../../../../../interfaces/Post';
import Meta from '../../../../../interfaces/Meta';

//Styles
import styles from './Populars.module.css';


/**
 * Props
 * 
 */
interface Props {
    numberOfPosts: number;
}


/**
 * Populars
 * 
 * Legnépszerűbb bejegyzéseket megjelenítő komponens
 * 
 * @returns 
 */
function Populars({ numberOfPosts }: Props) {
    //Context
    const { appState } = useContext(AppContext);


    /**
     * popularPosts
     * 
     */
    const popularPosts = Array.from(appState.content.sort(sortByProperty('likes', true)));


    /**
     * onClick
     * 
     */
    const onClick = () => {
        appState.navigator.pushPage({
            component: Feed,
            props: {
                plans: popularPosts
            }
        })
    }


    /**
     * renderPopulars
     * 
     * @returns 
     */
    const renderPopulars = () => {
        //Meghatározott mennyiségű megjeleníthető tartalom
        const slicedPosts = popularPosts.slice(0, numberOfPosts);

        //Bejegyzések renderelése
        return slicedPosts.map((post: Post, idx: number) => {
            //Kategória
            const category = getCategoryNameByID(post.category);

            //Likeok száma
            const likes = post.likes.length.toString();

            //Meta adatok
            const meta: Meta = {
                author: post.author,
                category,
                likes,
            }

            return (
                <div className={styles.col}>
                    <Preview
                        key={idx}
                        className={styles.card}
                        title={post.name}
                        text={post.description}
                        image={post.photos[0]}
                        meta={meta}
                        onClick={() => appState.navigator.pushPage({ component: Plan, props: { post } })} />
                </div>)
        })
    }


    /**
     * renderPlaceholder
     * 
     * @returns 
     */
    const renderPlaceholder = () => {
        return (
            <div className={styles.col}>
                <Text node="no_content" />
            </div>
        )
    }


    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {/* Tartalom */}
                {popularPosts.length === 0 ? renderPlaceholder() : renderPopulars()}

                {/* További tartalamat megjelenítő gomb */}
                <div className={styles.col}>
                    {popularPosts.length !== 0 && (
                        <Button
                            className={styles.button}
                            onClick={onClick}>
                            <Text node="explore_more" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Populars;
