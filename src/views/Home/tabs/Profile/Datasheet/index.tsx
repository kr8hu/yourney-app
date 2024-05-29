//Components
import Body from './Body';
import Header from './Header';
import Container from '../../../../../components/Container';

//Styles
import styles from './Datasheet.module.css';


/**
 * Datasheet
 * 
 * @returns 
 */
function Datasheet() {
    return (
        <Container className={styles.container}>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Header />
                </div>
                <div className={styles.col}>
                    <Body />
                </div>
            </div>
        </Container>
    )
}

export default Datasheet;
