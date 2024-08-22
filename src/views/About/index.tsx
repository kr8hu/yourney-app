//Onsen UI
import { Page } from 'react-onsenui';

//Components
import Credits from './Credits';
import Text from '../../components/Text';
import Toolbar from '../../components/Toolbar';
import Container from '../../components/Container';

//Interfaces
import ToolbarButton from '../../interfaces/ToolbarButton';

//Styles
import styles from './About.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    navigator: any;
}


/**
 * About
 * 
 * @returns 
 */
function About({ navigator }: Props) {

    /**
     * toolbarButtons
     * 
     */
    const toolbarButtons: Array<ToolbarButton> = [
        {
            icon: "fa-times",
            onClick: () => navigator.popPage()
        }
    ];


    return (
        <Page>
            <Container>
                {/* Toolbar */}
                <Toolbar
                    fixed
                    text="title_page_about"
                    buttons={toolbarButtons} />

                {/* Tartalom */}
                <div className={styles.row}>
                    <div className={styles.col}>
                        <Text
                            className={styles.text}
                            node="credits_text" />
                    </div>
                    <div className={styles.col}>
                        <Credits />
                    </div>
                </div>
            </Container>
        </Page>
    )
}

export default About;
