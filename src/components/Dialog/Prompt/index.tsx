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

//Styles 
import styles from './Prompt.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    onSubmit: any;
    onClose: any;
}



/**
 * Prompt
 * 
 * @param props 
 * @returns 
 */
function Prompt({ onSubmit, onClose }: Props) {
    //Context
    const { dialogState } = useContext(DialogContext);


    //States
    const [value, setValue] = useState<any>(undefined);


    return (
        <>
            <input
                type="text"
                className={styles.input}
                max={dialogState.maxLength}
                maxLength={dialogState.maxLength}
                onChange={e => setValue(e.target.value)} />

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

export default Prompt;
