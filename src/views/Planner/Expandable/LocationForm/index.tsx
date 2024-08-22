//React
import { useContext } from 'react';

//Context
import { DialogContext } from '../../../../context/Dialog';

//Onsen UI
import { Icon } from 'react-onsenui';

//Components
import InputField from './InputField';
import Text from '../../../../components/Text';
import Container from '../../../../components/Container';
import CoordPicker from '../../../../components/CoordPicker';
import PhotoPicker from '../../../../components/PhotoPicker';

//Shared
import { dialogTypes } from '../../../../shared/const';

//Interfaces
import Location from '../../../../interfaces/Location';
import CoordPickerResult from '../../../../interfaces/CoordPickerResult';
import DialogState from '../../../../interfaces/DialogState';

//Styles
import styles from './LocationForm.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    id: number;
    onChange: (id: number, name: keyof Location, value: any) => void;
    onDelete: (id: number) => void;
}


/**
 * LocationForm
 * 
 * @param props 
 * @returns 
 */
function LocationForm({ id, onChange, onDelete }: Props) {
    //Context
    const { setDialogState } = useContext(DialogContext);


    /**
     * formTitle
     * 
     */
    const formTitle = `${id + 1}. helyszín`;


    /**
     * inputFields
     * 
     */
    const inputFields = [
        {
            type: "text",
            name: "name",
            textNode: "planner_location_name",
            placeholder: "Helyszín neve"
        },
        {
            type: "textarea",
            name: "description",
            textNode: "planner_location_description",
            placeholder: "Helyszín leírása",
            rows: 3,
            maxLength: 300
        }
    ];


    /**
     * removeFormHandler
     * 
     */
    const removeFormHandler = () => {
        const dialogState: DialogState = {
            type: dialogTypes.CONFIRM,
            text: `Biztosan törölni szeretnéd a(z) ${id + 1}. helyszínt?`,
            closeable: false,
            buttons: ["Mégsem", "Törlés"],
            onSubmit: () => onDelete(id),
            onClose: () => null
        }

        setDialogState(dialogState);
    }


    /**
     * onHTMLInputChange
     * 
     * @param name 
     * @param e 
     */
    const onHTMLInputChange = (name: keyof Location, e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
        onChange(id, name, e.currentTarget.value);
    }


    /**
     * onCoordPickerChange
     * 
     * @param data 
     */
    const onCoordPickerChange = (data: CoordPickerResult) => {
        onChange(id, 'coords', data.coords);
        onChange(id, 'address', data.address);
    }


    /**
     * renderTitle
     * 
     * @returns 
     */
    const renderFormTitle = () => <Text className={styles.title}>{formTitle}</Text>


    /**
     * renderDeleteButton
     * 
     * @returns 
     */
    const renderDeleteButton = () => {
        return (
            <div
                className={styles.deleteButton}
                onClick={removeFormHandler}>
                <Icon
                    icon={{
                        default: "fa-trash"
                    }}
                    fixedWidth />
            </div>
        )
    }


    /**
     * renderInputFields
     * 
     * @returns 
     */
    const renderInputFields = () => {
        return inputFields.map((inputField: any, idx: number) => {
            return (
                <InputField
                    key={idx}
                    type={inputField.type}
                    rows={inputField.rows}
                    name={inputField.name}
                    textNode={inputField.textNode}
                    placeholder={inputField.placeholder}
                    defaultValue={inputField.defaultValue}
                    onChange={onHTMLInputChange} />
            )
        });
    }


    return (
        <Container className={styles.container}>
            {/* Címsor */}
            {renderFormTitle()}


            {/* Törlés gomb */}
            {renderDeleteButton()}


            {/* Általános input mezők */}
            {renderInputFields()}


            {/* Egyedi "input" mezők */}
            {/* Fotóválasztó */}
            <Text
                className={styles.text}
                node="planner_location_photo" />
            <PhotoPicker
                className={styles.photoPicker}
                onChange={(res: Array<any>) => onChange(id, 'photos', res)} />


            {/* Koordináta kijelölő */}
            <Text
                className={styles.text}
                node="planner_location_coords" />
            <div className={styles.coordpicker}>
                <CoordPicker
                    maxZoom={16}
                    minZoom={8}
                    zoom={15}
                    onClick={(result: CoordPickerResult) => onCoordPickerChange(result)} />
            </div>
        </Container>
    )
}

export default LocationForm;
