//Onsen UI
import {
    Icon
} from 'react-onsenui';

//Styles
import styles from './CloseButton.module.css';


/**
 * Props
 * 
 */
interface Props {
    onClick: () => void;
}


/**
 * CloseButton
 * 
 * Modalt bezáró gomb
 * 
 * @param param0 
 * @returns 
 */
function CloseButton({ onClick }: Props) {
    return (
        <div
            className={styles.container}
            onClick={onClick}>
            <Icon
                icon="fa-arrow-down"
                fixedWidth />
        </div>
    )
}

export default CloseButton;
