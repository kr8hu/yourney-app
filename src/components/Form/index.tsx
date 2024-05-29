//Components
import Input from "./Input";


/**
 * Props
 * 
 */
interface Props {
    className?: any;
    fields: any;
    onFocus?: (value: boolean) => void;
}


/**
 * Form
 * 
 * @returns 
 */
function Form(props: Props) {
    /**
     * renderInputFields
     * 
     * @returns 
     */
    const renderInputFields = () => {
        return props.fields.map((field: any, idx: number) => {
            return (
                <Input
                    key={idx}
                    name={field.name}
                    type={field.type}
                    value={field.value}
                    disabled={field.disabled}
                    modifier={field.modifier}
                    placeholder={field.placeholder}
                    onChange={field.onChange}
                    onClick={() => field.onClick ? field.onClick() : null} />
            )
        })
    }

    return (
        <form
            className={props.className}
            onFocus={(e: React.FocusEvent<HTMLFormElement, Element>) => props.onFocus ? props.onFocus(true) : null}
            onBlur={(e: React.FocusEvent<HTMLFormElement, Element>) => props.onFocus ? props.onFocus(false) : null}
            onSubmit={e => e.preventDefault()}>
            {renderInputFields()}
        </form>
    )
}

export default Form;
