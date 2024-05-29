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
 * Props
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
        if (!permission) {
            Geolocation.requestPermissions();

            setTextNode("placeholder_map_permission");
            return;
        }

        getCurrentPosition();
        //eslint-disable-next-line
    }, [permission]);


    useEffect(() => {
        if (position === undefined) {
            setTextNode("placeholder_map_position");
            return;
        }

        createBingMap();
        //eslint-disable-next-line
    }, [position]);


    /**
     * placeholder
     * 
     * Helyadatok lekérésének ideje alatt ideiglenesen megjelenő komponens
     */
    const placeholder = (position === undefined && <Placeholder text={textNode} />)


    /**
     * mapOptions
     * 
     * Bing Maps tulajdonságai
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
     * Pushpin tulajdonságai
     */
    const pushpinOptions: Microsoft.Maps.IPushpinOptions = {
        title: 'Kijelölt helyszín',
        text: 'P',
        color: '#FF0000',
    }


    /**
     * checkPermissions
     * 
     * Ellenörzi a helyadatok használatának engedélyezését
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
     * Lekéri a helyadatokat a felhasználó készülékétől
     */
    const getCurrentPosition = async () => {
        const position = await Geolocation.getCurrentPosition();

        setPosition(position);
    }


    /**
     * createBingMap
     * 
     * Bing Maps inicializálása
     */
    const createBingMap = async () => {
        const center = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude
        );

        map = new Microsoft.Maps.Map(mapRef.current, {
            ...mapOptions,
            center: center,
        });

        Microsoft.Maps.Events.addHandler(map, "click", mapClickEvent);
    }


    /**
     * mapClickEvent
     * 
     * Térképen való kattintáskor lefutó funkció
     * 
     * @param e 
     */
    const mapClickEvent = (e: any) => {
        //Kattintás helyén lévő koordináták
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
     * Térképen kijelölt ponton lévő település/terület helyadatainak lekérése
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
     * Helyadatok lekérése közben fellépő hibát kezelő funkció
     * 
     * @param e 
     */
    const geoErrorHandler = (e: any) => {
        ons.notification.toast({
            message: "Hiba lépett fel a kijelölt hely adatainak lekérése közben.",
            buttonLabel: "OK",
            force: true,
            timeout: 3000
        });
    }



    /**
     * viewZoomIn
     * 
     * Térképnézet nagyításának növelése
     */
    const viewZoomIn = () => {
        const value = map.getZoom() + 1;

        map.setView({
            zoom: value
        })
    }


    /**
     * viewZoomOut
     * 
     * Térképnézet nagyításának csökkentése
     */
    const viewZoomOut = () => {
        const value = map.getZoom() - 1;

        map.setView({
            zoom: value
        })
    }


    /**
     * onLocateMe
     * 
     * Térképnézet pozíció helyreállítása
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
