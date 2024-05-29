//React
import {
    useContext
} from 'react';

//Context
import { UserContext } from '../../../../context/User';

//Components
import Datasheet from './Datasheet';
import Toolbar from '../../../../components/Toolbar';
import Container from '../../../../components/Container';
import Unauthorized from '../../../../components/Unauthorized';
import BackgroundLayout from '../../../../components/layouts/BackgroundLayout';

//Assets
import backgroundImage from '../../../../assets/images/backgrounds/profile.jpg';

//Styles
import styles from './Profile.module.css';


/**
 * Props 
 * 
 */
interface Props {
    className?: any;
}


/**
 * Profile 
 * 
 * @returns
 */
function Profile(props: Props) {
    //Context
    const { userState } = useContext(UserContext);


    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${props.className}`;

    
    /**
     * renderedComponent
     * 
     */
    const renderedComponent = userState.userdata ? <Datasheet /> : <Unauthorized />;


    return (
        <Container fill className={classNames}>
            <BackgroundLayout backgroundImage={backgroundImage}>
                <Toolbar
                    text="title_page_home_profile"
                    fixed={true} />
                {renderedComponent}
            </BackgroundLayout>
        </Container>
    )
}

export default Profile;
