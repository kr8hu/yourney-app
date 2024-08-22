//Styles
import styles from './BackgroundLayout.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    backgroundImage: any;
    children: React.ReactNode;
}


/**
 * BackgroundLayout
 * 
 * @returns 
 */
function BackgroundLayout({ backgroundImage, children }: Props) {
    return (
        <>
            <img
                className={styles.background}
                src={backgroundImage}
                alt="háttérkép" />

            <div className={styles.layer} />

            {children}
        </>
    )
}

export default BackgroundLayout;
