//Components
import Input from "./Input";


/**
 * Interfaces
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
function Form({ className, fields, onFocus }: Props) {
    /**
     * renderInputFields
     * 
     * @returns 
     */
    const renderInputFields = () => {
        return fields.map((field: any, idx: number) => {
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
                    onClick={() => field.onClick && field.onClick()} />
            )
        })
    }


    /**
     * onFocusHandler
     * 
     * @param e 
     * @returns 
     */
    const onFocusHandler = (e: React.FocusEvent<HTMLFormElement, Element>) => onFocus && onFocus(true);


    /**
     * onBlurHandler
     * 
     * @param e 
     * @returns 
     */
    const onBlurHandler = (e: React.FocusEvent<HTMLFormElement, Element>) => onFocus && onFocus(false);


    /**
     * onSubmitHandler
     * 
     * @param e 
     * @returns 
     */
    const onSubmitHandler = (e: React.FormEvent) => e.preventDefault();


    return (
        <form
            className={className}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            onSubmit={onSubmitHandler}>
            {renderInputFields()}
        </form>
    )
}

export default Form;
