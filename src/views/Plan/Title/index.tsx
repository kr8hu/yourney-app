//Components
import Text from "../../../components/Text";
import Container from "../../../components/Container";

//Styles
import styles from "./Title.module.css";


/**
 * Interfaces
 * 
 */
interface Props {
    text: string;
}


/**
 * Title
 * 
 * @returns 
 */
function Title({ text }: Props) {
    return (
        <Container className={styles.container}>
            <Text className={styles.title}>
                {text}
            </Text>
        </Container>
    )
}

export default Title;
