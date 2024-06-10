//React
import { useContext, useState } from 'react';

//Context
import { AppContext } from '../../../context/App';
import { ModalContext } from '../../../context/Modal';
import { DialogContext } from '../../../context/Dialog';

//Components
import Login from '../Login';
import Text from '../../Text';
import SignUp from '../../forms/SignUp';

//Services
import UserService from '../../../services/UserService';

//Shared
import {
    actionTypes,
    dialogTypes
} from '../../../shared/const';

//Interfaces
import DialogState from '../../../interfaces/DialogState';

//Styles
import styles from './Register.module.css';


/**
 * Register
 * 
 * @returns 
 */
function Register() {
    //Context
    const { appState, setAppState } = useContext(AppContext);
    const { setModalState } = useContext(ModalContext);
    const { setDialogState } = useContext(DialogContext);


    //State
    const [textStatus, setTextStatus] = useState<boolean>(true);


    /**
     * modalHeight
     * 
     */
    const modalHeight = window.innerWidth < 960 ? 70 : 85;


    /**
     * columnOpacity
     */
    const columnOpacity = (!textStatus && appState.device?.platform !== "web") ? 0 : 1;


    /**
     * onFormFailure
     * 
     * Űrlap kitöltésésben lévő hibaüzenet megjelenítése.
     * 
     * @param {String} err 
     * @returns 
     */
    const onFormFailure = (err: any) => {
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: err,
            closeable: true,
            onClose: () => null
        }

        setDialogState(dialogState);
        setAppState(actionTypes.app.SET_BUSY, false);
    }


    /**
     * onFormSuccess
     * 
     * Form sikeres kitöltése esetén lefutó funkció.
     * Űrlapban szereplő adatok küldés a szervernek és válaszüzenet megjelenítése
     * 
     * @param {Object} data 
     * @returns 
     */
    const onFormSuccess = async (payload: any) => {
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            closeable: true,
            onClose: () => changeModal()
        }

        const response = await UserService.create(payload);
        dialogState.text = response.message;

        if (!response.payload) {
            dialogState.onClose = () => null;
        }


        setDialogState(dialogState);
        setAppState(actionTypes.app.SET_BUSY, false);
    }


    /**
     * changeModal
     * 
     * Átváltás a bejelentkező felületre
     */
    const changeModal = () => {
        const modalState = {
            status: true,
            height: modalHeight,
            component: Login
        };

        setModalState(modalState);
    }


    /**
     * handleFocus
     * 
     * @param focus 
     */
    const handleFocus = (focus: boolean) => {
        setTextStatus(!focus);
    }


    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div
                    className={styles.col}
                    style={{ opacity: columnOpacity }}>
                    <Text className={styles.title} node="modal_signup_title" />
                    <div className={styles.textGroup}>
                        <Text
                            className={styles.text}
                            node="modal_signup_text" />
                        <Text
                            className={styles.link}
                            node="click_here"
                            onClick={changeModal} />
                    </div>
                </div>
                <div className={styles.col}>
                    <SignUp
                        onReject={onFormFailure}
                        onResolve={onFormSuccess}
                        onFocus={handleFocus} />
                </div>
            </div>
        </div>
    )
}

export default Register;
