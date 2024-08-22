//React
import { useContext } from 'react';

//Context
import { UserContext } from '../../../context/User';

//Onsen UI
import * as Ons from 'react-onsenui';

//Components
import Text from '../../../components/Text';

//Shared
import { url } from '../../../shared/const';

//Interfaces
import Post from '../../../interfaces/Post';

//Styles
import styles from './ListItem.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    post: Post;
    onVisit: (post: Post) => void;
    onEdit: (post: Post) => void;
    onApprove: (post: Post) => void;
    onDelete: (post: Post) => void;
}


/**
 * ListItem
 * 
 * @param param0 
 * @returns 
 */
function ListItem({ post, onVisit, onEdit, onApprove, onDelete }: Props) {
    //Context
    const { userState } = useContext(UserContext);


    /**
     * imageUrl
     * 
     */
    const imageUrl = `${url}/public/images/plans/${post.photos[0]}`;


    /**
     * renderModificationOptions
     * 
     * @returns 
     */
    const renderModificationOptions = () => {
        return (
            <div className={styles.row}>
                {/* Megtekintés */}
                <div
                    className={styles.col}
                    onClick={() => onVisit(post)}>
                    <Ons.Icon
                        className={styles.icon}
                        icon="fa-eye"
                        fixedWidth />
                    <Text
                        className={styles.text}
                        node="postsmanager_visit" />
                </div>

                {/* Szerkesztés */}
                <div
                    className={styles.col}
                    onClick={() => onEdit(post)}>
                    <Ons.Icon
                        className={styles.icon}
                        icon="fa-pencil"
                        fixedWidth />
                    <Text
                        className={styles.text}
                        node="postsmanager_edit" />
                </div>

                {/* Jóváhagyás (admin-only) */}
                {(!post.approved && userState.userdata.group === 1) && (
                <div
                    className={styles.col}
                    onClick={() => onApprove(post)}>
                        <Ons.Icon
                            className={styles.icon}
                            icon="fa-check"
                            fixedWidth />
                        <Text
                            className={styles.text}
                            node="postsmanager_approve" />
                    </div>
                )}

                {/* Törlés */}
                <div
                    className={styles.col}
                    data-type="destructive"
                    onClick={() => onDelete(post)}>
                    <Ons.Icon
                        className={styles.icon}
                        icon="fa-trash"
                        fixedWidth />
                    <Text
                        className={styles.text}
                        node="postsmanager_delete" />
                </div>
            </div>
        )
    }


    return (
        <Ons.ListItem
            expandable
            className={styles.container}>
            {/* Bélyegkép */}
            <div className="left">
                <img
                    className="list-item__thumbnail"
                    alt="thumbnail"
                    src={imageUrl} />
            </div>

            {/* Szöveges tartalom */}
            <div className="center">
                <Text className="list-item__title">
                    {post.name.length > 32 ? `${post.name.substr(0, 32)}...` : post.name}
                </Text>
                <Text className="list-item__subtitle">
                    {post.description.substr(0, 32)}...
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
