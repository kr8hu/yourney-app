//Onsen UI
import {
    Page,
    LazyList
} from 'react-onsenui';

//Views
import Plan from '../Plan';

//Components
import Text from '../../components/Text';
import Preview from '../../components/Preview';
import Toolbar from '../../components/Toolbar';
import Container from '../../components/Container';

//Interfaces
import Post from '../../interfaces/Post';
import ToolbarButton from '../../interfaces/ToolbarButton';

//Styles
import styles from './Feed.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    navigator: any;
    plans: Array<Post>;
}


/**
 * Feed
 * 
 * @returns 
 */
function Feed({ navigator, plans }: Props) {
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
     * renderList
     * 
     * @returns 
     */
    const renderList = () => {
        return (
            <LazyList
                length={plans.length}
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
                    title={plans[idx].name}
                    text={plans[idx].description}
                    image={plans[idx].photos[0]}
                    onClick={() => navigator.pushPage({ component: Plan, props: { post: plans[idx] } })} />
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
                    node="no_content" />
            </div>
        )
    }


    return (
        <Page>
            <Container>
                {/* Toolbar */}
                <Toolbar
                    fixed
                    text="title_page_feed"
                    buttons={toolbarButtons} />

                <div className={styles.row}>
                    {plans.length === 0 ? renderPlaceholder() : renderList()}
                </div>
            </Container>
        </Page>
    )
}

export default Feed;
