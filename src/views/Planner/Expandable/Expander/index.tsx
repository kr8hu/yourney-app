//Onsen UI
import { Icon } from 'react-onsenui';

//Styles
import styles from './Expander.module.css';


/**
 * Props
 */
interface Props {
    onClick: () => void;
}


/**
 * Expander
 * 
 * A programtervezőt további LocationForm űrlappal kibővítő komponens
 * 
 * @returns 
 */
function Expander({ onClick }: Props) {
    return (
        <div
            className={styles.container}
            onClick={onClick}>
            <Icon
                icon={{
                    default: "fa-plus"
                }}
                fixedWidth />
        </div>
    )
}

export default Expander;
