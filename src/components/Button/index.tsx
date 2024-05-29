//Styles
import styles from './Button.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    children?: React.ReactNode;
    onClick?: () => void
}


/**
 * Button
 * 
 * Gomb
 * 
 * @returns 
 */
function Button({ className, children, onClick }: Props) {
    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${className}`;


    /**
     * onClickHandler
     * 
     */
    const onClickHandler = () => {
        if (!onClick) return;

        onClick();
    }


    return (
        <div
            className={classNames}
            onClick={onClickHandler}>
            {children}
        </div>
    )
}

export default Button;
