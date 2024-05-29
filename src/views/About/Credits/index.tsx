//Components
import Text from '../../../components/Text';
import Section from '../../../components/Section';


//Assets
import logo_react from '../../../assets/images/credits/react.png';
import logo_onsenui from '../../../assets/images/credits/onsenui.png';
import logo_capacitor from '../../../assets/images/credits/capacitor.png';
import logo_mongodb from '../../../assets/images/credits/mongodb.png';
import logo_typescript from '../../../assets/images/credits/typescript.png';
import logo_bingmaps from '../../../assets/images/credits/bingmaps.png';

//Styles
import styles from './Credits.module.css';
import Container from '../../../components/Container';


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
     */
    const credits = [
        {
            title: "Üdvözlő oldal háttérkép",
            linkText: "Image by wirestock",
            text: "on Freepik",
            url: "https://www.freepik.com/free-photo/parliament-building-danube-budapest_17650118.htm#fromView=search&page=1&position=2&uuid=a16b099e-5f4a-4de4-a3f2-049853edeb03"
        },
        {
            title: "Felfedezés oldal háttérkép",
            linkText: "Image by rorozoa",
            text: "on Freepik",
            url: "https://www.freepik.com/free-photo/hot-air-balloon-soars-vineyards-dawns-early-light_135009319.htm#query=landscape%20balloons&position=6&from_view=search&track=ais&uuid=4e82c604-ed80-45f3-88c5-a179ba599a24"
        },
        {
            title: "Keresés oldal háttérkép",
            linkText: "Image by Freepik",
            text: "",
            url: "https://www.freepik.com/free-photo/view-world-travel-map-with-smartphone-magnifying-glass_28478755.htm#query=search%20explore%20map&position=0&from_view=search&track=ais&uuid=09ae58e6-fa32-4b4e-ab25-77ad2ab32b9e"
        },
        {
            title: "Kedvencek oldal háttérkép",
            linkText: "Image by gpointstudio",
            text: "on Freepik",
            url: "https://www.freepik.com/free-photo/crazy-drive-young-couple_13131628.htm#query=tour%20favourite%20joy&position=2&from_view=search&track=ais&uuid=fd4731a2-5ee5-4d53-a73b-9c6aa5179dc1#position=2&query=tour%20favourite%20joy"
        },
        {
            title: "Profil oldal háttérkép",
            linkText: "Image by rawpixel.com",
            text: "on Freepik",
            url: "https://www.freepik.com/free-photo/place-work-place-work-coffee-desk-simple-tools_2791692.htm#query=profile%20account%20paper%20office%20desk&position=10&from_view=search&track=ais&uuid=24bb58d4-ef1d-4098-bad6-fcf9995945ec"
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
