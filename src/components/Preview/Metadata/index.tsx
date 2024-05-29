//Onsen UI
import {
    Icon,
    Modifiers_string
} from 'react-onsenui';

//Components
import Text from '../../Text';

//Styles
import styles from './Metadata.module.css';


/**
 * Props
 * 
 */
interface Props {
    icon: string | Modifiers_string;
    text: string;
}


/**
 * Metadata
 * 
 * Metaadatot megjelenítő komponens
 * 
 * @param icon 
 * @param text 
 * @returns 
 */
function Metadata({ icon, text }: Props) {
    return (
        <div className={styles.container}>
            <Icon
                icon={icon}
                fixedWidth />
            <Text className={styles.data}>
                {text}
            </Text>
        </div>
    )
}

export default Metadata;
