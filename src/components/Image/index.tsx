//React
import {
    useState,
    CSSProperties,
    useEffect,
} from 'react';

//Components
import Text from '../Text';

//Interfaces
import MediaCache from '../../interfaces/MediaCache';

//Servives
import MediaCacheService from '../../services/MediaCacheService';

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
    placeholder,
    src,
    onStatusChange
}: Props) {
    //States
    const [loaded, setLoaded] = useState<boolean>(false);
    const [source, setSource] = useState<string>(src);

    useEffect(() => {
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
        opacity: loaded ? 1 : 0
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
        const storedCache = await MediaCacheService.get() as MediaCache[];

        if (storedCache) {
            //Gyorsítótárazott kép keresése
            const cached = storedCache.find((media: MediaCache) => media.key === fileName[fileName.length - 1]);

            //Ha van találat a cacheből
            if (cached) {
                setSource(cached.value);
            }
        }
    }


    /**
     * renderPlaceholder
     * 
     * @returns 
     */
    const renderPlaceholder = () => {
        if (!placeholder) {
            return (
                <Text
                    className={styles.placeholder}
                    node="image_not_available" />
            )
        }

        return (
            <Text className={styles.placeholder}>
                {placeholder}
            </Text>
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
