//React
import { useContext } from 'react';

//Context
import { AppContext } from '../../../../../../context/App';
import { UserContext } from '../../../../../../context/User';

//Onsen UI
import { Icon } from 'react-onsenui';

//Components
import Text from '../../../../../../components/Text';
import Container from '../../../../../../components/Container';

//Interfaces
import Post from '../../../../../../interfaces/Post';

//Styles
import styles from './Body.module.css';


/**
 * Body
 * 
 * @returns 
 */
function Body() {
    //Context
    const { appState } = useContext(AppContext);
    const { userState } = useContext(UserContext);


    /**
     * userPosts
     * 
     */
    const userPosts: Array<Post> = appState.content.filter((p: Post) => p.author === userState.userdata.username);


    /**
     * countLikes
     * 
     * @returns 
     */
    const countLikes = () => {
        let result = 0;

        for (let post of userPosts) {
            result += post.likes.length;
        }

        return result.toString();
    }


    /**
     * renderProfileData
     * 
     * @returns 
     */
    const renderProfileData = () => {
        /**
         * profileData
         */
        const profileData = [
            {
                icon: "fa-pencil",
                title: "profile_number_of_posts",
                text: userPosts.length.toString()
            },
            {
                icon: "fa-heart",
                title: "profile_total_likes",
                text: countLikes()
            },
        ];

        return profileData.map((data: any, idx: number) => {
            return (
                <div
                    key={idx}
                    className={styles.col}>
                    <div className={styles.innerrow}>
                        <div className={styles.innercol}>
                            <Icon
                                className={styles.icon}
                                icon={data.icon}
                                fixedWidth />
                        </div>
                        <div className={styles.innercol}>
                            <Text
                                className={styles.title}
                                node={data.title} />
                            <Text
                                className={styles.text}>
                                {data.text}
                            </Text>
                        </div>
                    </div>
                </div>
            )
        })
    }


    return (
        <Container>
            <div className={styles.row}>
                {renderProfileData()}
            </div>
        </Container>
    )
}

export default Body;