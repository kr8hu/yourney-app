//React
import {
    useContext,
    useEffect,
    useState
} from 'react';

//Context
import { AppContext } from '../../../../../context/App';

//Views
import Location from '../../../../Location';

//Components
import Chalk from '../../../../../components/Chalk';
import Text from '../../../../../components/Text';

//Interfaces
import ILocation from '../../../../../interfaces/Location';

//Shared
import { shuffleArray } from '../../../../../shared/utils';

//Styles
import styles from './Locations.module.css';
import Button from '../../../../../components/Button';


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
 * Legnépszerűbb bejegyzések
 * 
 * @returns 
 */
function Locations({ numberOfPosts }: Props) {
    //Context
    const { appState } = useContext(AppContext);


    /**
     * locations
     * 
     * Helyszíneket tartalmazó array generálása a cacheből
     */
    const locations: Array<ILocation> = appState.content.flatMap(obj => obj.locations);


    //States
    const [shuffledLocations, setShuffledLocations] = useState<any>([]);


    useEffect(() => {
        //Helyszíneket tartalmazó array összekeverése
        shuffleLocations();

        //eslint-disable-next-line
    }, []);


    /**
     * shuffleLocations
     * 
     * Összekeveri a helyszínekből álló array elemeit.
     */
    const shuffleLocations = () => {
        //Helyszíneket tartalmazó array összekeverése
        const shuffled: Array<ILocation> = shuffleArray(locations);
        setShuffledLocations(shuffled);
    }


    /**
     * renderPopular
     * 
     * @returns 
     */
    const renderPopulars = () => {
        const slicedLocations = shuffledLocations.slice(0, numberOfPosts);

        return slicedLocations.map((location: ILocation, idx: number) => {
            return (
                <div className={styles.col}>
                    <Chalk
                        key={idx}
                        className={styles.chalk}
                        title={location.name}
                        text={location.description}
                        image={location.photos[0]}
                        onClick={() => appState.navigator.pushPage({ component: Location, props: { location } })} />
                </div>
            )
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
            {/* Tartalom */}
            <div className={styles.row}>
                {shuffledLocations.length === 0 ? renderPlaceholder() : renderPopulars()}
            </div>

            {/* Keverés gomb */}
            <div className={styles.col}>
                {locations.length !== 0 && (
                    <Button
                        className={styles.button}
                        onClick={shuffleLocations}>
                        <Text node="shuffle_suggestions" />
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Locations;
