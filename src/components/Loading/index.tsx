//Onsen UI
import { ProgressCircular } from 'react-onsenui';

//Styles
import styles from './Loading.module.css';


/**
 * Loading
 * 
 * Töltési képet megjelenítő komponens
 * 
 * @returns 
 */
function Loading() {
    return (
        <div className={styles.container}>
            <ProgressCircular indeterminate />
        </div>
    )
}

export default Loading;
