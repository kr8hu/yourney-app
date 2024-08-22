//Styles
import styles from './Button.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    className?: any;
    children?: React.ReactNode;
    onClick?: () => void;
}


/**
 * Button
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
    const onClickHandler = () => onClick && onClick();


    return (
        <div
            className={classNames}
            onClick={onClickHandler}>
            {children}
        </div>
    )
}

export default Button;
