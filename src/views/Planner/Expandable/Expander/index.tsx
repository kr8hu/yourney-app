//Onsen UI
import { Icon } from 'react-onsenui';

//Styles
import styles from './Expander.module.css';


/**
 * Interfaces
 */
interface Props {
    onClick: () => void;
}


/**
 * Expander
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
