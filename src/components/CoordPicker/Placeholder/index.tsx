//Capacitor
import { Geolocation } from '@capacitor/geolocation';

//Components
import Text from '../../Text';

//Styles
import styles from './Placeholder.module.css';


/**
 * Props
 * 
 */
interface Props {
    text: string;
}


/**
 * Placeholder
 * 
 * @returns 
 */
function Placeholder({ text }: Props) {
    /**
     * onClick
     * 
     */
    const onClick = () => {
        Geolocation.checkPermissions();
    }


    return (
        <div
            className={styles.container}
            onClick={onClick}>
            <Text
                className={styles.text}
                node={text} />
        </div>
    )
}

export default Placeholder;
