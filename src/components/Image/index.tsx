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
    src: string;
}


/**
 * Image
 * 
 * Képet megjelenítő, kezelő komponens
 * 
 * @returns 
 */
function Image({ className, src }: Props) {
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
    }


    /**
     * onErrorHandler
     * 
     * @param e 
     */
    const onErrorHandler = async () => {
        //Fájl elérési útvonalának felosztása
        const filePath = src.split("/");

        //Fájlnév
        const fileName = filePath[filePath.length - 1];

        //Tárolt cache
        const mediaCache = await CacheService.findAll(cacheType.MEDIA) as MediaCache[];

        if (mediaCache) {
            //Gyorsítótárazott kép keresése
            const cacheSource = mediaCache.find((media: MediaCache) => media.key === fileName);

            //Ha van találat a cacheből
            if (cacheSource) {
                setLoaded(true);
                setSource(cacheSource.value);
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
        <div className={styles.container}>
            {/* Placeholder */}
            {!loaded && renderPlaceholder()}

            {/* Kép */}
            <img
                className={classNames}
                src={source}
                alt="kép"
                onError={onErrorHandler}
                onLoad={onLoadHandler}
                style={imageStyle} />
        </div>
    )
}

export default Image;
