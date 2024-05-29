//Components
import Text from "../../Text";


/**
 * Props
 * 
 */
interface Props {
    name: string;
    type: any;
    value: any;
    disabled: any;
    modifier: any;
    placeholder: any;
    onClick?: () => void;
    onChange: () => void;
}


/**
 * Input
 * 
 * @param props 
 * @returns 
 */
function Input(props: Props) {
    switch (props.type) {
        case "button": {
            return (
                <button onClick={props.onClick}>
                    <Text>
                        {props.placeholder}
                    </Text>
                </button>
            )
        }
        case "textarea": {
            return (
                <textarea
                    rows={5}
                    name={props.name}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    disabled={props.disabled ? true : false}
                    value={props.value ?? ''} />
            )
        }
        default: {
            return (
                <input
                    formNoValidate
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    value={props.value ?? ''}
                    disabled={props.disabled ? true : false}
                    onChange={props.onChange} />
            )
        }
    }
}

export default Input;
