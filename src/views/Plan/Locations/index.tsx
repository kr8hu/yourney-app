//React
import { useContext } from 'react';

//Context
import { AppContext } from '../../../context/App';

//Views
import Location from '../../Location';

//Components
import Text from '../../../components/Text';
import Chalk from '../../../components/Chalk';
import Section from '../../../components/Section';
import Container from '../../../components/Container';

//Interfaces
import ILocation from '../../../interfaces/Location';

//Styles
import styles from './Locations.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    dataset: Array<ILocation>;
}


/**
 * Locations
 * 
 * @returns 
 */
function Locations({ dataset }: Props) {
    //Context
    const { appState } = useContext(AppContext);


    /**
     * renderLocations
     * 
     * @returns 
     */
    const renderLocations = () => {
        return dataset.map((location: ILocation, idx: number) => {
            return (
                <Chalk
                    className={styles.location}
                    title={location.name}
                    text={location.description}
                    image={location.photos[0]}
                    onClick={() => appState.navigator.pushPage({ component: Location, props: { location } })} />
            )
        })
    }


    if (dataset.length === 0) {
        return (
            <Text node="plan_locations_empty" />
        )
    } else {
        return (
            <Container>
                <Section
                    title="Helyszínek">
                    <div className={styles.content}>
                        {renderLocations()}
                    </div>
                </Section>
            </Container>
        )
    }

}

export default Locations;
