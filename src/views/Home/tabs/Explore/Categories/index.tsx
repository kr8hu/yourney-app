//React
import {
    useState,
    useEffect,
    useContext
} from 'react';

//Context
import { AppContext } from '../../../../../context/App';

//Views
import Plan from '../../../../Plan';
//import Location from '../../../../Location';

//Components
import Chips from '../../../../../components/Chips';
import Highlights from '../../../../../components/Highlights';

//Shared
import { shuffleArray } from '../../../../../shared/utils';
import { postCategories } from '../../../../../shared/const';

//Interfaces
import Chip from '../../../../../interfaces/Chip';
import Post from '../../../../../interfaces/Post';
//import ILocation from '../../../../../interfaces/Location';
import HighlightItem from '../../../../../interfaces/HighlightItem';

//Styles
import styles from './Categories.module.css';


/**
 * Categories
 * 
 * Kategória alapján tartalmat megjelenítő komponens
 * 
 * @returns 
 */
function Categories() {
    //Context
    const { appState } = useContext(AppContext);


    //States
    const [highlights, setHighlights] = useState<Array<HighlightItem>>([]);


    //Effects
    useEffect(() => {
        if (appState.content.length === 0) return;
        //eslint-disable-next-line
    }, [appState.content]);


    /**
     * categoryFilters
     * 
     * Kategória szűrők
     */
    const categoryFilters: Array<Chip> = [
        {
            label: postCategories.SIGHTSEEING.name,
            value: postCategories.SIGHTSEEING.id
        },
        {
            label: postCategories.TOUR.name,
            value: postCategories.TOUR.id
        },
        {
            label: postCategories.TRIP.name,
            value: postCategories.TRIP.id
        },
        {
            label: postCategories.VACATION.name,
            value: postCategories.VACATION.id
        },
    ];


    /**
     * filterByCategory
     * 
     * Kategória alapján szűrést végző funkció
     * 
     */
    const filterByCategory = (filter: any) => {
        setHighlights([]);
        let selected: Array<HighlightItem> = [];
        const filteredPosts: Array<Post> = appState.content.filter((post: Post) => post.category === filter);

        for (let post of filteredPosts) {
            for (let location of post.locations) {
                //Hiányos címadatokkal rendelkező helyszín nem kerül be
                if (location.address === null) return;

                //Megye helyes megjelenítése
                const formattedText = location.address.county.includes("megye") ? location.address.county : `${location.address.county} megye`

                selected.push({
                    title: location.name,
                    text: formattedText,
                    image: location.photos[0],
                    post
                })
            }
        }

        //Tartalom keverése
        const shuffled = shuffleArray(selected);
        setHighlights(shuffled);
    }


    /**
     * onClick
     * 
     */
    const onClick = (item: HighlightItem) => {
        const post = appState.content.find((p: Post) => p._id === item.post._id);
        //const location = post.locations.find((l: ILocation) => l.name === item.title);

        appState.navigator.pushPage({
            component: Plan,
            props: {
                post 
            }
        })
    }


    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Chips
                        data={categoryFilters}
                        onChange={filterByCategory} />
                </div>
                <div className={styles.col}>
                    <Highlights
                        src={highlights}
                        onClick={onClick} />
                </div>
            </div>
        </div>
    )
}

export default Categories;
