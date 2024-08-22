//React
import {
    useEffect,
    useState
} from 'react';

//Capacitor
import {
    Camera,
    GalleryImageOptions,
    GalleryPhoto
} from '@capacitor/camera';

//Onsen UI
import { Icon } from 'react-onsenui';

//Components
import Text from '../Text';

//Shared
import { blobToBase64 } from '../../shared/utils';

//Styles
import styles from './PhotoPicker.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    className?: string;
    limit?: number;
    onChange: (value: any) => void;
}


/**
 * PhotoPicker
 * 
 * @returns 
 */
function PhotoPicker(props: Props) {
    //States
    const [photos, setPhotos] = useState<Array<any>>([]);
    const [permission, setPermission] = useState<boolean>(false);
    const [converted, setConverted] = useState<Array<string>>([]);
    

    //Effects
    useEffect(() => {
        checkPermissions();
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        convertSelectedPhotos(photos);
        //eslint-disable-next-line
    }, [photos]);


    useEffect(() => {
        props.onChange(converted);
        //eslint-disable-next-line
    }, [converted]);


    useEffect(() => {
        if (!permission) {
            Camera.requestPermissions();
        }
        //eslint-disable-next-line
    }, [permission]);


    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${props.className}`;


    /**
     * galleryImageOptions
     * 
     */
    const galleryImageOptions: GalleryImageOptions = {
        quality: 20,
        limit: props.limit ?? 1
    }


    /**
     * checkPermissions
     * 
     */
    const checkPermissions = async () => {
        const perm = await Camera.checkPermissions();

        if(perm.photos === "granted") {
            setPermission(true);
        }
    }


    /**
     * openPhotoPicker
     * 
     */
    const openPhotoPicker = async () => {
        const permission = await Camera.checkPermissions();

        if (permission.photos === "granted") {
            const selected = await Camera.pickImages(galleryImageOptions);

            if (selected.photos) {
                setPhotos(selected.photos);
            }
        }
    }


    /**
     * convertSelectedPhotos
     * 
     * @param photos 
     */
    const convertSelectedPhotos = (photos: any) => {
        photos.forEach(async (photo: GalleryPhoto) => {
            return blobToBase64(photo.webPath)
                .then((res: any) => {
                    setConverted((prev: Array<string>) => [
                        ...prev,
                        res
                    ]);
                });
        });
    }


    /**
     * renderPlaceholder
     * 
     * @returns 
     */
    const renderPlaceholder = () => {
        return (
            <>
                <Icon
                    className={styles.icon}
                    icon={{
                        default: "ion-ios-photos",
                        material: "ion-md-photos"
                    }}
                    fixedWidth />
                <Text
                    className={styles.text}
                    node="select_photo" />
            </>
        )
    }


    /**
     * renderThumbnails
     * 
     * @returns 
     */
    const renderThumbnails = () => {
        return (
            <div className={styles.thumbnails}>
                {photos.map((photo: any, idx: number) => {
                    return (
                        <div className={styles.thumbnailContainer}>
                            <img
                                key={idx}
                                className={styles.thumbnail}
                                src={photo.webPath}
                                alt="fotó" />
                        </div>
                    )
                })}
            </div>
        )
    }


    /**
     * renderChildren
     * 
     * @returns 
     */
    const renderChildren = () => (photos.length > 0 ? renderThumbnails() : renderPlaceholder());


    return (
        <div
            className={classNames}
            onClick={openPhotoPicker}>
            {renderChildren()}
        </div>
    )
}

export default PhotoPicker;
