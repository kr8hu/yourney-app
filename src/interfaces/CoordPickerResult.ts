//Interfaces
import LocationAddress from "./LocationAddress";
import LocationCoords from "./LocationCoords";

export default interface CoordPickerResult {
    coords: LocationCoords;
    address: LocationAddress;
}