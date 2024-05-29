//Components
import Latests from './Latests';
import Populars from './Populars';
import Locations from './Locations';
import Categories from './Categories';

import Toolbar from '../../../../components/Toolbar';
import Section from '../../../../components/Section';
import Container from '../../../../components/Container';
import BackgroundLayout from '../../../../components/layouts/BackgroundLayout';

//Assets
import backgroundImage from '../../../../assets/images/backgrounds/explore.jpg';

//Styles
import styles from './Explore.module.css';


/**
 * Props 
 * 
 */
interface Props {
    className?: any;
}


/**
 * Explore 
 * 
 * @returns
 */
function Explore(props: Props) {
    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${props.className}`;


    return (
        <Container className={classNames}>
            {/* Háttér */}
            <BackgroundLayout backgroundImage={backgroundImage}>
                {/* Toolbar */}
                <Toolbar
                    fixed={true}
                    text="title_page_home_explore" />

                {/* Tartalom */}
                <div className={styles.row}>
                    {/* Kategóriák */}
                    <div className={styles.col}>
                        <Section title="Kategóriák">
                            <Categories />
                        </Section>
                    </div>

                    {/* Legutóbbi bejegyzések */}
                    <div className={styles.col}>
                        <Section
                            className={styles.content}
                            title="Nemrég feltöltve">
                            <Latests
                                numberOfPosts={3} />
                        </Section>
                    </div>

                    {/* Legnépszerűbb bejegyzések */}
                    <div className={styles.col}>
                        <Section
                            className={styles.content}
                            title="Legnépszerűbb">
                            <Populars
                                numberOfPosts={3} />
                        </Section>
                    </div>

                    {/* Legnépszerűbb helyek */}
                    <div className={styles.col}>
                        <Section
                            className={styles.content}
                            title="Javasolt helyek">
                            <Locations
                                numberOfPosts={3} />
                        </Section>
                    </div>
                </div>
            </BackgroundLayout>
        </Container>
    )
}

export default Explore;
