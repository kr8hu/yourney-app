/// <reference path="../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

//React
import {
    useRef,
    useState,
    useEffect,
} from 'react';

//Capacitor
import { Geolocation } from '@capacitor/geolocation';

//Components
import Placeholder from './Placeholder';
import Controller from './Controller';

//Interfaces
import MapCoords from '../../interfaces/MapCoords';
import Location from '../../interfaces/Location';

//Styles
import styles from './Map.module.css';


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
    center?: MapCoords;
    locations?: any;
    onDistanceCalculated?: (distance: number) => void;
}


/**
 * Map
 * 
 * @param props 
 * @returns 
 */
function Map(props: Props) {
    //States
    const [permission, setPermission] = useState<boolean>(false);
    const [position, setPosition] = useState<any>(undefined);
    const [mypos, setMypos] = useState<any>(undefined);
    const [textNode, setTextNode] = useState<string>("placeholder_map_permission");
    const [pushpins, setPushpins] = useState<any>(undefined);


    //Ref
    const mapRef: any = useRef();


    //Effects
    useEffect(() => {
        checkPermissions();
        //eslint-disable-next-line
    }, []);


    useEffect(() => {
        if (props.center) {
            setPosition(props.center);
        }
    }, [props.center]);


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


    useEffect(() => {
        if (!pushpins) return;

        calculateDistance(pushpins);
        //eslint-disable-next-line
    }, [pushpins]);


    /**
     * Placeholder
     * 
     */
    const placeholder = (position === undefined && <Placeholder text={textNode} />);


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
        minZoom: props.minZoom,
        maxZoom: props.maxZoom,
        showMapTypeSelector: true,
        showLocateMeButton: true,
        showLogo: false,
        showTermsLink: false,
        zoom: props.zoom,
        showDashboard: false,
    }


    /**
     * checkPermissions
     * 
     * Helyadatok lekérésének engedélyének ellenörzése
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
     * Helyadatok lekérése
     */
    const getCurrentPosition = async () => {
        const result = await Geolocation.getCurrentPosition();

        setMypos(result);
        setPosition(result);
    }


    /**
     * createBingMap
     * 
     */
    const createBingMap = async () => {
        const center = new Microsoft.Maps.Location(
            props.center ? props.center.latitude : position.latitude,
            props.center ? props.center.longitude : position.longitude
        );

        map = new Microsoft.Maps.Map(mapRef.current, {
            ...mapOptions,
            center,
        });

        if (props.locations) {
            createPushpins();
        }
    }


    /**
     * createPushpins
     * 
     */
    const createPushpins = () => {
        if (props.locations && Array.isArray(props.locations)) {
            createMultipleLocation();
        } else {
            createSingleLocation();
        }

    }


    /**
     * createMultipleLocation
     * 
     */
    const createMultipleLocation = () => {
        let array: Array<any> = [];

        props.locations.forEach((location: Location, idx: number) => {
            const loc = new Microsoft.Maps.Location(
                location.coords.latitude,
                location.coords.longitude
            );

            const pin = new Microsoft.Maps.Pushpin(loc, {
                title: location.name,
                text: `${location.id + 1}`,
                color: `#ed143d`
            });

            array.push(pin);

            if (idx === (props.locations.length - 1)) {
                setPushpins(array);
            }
        });

        map.entities.push(array);
    }


    /**
     * createSingleLocation
     * 
     */
    const createSingleLocation = () => {
        const loc = new Microsoft.Maps.Location(
            props.locations.coords.latitude,
            props.locations.coords.longitude
        );

        const pin = new Microsoft.Maps.Pushpin(loc, {
            title: props.locations.name,
            text: `${props.locations.id + 1}`,
            color: `#ed143d`
        });

        map.entities.push(pin);
    }


    /**
     * calculateDistance
     * 
     */
    const calculateDistance = (pushpins: Array<any>) => {
        let distance: number = 0;

        Microsoft.Maps.loadModule('Microsoft.Maps.SpatialMath', () => {
            for (let i = 0; i < pushpins.length - 1; i++) {
                distance += Microsoft.Maps.SpatialMath.getDistanceTo(
                    pushpins[i].getLocation(),
                    pushpins[i + 1].getLocation(),
                    Microsoft.Maps.SpatialMath.DistanceUnits.Kilometers
                );
            };

            if (props.onDistanceCalculated) {
                props.onDistanceCalculated(distance ?? undefined);
            }
        });
    }


    /**
     * onZoomIn
     * 
     * Térképnézet nagyításának növelése
     */
    const onZoomIn = () => {
        const value = map.getZoom() + 1;

        map.setView({
            zoom: value
        })
    }


    /**
     * onZoomOut
     * 
     * Térképnézet nagyításának csökkentése
     */
    const onZoomOut = () => {
        const value = map.getZoom() - 1;

        map.setView({
            zoom: value
        })
    }


    /**
     * onLocatePlan
     * 
     * Térképnézet pozíció helyreállítása
    */
    const onLocatePlan = () => {
        const center = new Microsoft.Maps.Location(
            props.center ? props.center.latitude : position.latitude,
            props.center ? props.center.longitude : position.longitude
        );

        map.setView({ center });
    }


    /**
     * onLocateMe
     * 
     * Térképnézet pozíció helyreállítása
    */
    const onLocateMe = () => {
        const center = new Microsoft.Maps.Location(
            mypos.coords.latitude,
            mypos.coords.longitude
        );

        map.setView({ center });
    }


    return (
        <div className={styles.wrapper}>
            <Controller
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
                onLocateMe={onLocateMe}
                onLocatePlan={onLocatePlan} />
            <div
                ref={mapRef}
                className={styles.container}>
                {placeholder}
            </div>
        </div>
    )
}

export default Map;
