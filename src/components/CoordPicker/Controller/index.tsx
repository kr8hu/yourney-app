//Onsen UI
import { Icon } from "react-onsenui";

//Styles
import styles from "./Controller.module.css";


/**
 * Props
 * 
 */
interface Props {
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onLocateMe?: () => void;
}


/**
 * Controller
 * 
 * Térképnézet kezelésére szolgáló komponens.
 * 
 * @returns 
 */
function Controller({ onZoomIn, onZoomOut, onLocateMe }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {/* Zoom in */}
                <div
                    className={styles.col}
                    onClick={onZoomIn}>
                    <Icon
                        className={styles.icon}
                        icon="fa-plus"
                        fixedWidth />
                </div>

                {/* Zoom out */}
                <div
                    className={styles.col}
                    onClick={onZoomOut}>
                    <Icon
                        className={styles.icon}
                        icon="fa-minus"
                        fixedWidth />
                </div>

                {/* Locate */}
                <div
                    className={styles.col}
                    onClick={onLocateMe}>
                    <Icon
                        className={styles.icon}
                        icon="fa-bullseye"
                        fixedWidth />
                </div>
            </div>
        </div>
    )
}

export default Controller;
