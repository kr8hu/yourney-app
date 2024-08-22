//Components
import Text from '../../../components/Text';
import Section from '../../../components/Section';
import Container from '../../../components/Container';

//Assets
import logo_react from '../../../assets/images/credits/react.png';
import logo_onsenui from '../../../assets/images/credits/onsenui.png';
import logo_capacitor from '../../../assets/images/credits/capacitor.png';
import logo_mongodb from '../../../assets/images/credits/mongodb.png';
import logo_typescript from '../../../assets/images/credits/typescript.png';
import logo_bingmaps from '../../../assets/images/credits/bingmaps.png';

//Styles
import styles from './Credits.module.css';


/**
 * Credits
 * 
 * @returns 
 */
function Credits() {
    /**
     * logos
     * 
     */
    const logos = [
        logo_react,
        logo_capacitor,
        logo_mongodb,
        logo_onsenui,
        logo_bingmaps,
        logo_typescript,
    ];


    /**
     * credits
     * 
     */
    const credits = [
        {
            title: "Háttérképek",
            linkText: "Images created using an AI tool",
            text: "on Canva",
            url: "https://www.canva.com/ai-image-generator/"
        },
        {
            title: "Alapértelmezett profilkép",
            linkText: "Image by juicy_fish",
            text: "on Freepik",
            url: "https://www.freepik.com/free-vector/blank-user-circles_134996379.htm#fromView=search&page=1&position=8&uuid=49ad8e5f-34cb-4b64-9f6f-f35d92c995ce"
        }
    ];


    /**
     * renderLogos
     * 
     * @returns 
     */
    const renderLogos = () => {
        return logos.map((logo: any, idx: number) => {
            return (
                <div className={styles.logo}>
                    <img
                        key={idx}
                        src={logo}
                        alt={`logo-${idx}`} />
                </div>
            )
        })
    }


    /**
     * renderCredits
     * 
     * @returns 
     */
    const renderCredits = () => {
        return credits.map((credit: any, idx: number) => {
            return (
                <Section
                    title={credit.title}>
                    <div className={styles.content}>
                        <Text>
                            <a
                                rel="noreferrer"
                                target="_blank"
                                href={credit.url}>{credit.linkText}</a> {credit.text}
                        </Text>
                    </div>
                </Section>
            )
        })
    }


    return (
        <Container>
            <div className={styles.row}>
                <div className={styles.col}>
                    {renderCredits()}
                </div>
                <div className={styles.col}>
                    <div className={styles.row}>
                        {renderLogos()}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Credits;
