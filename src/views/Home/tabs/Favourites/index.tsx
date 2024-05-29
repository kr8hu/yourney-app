//React
import {
    useContext,
} from 'react';

//Context
import { UserContext } from '../../../../context/User';

//Components
import Content from './Content';
import Toolbar from '../../../../components/Toolbar';
import Container from '../../../../components/Container';
import Unauthorized from '../../../../components/Unauthorized';
import BackgroundLayout from '../../../../components/layouts/BackgroundLayout';

//Assets
import backgroundImage from '../../../../assets/images/backgrounds/favourites.jpg';

//Styles
import styles from './Favourites.module.css';


/**
 * Props 
 * 
 */
interface Props {
    className?: any;
}


/**
 * Favourites 
 * 
 * @returns
 */
function Favourites(props: Props) {
    //Context
    const { userState } = useContext(UserContext);


    /**
     * classNames
     */
    const classNames = `${styles.container} ${props.className}`;

    
    /**
     * renderedComponent
     * 
     */
    const renderedComponent = userState.userdata ? <Content /> : <Unauthorized />;


    return (
        <Container className={classNames}>
            <BackgroundLayout backgroundImage={backgroundImage}>
                <Toolbar
                    text="title_page_home_favourites"
                    fixed={true} />
                {renderedComponent}
            </BackgroundLayout>
        </Container>
    )
}


export default Favourites;
