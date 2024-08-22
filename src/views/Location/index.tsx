//Onsen UI
import { Page } from 'react-onsenui';

//Components
import Title from './Title';
import Description from './Description';
import Map from '../../components/Map';
import Text from '../../components/Text';
import Toolbar from '../../components/Toolbar';
import Section from '../../components/Section';
import Container from '../../components/Container';
import SwipeGallery from '../../components/SwipeGallery';
import PatternLayout from '../../components/layouts/PatternLayout';

//Interfaces
import ILocation from '../../interfaces/Location';
import ToolbarButton from '../../interfaces/ToolbarButton';

//Assets
import pattern from '../../assets/images/patterns/pattern4.png';

//Styles
import styles from './Location.module.css';
import Address from './Address';


/**
 * Interfaces
 * 
 */
interface Props {
    navigator: any;
    location: ILocation;
}


/**
 * Location
 * 
 * @returns 
 */
function Location({ navigator, location }: Props) {
    /**
     * Toolbar Buttons
     * 
     */
    const toolbarButtons: Array<ToolbarButton> = [
        {
            icon: "fa-times",
            onClick: () => navigator.popPage()
        }
    ];


    /**
    * renderMap
    * 
    * @returns 
    */
    const renderMap = () => {
        if (!location.coords) {
            return (
                <Text
                    node="map_not_available" />
            )
        }

        return (
            <Container>
                <Section
                    title="Térkép">
                    <div className={styles.content}>
                        <Map
                            zoom={14}
                            minZoom={10}
                            maxZoom={20}
                            center={location.coords}
                            locations={location} />
                    </div>
                </Section>
            </Container>
        )
    }


    return (
        <Page>
            <Container className={styles.container}>
                {/* Toolbar */}
                <Toolbar
                    fixed
                    text="title_page_location"
                    buttons={toolbarButtons} />

                {/* Tartalom */}
                <PatternLayout
                    opaque
                    backgroundImage={pattern}>
                    <div className={styles.row}>
                        {/* Galéria */}
                        <div className={styles.col}>
                            <SwipeGallery images={location.photos} />
                        </div>

                        {/* Cím */}
                        <div className={styles.col}>
                            <Title text={location.name} />
                        </div>

                        {/* Leírás */}
                        <div className={styles.col}>
                            <Description
                                text={location.description} />
                        </div>

                        {/* Leírás */}
                        <div className={styles.col}>
                            <Address
                                data={location.address} />
                        </div>

                        {/* Térkép */}
                        <div className={styles.col}>
                            {renderMap()}
                        </div>
                    </div>
                </PatternLayout>
            </Container>
        </Page>
    )
}

export default Location;
