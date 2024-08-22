//React
import {
    useRef,
    useState
} from 'react';

//Onsen UI
import {
    Carousel,
    CarouselItem,
} from 'react-onsenui';

//Components
import Image from '../Image';
import Scroller from '../Scroller';
import Pagination from './Pagination';

//Shared
import { url } from '../../shared/const';

//Styles
import styles from './SwipeGallery.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    images: any;
}


/**
 * SwipeGallery
 * 
 * @returns 
 */
function SwipeGallery({ images }: Props) {
    //States
    const [active, setActive] = useState<any>(0);


    //Refs
    const carousel = useRef(null);


    /**
     * onPostChange
     * 
     */
    const onPostChange = () => {
        const refElem = carousel.current ? carousel.current as HTMLElement : null;
        const activeIndex = refElem?.getAttribute("active-index");

        const value = activeIndex ? parseInt(activeIndex) : activeIndex;

        setActive(value);

    }


    /**
     * prevCarousel
     * 
     */
    const prevCarousel = () => {
        if (parseInt(active) === 0) return;
        setActive((current: any) => current - 1);
    }


    /**
     * nextCarousel
     * 
     */
    const nextCarousel = () => {
        if (parseInt(active) === images.length - 1) return;
        setActive((current: any) => parseInt(current) + 1);
    }


    /**
     * renderGalleryImages
     * 
     * @returns 
     */
    const renderGalleryImages = () => {
        return images.map((image: any, idx: number) => {
            return (
                <CarouselItem key={idx}>
                    <div className={styles.content}>
                        <Image
                            className={styles.image}
                            src={`${url}/public/images/plans/${image}`} />
                    </div>
                </CarouselItem>
            )
        })
    }


    /**
     * renderControllers
     * 
     * 
     * @returns 
     */
    const renderControllers = () => {
        //Ha nincs tartalom, nem kerül renderelésre a vezérlő
        if (images.length <= 1) return;

        return (
            <Scroller
                onScrollBackward={prevCarousel}
                onScrollForward={nextCarousel} />
        )
    }


    return (
        <div className={styles.container}>
            {/* Kezelőgombok */}
            {renderControllers()}


            {/* Képgaléria */}
            <Carousel
                swipeable
                autoScroll
                fullscreen
                ref={carousel}
                autoScrollRatio={0.2}
                activeIndex={parseInt(active)}
                onPostChange={onPostChange}>
                {renderGalleryImages()}
            </Carousel>


            {/* Lapozó állapotjelző */}
            <Pagination
                selected={active}
                length={images.length} />
        </div>
    )
}

export default SwipeGallery;
