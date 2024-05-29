//React
import {
    useState,
    useEffect,
} from 'react';

//Components
import Expander from './Expander';
import LocationForm from './LocationForm';
import Container from '../../../components/Container';

//Interfaces
import Error from '../../../interfaces/Error';
import Location from '../../../interfaces/Location';

//Styles
//import styles from './Expandable.module.css';


/**
 * Props
 * 
 */
interface Props {
    onChange: (data: Array<Location>) => void;
    onError: (error: Error) => void;
}


/**
 * Expandable
 * 
 * Helyszínadatokat bekérő űrlapokat kezelő, ellenörző komponens.
 * 
 * @returns 
 */
function Expandable({ onChange, onError }: Props) {
    /**
     * initialErrorState
     * 
     */
    const initialErrorState: Error = { status: false, message: "" };


    //States
    const [locations, setLocations] = useState<Array<any>>([]);
    const [error, setError] = useState<Error>(initialErrorState);


    //Effects
    useEffect(() => {
        onChange(locations);
        //eslint-disable-next-line
    }, [locations]);


    useEffect(() => {
        onError(error);
        //eslint-disable-next-line
    }, [error]);


    useEffect(() => {
        if (locations.length === 0) return;

        //Felvett helyszín űrlapok kitöltésének ellenörzése
        for (let location of locations) {
            if (location.name.length === 0) {
                return setError({
                    status: true,
                    message: "Nem adtad meg a helyszín nevét."
                });
            }
            if (location.description.length === 0) {
                return setError({
                    status: true,
                    message: "Nem adtad meg a helyszín leírását."
                });
            }
            else {
                return setError({
                    status: false,
                    message: ""
                });
            }
        }
        //eslint-disable-next-line
    }, [locations]);


    /**
     * addLocationForm
     * 
     * Helyszín adatait bekérő űrlap hozzáadása
     */
    const addLocationForm = () => {
        setLocations((prev: Array<any>) => [
            ...prev,
            {
                id: locations.length,
                name: "",
                description: "",
                photos: null,
                coords: null,
                address: null
            }
        ]);
    }


    /**
     * removeLocationForm
     * 
     * Eltávolít egy már hozzáadott helyszínadatokat bekérő űrlapot.
     * 
     * @param id 
     */
    const removeLocationForm = (id: number) => {
        const result = locations.filter((_: any, idx: number) => idx !== id);
        setLocations(result);
    }


    /**
     * handleInputChange
     * 
     * Külső komponensekből érkező input mező adatokat frissíti a stateben.
     * 
     * @param index 
     * @param field 
     * @param value 
     */
    const handleInputChange = (index: number, field: string, value: any) => {
        const newlocations = [...locations];
        newlocations[index][field] = value;
        setLocations(newlocations);
    };


    /**
     * renderLocationForms
     * 
     * Helyszín adatokat bekérő űrlapok renderelése
     * 
     * @returns 
     */
    const renderLocationForms = () => {
        return locations.map((location: any, idx: number) => {
            return (
                <LocationForm
                    id={idx}
                    onChange={(id: number, name: string, value: any) => handleInputChange(id, name, value)}
                    onDelete={removeLocationForm} />
            )
        })
    }


    return (
        <Container>
            {/* Űrlapok */}
            {renderLocationForms()}

            {/* Űrlap hozzáadása gomb */}
            <Expander onClick={addLocationForm} />
        </Container>
    )
}

export default Expandable;
