//Onsen UI
import { Icon } from "react-onsenui";

//Components
import ProfilePicture from "../../../components/ProfilePicture";
import Text from "../../../components/Text";
import Container from "../../../components/Container";

//Interfaces
import IMetadata from "../../../interfaces/Metadata";

//Shared
import { url } from "../../../shared/const";

//Styles
import styles from "./Metadata.module.css";


/**
 * Interfaces
 * 
 */
interface Props {
    dataset: Array<IMetadata>;
}


/**
 * Metadata
 * 
 * @returns 
 */
function Metadata({ dataset }: Props) {
    /**
     * imageUrl
     */
    const imageUrl = `${url}/public/images/profiles/`;


    /**
     * renderMetadata
     * 
     * @returns 
     */
    const renderMetadata = () => {
        return dataset.map((meta: IMetadata, idx: number) => {
            return (
                <div
                    key={idx}
                    className={styles.col}>
                    {idx === 0 ?
                        (
                            <ProfilePicture
                                className={styles.picture}
                                src={imageUrl + meta.icon as string} />
                        )
                        :
                        (
                            <Icon
                                className={styles.icon}
                                icon={meta.icon}
                                fixedWidth />
                        )}

                    <Text
                        className={styles.title}
                        node={meta.title} />

                    <Text className={styles.text}>
                        {meta.text}
                    </Text>
                </div>
            )
        })
    }


    return (
        <Container className={styles.container}>
            <div className={styles.row}>
                {renderMetadata()}
            </div>
        </Container>
    )
}

export default Metadata;
