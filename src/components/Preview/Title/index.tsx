//Components
import Text from '../../Text';

//Styles
import styles from './Title.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    text: string | undefined;
}


/**
 * Title
 * 
 * @returns 
 */
function Title({ text }: Props) {
    /**
     * containerStyles
     * 
     */
    const containerStyles = {
        marginBottom: '0.25rem'
    }


    return (
        <div
            className={styles.container}
            style={containerStyles}>
            <Text className={styles.title}>
                {text}
            </Text>
        </div>
    )
}

export default Title;
