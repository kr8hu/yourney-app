//Components
import Text from '../Text';
import Image from '../Image';

//Shared
import { url } from '../../shared/const';

//Styles
import styles from './Chalk.module.css';


/**
 * Interfaces
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
function Chalk(props: Props) {
    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${props.className}`;


    /**
     * imageUrl
     * 
     */
    const imageUrl = `${url}/public/images/plans/${props.image}`;


    /**
     * formattedText
     * 
     */
    const formattedText = props.text?.length > 70 ? `${props.text?.substr(0, 70)}...` : props.text;


    /**
     * onClickHandler
     * 
     */
    const onClickHandler = () => props.onClick && props.onClick();


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
                        {props.title}
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
