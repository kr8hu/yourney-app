//Styles
import { Icon } from "react-onsenui";
import styles from "./Controller.module.css";


interface Props {
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onLocateMe?: () => void;
}

/**
 * Controller
 * 
 * @param param0 
 * @returns 
 */
function Controller({ onZoomIn, onZoomOut, onLocateMe }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div
                    className={styles.col}
                    onClick={onZoomIn}>
                    <Icon
                        className={styles.icon}
                        icon="fa-plus"
                        fixedWidth />
                </div>
                <div
                    className={styles.col}
                    onClick={onZoomOut}>
                    <Icon
                        className={styles.icon}
                        icon="fa-minus"
                        fixedWidth />
                </div>
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
