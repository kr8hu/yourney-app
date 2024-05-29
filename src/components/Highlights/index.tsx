//React
import { useRef } from 'react';

//Components
import Text from '../Text';
import Scroller from '../Scroller';
import HighlightItem from './HighlightItem';

//Interfaces
import IHighlightItem from '../../interfaces/HighlightItem';

//Styles
import styles from './Highlights.module.css';


/**
 * Props
 * 
 */
interface Props {
    src: Array<IHighlightItem>;
    onClick?: (item: IHighlightItem) => void;
}


/**
 * Hightlights
 * 
 * Vertikálisan görgethető formában adatokat megjelenítő komponens
 * 
 * @returns 
 */
function Highlights({ src, onClick }: Props) {
    //Refs
    const containerRef = useRef<HTMLDivElement>(null);


    /**
     * scrollValue
     * 
     * Görgetés mértéke a tartalom mennyisége alapján
     */
    const scrollValue: number = (src.length - 1) * 50;


    /**
     * scrollHighlights
     * 
     * @param scrollOffset 
     */
    const scrollHighlights = (scrollOffset: number) => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += scrollOffset;
        }
    }


    /**
     * onClickHandler
     * 
     * @param item 
     */
    const onClickHandler = (item: IHighlightItem) => {
        if (onClick) {
            onClick(item);
        }
    }


    /**
     * renderHightlights
     * 
     * Tartalom renderelése
     * 
     * @returns 
     */
    const renderHighlights = () => {
        return src.map((item: IHighlightItem, idx: number) => {
            return (
                <HighlightItem
                    key={idx}
                    className={styles.item}
                    title={item.title}
                    text={item.text}
                    image={item.image}
                    onClick={() => onClickHandler(item)} />
            )
        })
    }


    /**
     * renderControllers
     * 
     * Görgetést vezérlő gombok renderelése
     * @returns 
     */
    const renderControllers = () => {
        //Ha nincs tartalom, nem kerül renderelésre a vezérlő
        if (src.length <= 3) return;

        return (
            <Scroller
                onScrollBackward={() => scrollHighlights(-scrollValue)}
                onScrollForward={() => scrollHighlights(scrollValue)} />
        )
    }


    return (
        <div className={styles.container}>
            {renderControllers()}

            <div ref={containerRef} className={styles.content}>
                {src.length === 0 ? <Text node="no_content" /> : renderHighlights()}
            </div>
        </div>
    )
}

export default Highlights;
