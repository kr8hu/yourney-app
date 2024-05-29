//Components
import Text from "../../../components/Text";
import Section from "../../../components/Section";
import Container from "../../../components/Container";

//Interfaces
import LocationAddress from "../../../interfaces/LocationAddress";

//Styles
import styles from "./Address.module.css";


/**
 * Props
 * 
 */
interface Props {
    data: LocationAddress;
}


/**
 * Address
 * 
 * @returns 
 */
function Address({ data }: Props) {
    /**
     * renderAddress
     * 
     * @returns 
     */
    const renderAddress = () => {
        if (data === null) {
            return (
                <Text node="not_available_short" />
            )
        }

        return (
            <Container>
                <Text className={styles.country}>
                    {data?.country}
                </Text>
                <Text className={styles.address}>
                    {data?.postalCode ? `${data.postalCode}, ` : ""}
                    {data?.county ? `${data.county}, ` : ""}
                    {data?.city ? `${data.city}` : ""}
                </Text>
            </Container>
        )
    }


    return (
        <Container>
            <Section
                title="Helyinformációk">
                <div className={styles.content}>
                    <Text
                        className={styles.text}>
                        {renderAddress()}
                    </Text>
                </div>
            </Section>
        </Container>
    )
}

export default Address;
