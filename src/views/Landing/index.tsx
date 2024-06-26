//Onsen UI
import { Page } from 'react-onsenui';

//Views
import Home from '../Home';

//Components
import Text from '../../components/Text';
import Button from '../../components/Button';
import Container from '../../components/Container';

//Assets
import image from '../../assets/images/landing/default.jpg';

//Styles
import styles from './Landing.module.css';


/**
 * Props
 * 
 */
interface Props {
    navigator: any;
}


/**
 * Landing page
 * 
 * @param props 
 * @returns 
 */
function Landing({ navigator }: Props) {

    /**
     * openHome
     * 
     * Belépés az alkalmazásba
     */
    const openHome = () => {
        navigator.replacePage({ component: Home });
    }


    return (
        <Page>
            <Container className={styles.container}>
                <div className={styles.layer} />
                <img
                    className={styles.image}
                    src={image}
                    alt="cover" />

                <div className={styles.content}>
                    <Text
                        className={styles.title}
                        node="landing_title" />

                    <Text
                        className={styles.text}
                        node="landing_text" />

                    <Button
                        className={styles.button}
                        onClick={openHome}>
                        <Text node="landing_button" />
                    </Button>
                </div>
            </Container>
        </Page>
    )
}

export default Landing;
