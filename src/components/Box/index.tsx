//Components
import Text from '../Text';

//Styles
import styles from './Box.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    title?: string;
    type?: "error" | "warning" | "success" | "destructive" | "default";
    bordered?: boolean;
    children: React.ReactNode;
}


/**
 * Box
 * 
 * Figyelmeztetések, információk vagy hibaüzenetek megjelenítésére alkalmas komponens.
 * 
 * @returns 
 */
function Box(props: Props) {
    /**
     * borderWidth
     * 
     */
    const borderWidth = props.bordered ? '1px' : '0';


    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${props.className}`;


    return (
        <div
            className={classNames}
            data-type={props.type || "default"}
            style={{ borderWidth }}>

            {/* Címsor megjelenítése ha meg van adva */}
            {props.title && (
                <Text className={styles.title}>{props.title}</Text>
            )}

            {/* Tartalom */}
            {props.children}

        </div>
    )
}

export default Box;
