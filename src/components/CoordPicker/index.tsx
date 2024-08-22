/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

//React
import {
    useRef,
    useState,
    useEffect,
} from 'react';

//Capacitor
import { Geolocation } from '@capacitor/geolocation';

//Onsen UI
import ons from 'onsenui';

//Components
import Placeholder from './Placeholder';
import Controller from './Controller';

//Interfaces
import LocationCoords from '../../interfaces/LocationCoords';
import CoordPickerResult from '../../interfaces/CoordPickerResult';

//Styles
import styles from './CoordPicker.module.css';


//Variables
let map: any;


/**
 * Interfaces
 * 
 */
interface Props {
    zoom: number;
    maxZoom: number;
    minZoom: number;
    onClick: (value: CoordPickerResult) => void;
}


/**
 * CoordPicker
 * 
 * @param props 
 * @returns 
 */
function CoordPicker({ zoom, minZoom, maxZoom, onClick }: Props) {
    //States
    const [permission, setPermission] = useState<boolean>(false);
    const [position, setPosition] = useState<any>(undefined);
    const [textNode, setTextNode] = useState<string>("placeholder_map_permission");


    //Ref
    const mapRef: any = useRef();


    //Effects
    useEffect(() => {
        checkPermissions();
        //eslint-disable-next-line
    }, []);


    useEffect(() => {
        //Ha nincs jogosultsága az appnak a helyadatokhoz
        if (!permission) {
            Geolocation.requestPermissions();
            setTextNode("placeholder_map_permission");
            return;
        }

        //Helyadatok kérése
        getCurrentPosition();
        //eslint-disable-next-line
    }, [permission]);


    useEffect(() => {
        //Hibaüzenet megjelenítése ha nincs helyadat
        if (position === undefined) {
            setTextNode("placeholder_map_position");
            return;
        }

        //Bing térkép betöltése
        createBingMap();
        //eslint-disable-next-line
    }, [position]);


    /**
     * placeholder
     * 
     */
    const placeholder = (position === undefined && <Placeholder text={textNode} />)


    /**
     * mapOptions
     * 
     */
    const mapOptions: Microsoft.Maps.IMapLoadOptions = {
        credentials: process.env.REACT_APP_API_KEY_BINGMAPS,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        enableHighDpi: true,
        disableBirdseye: true,
        disablePanning: false,
        disableScrollWheelZoom: false,
        minZoom,
        maxZoom,
        showMapTypeSelector: true,
        showLocateMeButton: false,
        showLogo: false,
        showTermsLink: false,
        showDashboard: false,
        zoom,
    }


    /**
     * pushpinOptions
     * 
     */
    const pushpinOptions: Microsoft.Maps.IPushpinOptions = {
        title: 'Kijelölt helyszín',
        text: 'P',
        color: '#FF0000',
    }


    /**
     * checkPermissions
     * 
     */
    const checkPermissions = async () => {
        const permission = await Geolocation.checkPermissions();

        if (permission.location === "granted") {
            setPermission(true);
        }
        else {
            setPermission(false);
        }
    }


    /**
     * getCurrentPosition
     * 
     */
    const getCurrentPosition = async () => {
        const position = await Geolocation.getCurrentPosition();
        setPosition(position);
    }


    /**
     * createBingMap
     * 
     */
    const createBingMap = async () => {
        //Térkép nézet pozicíójának meghatározása
        const center = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude
        );

        //Térkép betöltése a megadott elembe
        map = new Microsoft.Maps.Map(mapRef.current, {
            ...mapOptions,
            center: center,
        });

        Microsoft.Maps.Events.addHandler(map, "click", mapClickEvent);
    }


    /**
     * mapClickEvent
     * 
     * @param e 
     */
    const mapClickEvent = (e: any) => {
        //Kattintás helyén lévő koordináták kérése
        const location = new Microsoft.Maps.Location(
            e.location.latitude,
            e.location.longitude
        );

        //Pin létrehozása
        const pin = new Microsoft.Maps.Pushpin(location, {
            ...pushpinOptions,
            subTitle: `Lat: ${location.latitude} Lon: ${location.longitude}`,
        });


        //Search modul betöltése
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', () => {
            const geocoder = new Microsoft.Maps.Search.SearchManager(map);

            const reverseGeocodeRequest = {
                location: location,
                callback: (result: any) => geoRequestHandler(result, e.location),
                errorCallback: geoErrorHandler
            };

            geocoder.reverseGeocode(reverseGeocodeRequest);
        });

        //Pushpin kezelése
        map.entities.clear();
        map.entities.push(pin);
    }


    /**
     * geoRequestHandler
     * 
     * @param result 
     * @param location 
     */
    const geoRequestHandler = (result: any, location: LocationCoords) => {
        if (result && result.address) {
            const address = result.address;

            onClick({
                coords: location,
                address: {
                    country: address.countryRegion,
                    county: address.adminDistrict,
                    city: address.locality,
                    postalCode: address.postalCode
                }
            });
        } else {
            ons.notification.toast({
                message: "A kijelölt helyről nem található adat.",
                buttonLabel: "OK",
                force: true,
                timeout: 3000
            });
        }
    }


    /**
     * geoErrorHandler
     * 
     * @param e 
     */
    const geoErrorHandler = (e: any) => {
        ons.notification.toast({
            message: "Hiba lépett fel a kijelölt hely adatainak betöltése közben.",
            buttonLabel: "OK",
            force: true,
            timeout: 3000
        });
    }



    /**
     * viewZoomIn
     * 
     */
    const viewZoomIn = () => {
        const value = map.getZoom() + 1;
        map.setView({ zoom: value });
    }


    /**
     * viewZoomOut
     * 
     */
    const viewZoomOut = () => {
        const value = map.getZoom() - 1;
        map.setView({ zoom: value });
    }


    /**
     * onLocateMe
     * 
    */
    const onLocateMe = () => {
        const center = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude
        );

        map.setView({ center });
    }


    return (
        <div className={styles.wrapper}>
            <Controller
                onZoomIn={viewZoomIn}
                onZoomOut={viewZoomOut}
                onLocateMe={onLocateMe} />
            <div
                ref={mapRef}
                className={styles.container}>
                {placeholder}
            </div>
        </div>
    )
}

export default CoordPicker;
