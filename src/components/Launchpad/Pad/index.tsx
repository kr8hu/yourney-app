//Components
import Text from '../../Text';

//Styles
import styles from './Pad.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    icon?: string;
    text: string;
    onClick: () => void;
}


/**
 * Pad
 * 
 * @param props 
 * @returns 
 */
function Pad({ icon, text, onClick }: Props) {
    return (
        <div
            className={styles.container}
            onClick={onClick}>

            {/* Emoji / ikon */}
            {icon && (
                <span className={styles.emoji}>
                    {icon}
                </span>
            )}

            {/* Szöveg */}
            <Text className={styles.text}>
                {text}
            </Text>
        </div>
    )
}

export default Pad;
