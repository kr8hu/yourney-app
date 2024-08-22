//React
import React from 'react';

//Styles
import styles from './Container.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    className?: any;
    stretch?: boolean;
    children: React.ReactNode | React.ReactNode[];
    onClick?: () => void;
}


/**
 * Container
 * 
 * @returns 
 */
function Container({ className, stretch, children, onClick }: Props) {
    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${className}`;



    /**
     * onClickHandler
     * 
     * @returns 
     */
    const onClickHandler = () => onClick && onClick();


    return (
        <div
            className={classNames}
            data-stretch={stretch || false}
            onClick={onClickHandler}>
            {children}
        </div>
    )
}

export default Container;
