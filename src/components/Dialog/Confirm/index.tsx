//React
import { useContext } from 'react';

//Context
import { DialogContext } from '../../../context/Dialog';

//Components
import Text from '../../Text';
import Button from '../../Button';

//Styles 
import styles from './Confirm.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    onSubmit: any;
    onClose: any;
}


/**
 * Confirm
 * 
 * @param props 
 * @returns 
 */
function Confirm({ onSubmit, onClose }: Props) {
    //Context
    const { dialogState } = useContext(DialogContext);


    return (
        <>
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
                    onClick={() => onSubmit()}>
                    <Text>
                        {dialogState.buttons[1]}
                    </Text>
                </Button>
            </div>
        </>
    )
}

export default Confirm;
