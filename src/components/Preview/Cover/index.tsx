//Components
import Image from '../../Image';

//Styles
import styles from './Cover.module.css';


/**
 * Props
 * 
 */
interface Props {
    src: any;
}


/**
 * Cover
 * 
 * @returns 
 */
function Cover({ src }: Props) {
    /**
     * imageContainerStyles
     * 
     */
    const containerStyles = {
        marginBottom: '0.25rem'
    }


    return (
        <div
            className={styles.container}
            style={containerStyles}>
            <Image
                className={styles.image}
                src={src} />
        </div>
    )
}

export default Cover;
