//Components
import Text from '../Text';
import Image from '../Image';

//Shared
import { url } from '../../shared/const';

//Styles
import styles from './Chalk.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    title: string;
    text: string;
    image?: string;
    onClick?: () => void;
}


/**
 * Chalk
 * 
 * Egy helyszín adatait megjelenítő komponens.
 * 
 * @returns 
 */
function Chalk({
    className,
    title,
    text,
    image,
    onClick
}: Props) {
    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${className}`;


    /**
     * imageUrl
     * 
     * Kép elérési útvonala
     */
    const imageUrl = `${url}/public/images/plans/${image}`;


    /**
     * formattedText
     * 
     * Hosszú szöveg megvágása a megadott karakterszámnál
     */
    const formattedText = text?.length > 70 ? `${text?.substr(0, 70)}...` : text;


    /**
     * onClickHandler
     * 
     */
    const onClickHandler = () => onClick && onClick();


    return (
        <div
            className={classNames}
            onClick={onClickHandler}>
            <div className={styles.row}>
                <div className={styles.col}>
                    {/* Kép */}
                    <div className={styles.imageContainer}>
                        <Image
                            src={imageUrl} />
                    </div>
                </div>

                <div className={styles.col}>
                    {/* Cím */}
                    <Text className={styles.title}>
                        {title}
                    </Text>

                    {/* Tartalom */}
                    <Text className={styles.text}>
                        {formattedText || "Nincs elérhető leírás."}
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default Chalk;
