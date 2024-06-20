//React
import {
    useState,
    useEffect,
    CSSProperties,
} from 'react';

//Components
import Text from '../Text';

//Shared
import { cacheType } from '../../shared/const';

//Services
import CacheService from '../../services/CacheService';

//Interfaces
import MediaCache from '../../interfaces/MediaCache';

//Styles
import styles from './Image.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    transparent?: boolean;
    placeholder?: string;
    src: string;
    onStatusChange?: (value: boolean) => void;
}


/**
 * Image
 * 
 * Képet megjelenítő és kezelő komponens
 * 
 * @returns 
 */
function Image({
    className,
    transparent,
    src,
    onStatusChange
}: Props) {
    //States
    const [loaded, setLoaded] = useState<boolean>(false);
    const [source, setSource] = useState<string>(src);
    const [placeholder, setPlaceholder] = useState<string>("loading");

    useEffect(() => {
        setLoaded(false);
        setSource(src);
    }, [src]);


    /**
     * classNames
     * 
     */
    const classNames = `${styles.image} ${className}`;


    /**
     * backgroundColor
     * 
     */
    const backgroundColor = transparent ? 'transparent' : 'var(--color-main)';


    /**
     * imageStyle
     * 
     */
    const imageStyle: CSSProperties = {
        position: loaded ? "relative" : "absolute",
        display: loaded ? "block" : "none"
    };


    /**
     * onLoadHandler
     * 
     */
    const onLoadHandler = () => {
        setLoaded(true);

        if (onStatusChange) {
            onStatusChange(true);
        }
    }


    /**
     * onErrorHandler
     * 
     * @param e 
     */
    const onErrorHandler = async () => {
        if (onStatusChange) {
            onStatusChange(false);
        }

        //Fájlnév
        const fileName = src.split("/");

        //Tárolt cache
        const mediaCache = await CacheService.findAll(cacheType.MEDIA) as MediaCache[];

        if (mediaCache) {
            //Gyorsítótárazott kép keresése
            const cached = mediaCache.find((media: MediaCache) => media.key === fileName[fileName.length - 1]);

            //Ha van találat a cacheből
            if (cached) {
                setSource(cached.value);
            } else {
                setPlaceholder("image_not_available");
            }
        }
    }


    /**
     * renderPlaceholder
     * 
     * @returns 
     */
    const renderPlaceholder = () => {
        return (
            <Text
                className={styles.placeholder}
                node={placeholder} />
        )
    }


    return (
        <div
            className={styles.container}
            data-loaded={loaded}
            style={{ backgroundColor }}>

            {/* Placeholder */}
            {!loaded && renderPlaceholder()}

            {/* Kép */}
            <img
                className={classNames}
                src={source}
                alt="kép"
                onError={onErrorHandler}
                onLoad={onLoadHandler}
                data-loaded={loaded}
                style={imageStyle} />
        </div>
    )
}

export default Image;
