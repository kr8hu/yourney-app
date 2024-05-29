//Onsen UI
import { Icon } from 'react-onsenui';

//Styles
import styles from './Scroller.module.css';


/**
 * Props
 * 
 */
interface Props {
    onScrollBackward: () => void;
    onScrollForward: () => void;
}


/**
 * Scroller
 * 
 * @returns 
 */
function Scroller({ onScrollBackward, onScrollForward }: Props) {
    return (
        <div className={styles.container}>
            {/* Vissza */}
            <div
                className={styles.leftContainer}
                onClick={onScrollBackward}>
                <div className={styles.button}>
                    <Icon
                        icon="fa-arrow-left"
                        fixedWidth />
                </div>
            </div>

            {/* Előre */}
            <div
                className={styles.rightContainer}
                onClick={onScrollForward}>
                <div className={styles.button}>
                    <Icon
                        icon="fa-arrow-right"
                        fixedWidth />
                </div>
            </div>
        </div>
    )
}

export default Scroller;
