//Components
import Text from '../../Text';

//Styles
import styles from './Content.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    text: string;
}


/**
 * Content
 * 
 * @returns 
 */
function Content({ text }: Props) {
    /**
     * containerStyles
     * 
     */
    const containerStyles = {
        marginTop: '0.5rem',
        marginBottom: '1rem'
    }


    return (
        <div
            className={styles.container}
            style={containerStyles}>
            <Text className={styles.text}>
                {text}
            </Text>
        </div>
    )
}

export default Content;
