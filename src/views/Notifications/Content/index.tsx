//React
import {
    useContext
} from 'react';

//Context
import { AppContext } from '../../../context/App';

//Onsen UI
import {
    LazyList
} from 'react-onsenui';

//Components
import Notification from '../Notification';
import Text from '../../../components/Text';
import Container from '../../../components/Container';

//Styles
import styles from './Content.module.css';


/**
 * Content
 * 
 * @returns 
 */
function Content() {
    //Context
    const { appState } = useContext(AppContext);


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
                    length={appState.notifications?.length ?? 0}
                    renderRow={renderRow}
                    calculateItemHeight={() => 44} />
            </div>
        )
    }


    /**
     * renderRow
     * 
     * @param index 
     * @returns 
     */
    const renderRow = (index: number) => (<Notification index={index} />)


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
                    node="placeholder_notifications" />
            </div>
        )
    }


    return (
        <Container>
            <div className={styles.row}>
                {appState.notifications?.length === 0 ?
                    renderPlaceholder()
                    :
                    renderList()
                }
            </div>
        </Container>
    )
}

export default Content;