//Onsen UI
import { Icon } from 'react-onsenui';

//Components
import Text from '../../../components/Text';
import Container from '../../../components/Container';

//Styles
import styles from './Placeholder.module.css';


/**
 * Placeholder
 * 
 * @returns 
 */
function Placeholder() {
    return (
        <Container fill className={styles.container}>
            <Icon
                className={styles.icon}
                icon="fa-cube"
                fixedWidth />

            <Text
                className={styles.text}
                node="placeholder_function_disabled" />
        </Container>
    )
}

export default Placeholder;
