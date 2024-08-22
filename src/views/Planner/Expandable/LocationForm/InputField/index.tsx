//Components
import Container from '../../../../../components/Container';
import Text from '../../../../../components/Text';

//Interfaces
import Location from '../../../../../interfaces/Location';

//Styles
import styles from './InputField.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    type: string;
    rows?: number;
    name: keyof Location;
    textNode: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    defaultValue?: any;
    options?: any;
    onChange: (name: keyof Location, e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => void;
}


/**
 * InputField
 * 
 * @param param0 
 * @returns 
 */
function InputField(props: Props) {
    /**
     * renderInput
     * 
     * @returns 
     */
    const renderInput = () => {
        switch (props.type) {
            case "textarea": {
                return (
                    <textarea
                        name={props.name}
                        rows={props.rows}
                        placeholder={props.placeholder}
                        maxLength={props.maxLength}
                        defaultValue={props.defaultValue}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(props.name, e)} />

                )
            }
            case "select": {
                return (
                    <select>
                        {props.options?.map((option: any, idx: number) => {
                            return (
                                <>
                                    <option hidden selected>
                                        Kiválasztás
                                    </option>
                                    <option
                                        key={idx}
                                        value={option}>
                                        {option}
                                    </option>
                                </>
                            )
                        })}
                    </select>
                )
            }
            default: {
                return (
                    <input
                        name={props.name}
                        type={props.type}
                        placeholder={props.placeholder}
                        defaultValue={props.defaultValue}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => props.onChange(props.name, e)} />
                )
            }
        }
    }


    return (
        <Container>
            <Text
                className={styles.text}
                node={props.textNode} />
            {renderInput()}
        </Container>
    )
}

export default InputField;
