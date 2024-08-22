//React
import {
    useRef,
    useContext,
} from 'react';

//Context
import { DialogContext } from '../../context/Dialog';

//Components
import Text from '../Text';
import Alert from './Alert';
import Confirm from './Confirm';
import Prompt from './Prompt';
import Select from './Select';

//Shared
import {
    actionTypes,
    dialogTypes
} from '../../shared/const';

//Styles
import styles from './Dialog.module.css';


/**
 * Dialog
 * 
 * @returns 
 */
function Dialog() {
    //Context
    const { dialogState, setDialogState } = useContext(DialogContext);


    //Ref
    const layerRef: any = useRef();
    const dialogRef: any = useRef();


    /**
     * onSubmit
     * 
     * @param value 
     */
    const onSubmit = (value: any) => {
        if (dialogState.onSubmit) {
            dialogState.onSubmit(value);
        }

        setDialogState(actionTypes.dialog.SET_STATUS, false);
    }


    /**
     * onClose
     * 
     */
    const onClose = () => {
        if (dialogState.onClose) {
            dialogState.onClose();

            setDialogState(actionTypes.dialog.SET_STATUS, false);
        }
    }


    /**
     * closeDialog
     * 
     */
    const closeDialog = () => {
        if (dialogState.closeable) {
            setDialogState(actionTypes.dialog.SET_STATUS, false);
        }
    }


    /**
     * renderDialog
     * 
     */
    const renderDialog = () => {
        switch (dialogState.type) {
            /* Üzenet */
            case dialogTypes.ALERT: {
                return (
                    <Alert onClose={onClose} />
                )
            }
            /* Megerősítés */
            case dialogTypes.CONFIRM: {
                return (
                    <Confirm
                        onSubmit={onSubmit}
                        onClose={onClose} />
                )
            }
            /* Adatbekérés */
            case dialogTypes.PROMPT: {
                return (
                    <Prompt
                        onSubmit={onSubmit}
                        onClose={onClose} />
                )
            }
            /* Kiválasztás */
            case dialogTypes.SELECT: {
                return (
                    <Select
                        onSubmit={onSubmit}
                        onClose={onClose} />
                )
            }
            default: {
                return (
                    <Alert onClose={onClose} />
                )
            }
        }
    }


    //Ha nem aktív a dialog
    if (!dialogState.status) return null;


    return (
        <div className={styles.container}>
            {/* Háttér */}
            <div
                id="dialogLayer"
                className={styles.layer}
                ref={layerRef}
                onClick={closeDialog} />

            {/* Dialog */}
            <div
                className={styles.dialog}
                ref={dialogRef}
                onClick={(e: any) => e.stopPropagation()}>

                <div className={styles.row}>
                    {/* Címsor */}
                    <div className={styles.col}>
                        <span className={styles.title}>
                            <Text node="appname" />
                        </span>
                    </div>

                    {/* Szöveg */}
                    <div className={styles.col}>
                        <span className={styles.text}>
                            {dialogState.text}
                        </span>
                    </div>

                    {/* Típus */}
                    <div className={styles.col}>
                        {renderDialog()}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dialog;
