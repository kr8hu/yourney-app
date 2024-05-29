//Components
import Text from "../../../components/Text";
import Section from "../../../components/Section";
import Container from "../../../components/Container";

//Styles
import styles from "./Description.module.css";


/**
 * Props
 * 
 */
interface Props {
    text: string;
}


/**
 * Description
 * 
 * @returns 
 */
function Description({ text }: Props) {
    return (
        <Container>
            <Section
                title="Leírás">
                <div className={styles.content}>
                    <Text>
                        {text}
                    </Text>
                </div>
            </Section>
        </Container>
    )
}

export default Description;
