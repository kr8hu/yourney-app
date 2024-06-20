//Components
import Text from '../../Text';
import Image from '../../Image';

//Shared
import { url } from '../../../shared/const';

//Styles
import styles from './HighlightItem.module.css';


/**
 * Props 
 * 
 */
interface Props {
    className?: any;
    title: string;
    text: string;
    image?: any;
    onClick?: () => void;
}


/**
 * HighlightItem 
 * 
 * A `Highlights` komponens tartalmának egy eleme.
 * 
 * @returns 
 */
function HighlightItem(props: Props) {
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
     * formattedTitle
     */
    const formattedTitle = props.title.length > 20 ? `${props.title.substr(0, 20)}...` : props.title

    /**
     * onClick
     * 
     */
    const onClick = () => {
        if (props.onClick === undefined) return;

        props.onClick();
    }


    return (
        <div
            className={classNames}
            onClick={onClick}>

            {/* Borítókép */}
            <Image
                className={styles.image}
                src={imageUrl} />

            {/* Tartalom */}
            <div className={styles.content}>
                <Text className={styles.title}>
                    {formattedTitle}
                </Text>
                <Text className={styles.text}>
                    {props.text}
                </Text>
            </div>

        </div>
    )
}

export default HighlightItem;
