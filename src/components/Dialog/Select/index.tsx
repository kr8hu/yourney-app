//React
import {
    useState,
    useContext
} from 'react';

//Context
import { DialogContext } from '../../../context/Dialog';

//Components
import Text from '../../Text';
import Button from '../../Button';

//Assets
import dropdown from '../../../assets/icons/dropdown.png';

//Styles 
import styles from './Select.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    onSubmit: any;
    onClose: any;
}


/**
 * Select
 * 
 * @param props 
 * @returns 
 */
function Select({ onSubmit, onClose }: Props) {
    //Context
    const { dialogState } = useContext(DialogContext);


    //State
    const [value, setValue] = useState<any>(undefined);



    /**
     * onSelect
     * 
     */
    const onSelect = (event: any) => {
        setValue(event.target.value);
    }


    /**
     * renderOptions
     * 
     * @returns 
     */
    const renderOptions = () => {
        return dialogState.options?.map((option: any, idx: number) => {
            return (
                <option
                    key={idx}
                    value={option.value}>
                    {option.text}
                </option>
            )
        })
    }


    return (
        <>
            <div className={styles.selection}>
                <img
                    src={dropdown}
                    alt="dropdown" />
                <select
                    className={styles.select}
                    defaultValue=""
                    defaultChecked={true}
                    onChange={onSelect}>
                    <option
                        selected={true}
                        hidden={true}
                        value="">
                        Válassz egy lehetőséget.
                    </option>
                    {renderOptions()}
                </select>
            </div>

            <div className={styles.wrapper}>
                <Button
                    className={styles.button}
                    onClick={() => onClose()}>
                    <Text>
                        {dialogState.buttons[0]}
                    </Text>
                </Button>

                <Button
                    className={styles.button}
                    onClick={() => onSubmit(value)}>
                    <Text>
                        {dialogState.buttons[1]}
                    </Text>
                </Button>
            </div>
        </>
    )
}

export default Select;
