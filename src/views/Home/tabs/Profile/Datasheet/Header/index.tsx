//React
import { useContext } from 'react';

//Context
import { UserContext } from '../../../../../../context/User';

//Components
import Text from '../../../../../../components/Text';
import Avatar from '../../../../../../components/Avatar';
import Container from '../../../../../../components/Container';

//Shared
import { url } from '../../../../../../shared/const';

//Styles
import styles from './Header.module.css';


/**
 * Header
 * 
 * @returns 
 */
function Header() {
    //Context
    const { userState } = useContext(UserContext);

    //Variables
    const date = new Date(userState.userdata.regdate);
    const year = date?.getFullYear();
    const month = (date?.getMonth() + 1).toString().length > 1 ? (date?.getMonth() + 1) : `0${(date?.getMonth() + 1)}`;
    const day = date?.getDate().toString().length > 1 ? date?.getDate() : `0${date?.getDate()}`;

    const hours = date?.getHours().toString().length > 1 ? date?.getHours() : `0${date?.getHours()}`
    const minutes = date?.getMinutes().toString().length > 1 ? date?.getMinutes() : `0${date?.getMinutes()}`

    /**
     * imageUrl
     */
    const imageUrl = `${url}/public/images/profiles/${userState.userdata.picture}`;

    
    /**
     * profileData
     */
    const profileData = [
        {
            title: "profile_username",
            text: userState.userdata.username
        },
        {
            title: "profile_email",
            text: userState.userdata.email
        },
        {
            title: "profile_regdate",
            text: `${year}.${month}.${day} - ${hours}:${minutes}`
        }
    ];


    /**
     * renderProfileData
     * 
     * Profil adatainak renderelése
     * 
     * @returns 
     */
    const renderProfileData = () => {
        return profileData.map((data: any, idx: number) => {
            return (
                <div
                    key={idx}
                    className={styles.data}>
                    <Text
                        className={styles.title}
                        node={data.title} />

                    <Text
                        className={styles.text}>
                        {data.text}
                    </Text>
                </div>
            )
        })
    }


    return (
        <Container>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Avatar
                        className={styles.picture}
                        src={imageUrl} />
                </div>
                <div className={styles.col}>
                    {renderProfileData()}
                </div>
            </div>
        </Container>
    )
}

export default Header;