//React
import React from 'react';

//Styles
import styles from './Container.module.css';


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    fill?: boolean;
    responsive?: boolean;
    children: React.ReactNode | React.ReactNode[];
    onClick?: () => void;
}


/**
 * Container
 * 
 * @returns 
 */
function Container({ className, fill, children, responsive, onClick }: Props) {
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
    const onClickHandler = () => {
        if (!onClick) return;

        onClick();
    }


    return (
        <div
            className={classNames}
            data-fill={fill || false}
            data-responsive={responsive || false}
            onClick={onClickHandler}>
            {children}
        </div>
    )
}

export default Container;
