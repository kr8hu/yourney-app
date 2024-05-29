//React
import { useContext } from 'react';

//Context
import { AppContext } from '../../../context/App';

//Views
import Planner from '../../Planner';

//Components
import Placeholder from '../Placeholder';
import Text from '../../../components/Text';
import Launchpad from '../../../components/Launchpad';
import Container from '../../../components/Container';

//Shared
import { postCategories } from '../../../shared/const';

//Interfaces
import LaunchpadOption from '../../../interfaces/LaunchpadOption';

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
     * Launchpad Options
     */
    const options: Array<LaunchpadOption> = [
        {
            icon: postCategories.TOUR.icon,
            text: postCategories.TOUR.name,
            onClick: () => openPlanner(postCategories.TOUR.id)
        },
        {
            icon: postCategories.TRIP.icon,
            text: postCategories.TRIP.name,
            onClick: () => openPlanner(postCategories.TRIP.id)
        },
        {
            icon: postCategories.SIGHTSEEING.icon,
            text: postCategories.SIGHTSEEING.name,
            onClick: () => openPlanner(postCategories.SIGHTSEEING.id)
        },
        {
            icon: postCategories.VACATION.icon,
            text: postCategories.VACATION.name,
            onClick: () => openPlanner(postCategories.VACATION.id)
        },
    ];


    /**
     * openPlanner
     * 
     * @param category 
     * @returns 
     */
    const openPlanner = (category: string) => {
        return appState.navigator.pushPage({
            component: Planner,
            props: { category }
        })
    }


    //Tartalom megnyitása csak áruházból letöltött alkalmazás esetén
    if (appState.device?.platform === "web") return <Placeholder />

    return (
        <Container fill>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Text
                        className={styles.operation}
                        node="prepare_choose_type" />
                </div>
                <div className={styles.col}>
                    <Launchpad options={options} />
                </div>
            </div>
        </Container>
    )
}

export default Content;