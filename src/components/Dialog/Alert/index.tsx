//Components
import Button from '../../Button';
import Text from '../../Text';

//Styles 
import styles from './Alert.module.css';


/**
 * Props
 * 
 */
interface Props {
    onClose: any;
}


/**
 * Alert
 * 
 * Üzenetet megjelenítő dialógus.
 * 
 * @param props 
 * @returns 
 */
function Alert({ onClose }: Props) {
    return (
        <Button
            className={styles.button}
            onClick={() => onClose()}>
            <Text>
                OK
            </Text>
        </Button>
    )
}

export default Alert;
