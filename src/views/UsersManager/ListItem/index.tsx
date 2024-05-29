//Onsen UI
import * as Ons from 'react-onsenui';

//Components
import Text from '../../../components/Text';

//Shared
import { url } from '../../../shared/const';

//Interfaces
import User from '../../../interfaces/User';

//Assets
import defaultPicture from '../../../assets/images/main/profile.jpg'

//Styles
import styles from './ListItem.module.css';


/**
 * Props
 * 
 */
interface Props {
    user: User;
    onDelete: (user: User) => void;
}


/**
 * ListItem
 * 
 * @param param0 
 * @returns 
 */
function ListItem({ user, onDelete }: Props) {
    /**
     * imageUrl
     * 
     * Kép elérési útvonala
     */
    const imageUrl = `${url}/public/images/profiles/${user.picture}`;


    /**
     * renderModificationOptions
     * 
     * @returns 
     */
    const renderModificationOptions = () => {
        return (
            <div className={styles.row}>
                {/* Törlés */}
                <div
                    className={styles.col}
                    data-type="destructive"
                    onClick={() => onDelete(user)}>
                    <Ons.Icon
                        className={styles.icon}
                        icon="fa-trash"
                        fixedWidth />
                    <Text
                        className={styles.text}
                        node="usersmanager_delete" />
                </div>
            </div>
        )
    }


    return (
        <Ons.ListItem
            expandable
            className={styles.listItem}>
            {/* Bélyegkép */}
            <div className="left">
                <img
                    className="list-item__thumbnail"
                    alt="thumbnail"
                    src={user.picture ? imageUrl : defaultPicture} />
            </div>

            {/* Szöveges tartalom */}
            <div className="center">
                <Text className="list-item__title">
                    {user.username}
                </Text>
                <Text className="list-item__subtitle">
                    {user.email}
                </Text>
            </div>

            {/* Kezelőfelület */}
            <div className="expandable-content">
                {renderModificationOptions()}
            </div>
        </Ons.ListItem>
    )
}

export default ListItem;
