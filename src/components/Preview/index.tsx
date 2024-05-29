//Components
import Metadata from './Metadata';
import CardImage from './Cover';
import CardTitle from './Title';
import CardContent from './Content';

//Shared
import { url } from '../../shared/const';

//Interfaces
import Meta from '../../interfaces/Meta';
import IMetadata from '../../interfaces/Metadata';

//Styles
import styles from './Preview.module.css';


/**
 * Props 
 * 
 */
interface Props {
    className?: any;
    title?: string;
    text: string;
    image?: any;
    meta?: Meta;
    onClick?: () => void;
}


/**
 * Preview 
 * 
 * Egy programterv előnézeti tartalmát megjelenítő komponens.
 * 
 * @returns 
 */
function Preview(props: Props) {
    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${props.className}`;


    /**
     * imageUrl
     * 
     * Kép elérési útvonala
     */
    const imageUrl = `${url}/public/images/plans/${props.image}`;


    /**
     * formattedText
     * 
     * Formázott szöveges tartalom
     */
    const formattedText = props.text?.length > 200 ? `${props.text?.substr(0, 200)}...` : props.text;

    /**
     * cardImage
     * 
     * CardImage komponens feltételes renderelése
     */
    const cardImage = props.image && <CardImage src={imageUrl} />;


    /**
     * cardTitle
     * 
     * cardTitle komponens feltételes renderelése
     */
    const cardTitle = props.title && <CardTitle text={props.title} />;


    /**
     * Metadata
     * 
     * Programterv adatai
     */
    const metadata: Array<IMetadata> = [
        {
            icon: "fa-user",
            text: props.meta?.author || "N/A"
        },
        {
            icon: "fa-info-circle",
            text: props.meta?.category || "N/A"
        },
        {
            icon: "fa-heart",
            text: props.meta?.likes.toString() || "0"
        },
    ];


    /**
     * onClickHandler
     * 
     */
    const onClickHandler = () => {
        if (!props.onClick) return;

        props.onClick();
    }


    /**
     * renderMetadata
     * 
     * Metaadatok renderelése
     * 
     * @returns 
     */
    const renderMetadata = () => {
        return metadata.map((data: IMetadata, idx: number) => {
            return (
                <Metadata
                    key={idx}
                    icon={data.icon}
                    text={data.text} />
            )
        });
    }


    return (
        <div
            className={classNames}
            onClick={onClickHandler}>
            <div className={styles.row}>
                <div className={styles.col}>
                    {/* Kép */}
                    {cardImage}
                </div>

                <div className={styles.col}>
                    {/* Címsor */}
                    {cardTitle}

                    {/* Meta adatok */}
                    {props.meta && (
                        <div className={styles.metaContainer}>
                            {renderMetadata()}
                        </div>
                    )}

                    {/* Szöveges tartalom */}
                    <CardContent
                        text={formattedText} />
                </div>
            </div>
        </div>
    )
}

export default Preview;
