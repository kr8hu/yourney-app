//Interfaces
import LocationAddress from "./LocationAddress";
import LocationCoords from "./LocationCoords";


export default interface Location {
    id: number;
    name: string;
    description: string;
    coords: LocationCoords;
    address: LocationAddress;
    photos: Array<string> | string;
    date: string;
}