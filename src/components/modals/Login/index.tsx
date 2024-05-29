//React
import { useContext, useState } from 'react';

//Capacitor
import { HttpResponse } from '@capacitor/core';

//Context
import { AppContext } from '../../../context/App';
import { UserContext } from '../../../context/User';
import { ModalContext } from '../../../context/Modal';
import { DialogContext } from '../../../context/Dialog';

//Components
import Text from '../../Text';
import Register from '../Register';
import SignIn from '../../forms/SignIn';

//Services
import AuthService from '../../../services/AuthService';
import NotificationService from '../../../services/NotificationService';

//Shared
import {
    actionTypes,
    dialogTypes
} from '../../../shared/const';
import { setUserStorage } from '../../../shared/utils';

//Interfaces
import User from '../../../interfaces/User';
import DialogState from '../../../interfaces/DialogState';
import CustomResponse from '../../../interfaces/CustomResponse';

//Styles
import styles from './Login.module.css';
import UserService from '../../../services/UserService';


/**
 * Login
 * 
 * @returns 
 */
function Login() {
    //Context
    const { appState, setAppState } = useContext(AppContext);
    const { setUserState } = useContext(UserContext);
    const { setModalState } = useContext(ModalContext);
    const { setDialogState } = useContext(DialogContext);


    //State
    const [textStatus, setTextStatus] = useState<boolean>(true);


    /**
     * modalHeight
     */
    const modalHeight = window.innerWidth < 960 ? 75 : 95;


    /**
     * columnOpacity
     */
    const columnOpacity = (!textStatus && appState.device?.platform !== "web") ? 0 : 1;


    /**
     * changeModal
     * 
     * Átváltás a regisztrációs felületre
     */
    const changeModal = () => {
        const modalState = {
            status: true,
            height: modalHeight,
            component: Register
        };

        setModalState(modalState);
    }


    /**
     * onFailure
     * 
     * Űrlap kitöltésésben lévő hibaüzenet megjelenítése.
     * 
     * @param {String} err 
     * @returns 
     */
    const onFailure = (err: any) => {
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
     * onSuccess
     * 
     * Form sikeres kitöltése esetén lefutó funkció.
     * Űrlapban szereplő adatok küldés a szervernek és válaszüzenet megjelenítése
     * 
     * @param {Object} res 
     * @returns 
     */
    const onSuccess = async (payload: any) => {
        //Dialog tulajdonságai
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: "",
            closeable: true,
            onClose: () => null
        }

        //HTTP művelet végrehajtása és eredményének tárolása
        const response = await AuthService.login(payload);

        //Kapott válaszüzenet átadása a dialog szövegébe
        dialogState.text = response.data.message;

        //Ha a válasz tartalmaz
        if (response.data.payload) {
            //Átvesszük a felhasználói adatokat
            const user: User = response.data.payload;

            //Ha még nincs aktiválva a fiók
            if (!user.activated) return createActivationDialog(user);

            //Felhasználói adatok betöltése
            handleUserLogin(user);
            setModalState(actionTypes.modal.SET_MODAL_STATUS, false);
        }

        //Dialog és Loading kezelése
        setDialogState(dialogState);
        setAppState(actionTypes.app.SET_BUSY, false);
    }


    /**
     * createActivationDialog
     * 
     * Dialógus megjelenítése az aktiváló kód megadásához.
     * 
     * @param user 
     */
    const createActivationDialog = (user: User) => {
        //Dialog tulajdonságai
        const dialogState: DialogState = {
            type: dialogTypes.PROMPT,
            text: "Add meg az e-mail üzenetben kapott 6 számjegyű aktiválási kódot.",
            buttons: ["Bezárás", "Küldés"],
            value: "",
            maxLength: 6,
            closeable: false,
            onSubmit: (value: any) => activateAccount(user, value),
            onClose: () => null
        }

        //Dialog és Loading kezelése
        setDialogState(dialogState);
        setAppState(actionTypes.app.SET_BUSY, false);
    }


    /**
     * activateAccount
     * 
     * Felhasználói fiók aktiválása
     * 
     * @param id 
     * @param code 
     */
    const activateAccount = (user: User, code: string) => {
        const payload = {
            id: user._id,
            code
        }

        AuthService.activate(payload)
            .then((response: HttpResponse) => onActivationSuccess(response, user))
            .catch(onActivationFailed);
    }


    /**
     * onActivationSuccess
     * 
     * Sikeres `AuthService.activate` request után lefutó funkció
     * 
     * @param response 
     */
    const onActivationSuccess = async (response: HttpResponse, user: User) => {
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: response.data.message,
            closeable: true,
            onClose: () => null
        }

        if (response.status === 200) {
            //Felhasználó aktiválási státuszának frissítése
            const updateResponse = await UserService.update(user._id, { activated: true });

            if (updateResponse) {
                handleUserLogin(user);
                setModalState(actionTypes.modal.SET_MODAL_STATUS, false);
            }
        }
        else {
            setDialogState(dialogState);
        }
    }


    /**
     * onActivationFailed
     * 
     * Sikertelen `AuthService.activate` request után lefutó funkció
     * 
     * @param response 
     */
    const onActivationFailed = (error: any) => {
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: `${error}`,
            closeable: true,
            onClose: () => null
        }

        setDialogState(dialogState);
    }


    /**
     * getUserNotifications
     * 
     * Felhasználó értesítéseinek lekérése és betöltése a statebe
     * 
     * @returns 
     */
    const getUserNotifications = async (username: string) => {
        const response = await NotificationService.findByAddressee(username);

        if (response?.data) {
            localStorage.setItem("Yourney_notifications", JSON.stringify(response.data));
            setAppState(actionTypes.app.SET_NOTIFICATIONS, response.data);
        }
    }


    /**
     * handleUserActions
     * 
     * Felhasználói adatok betöltésének kezelése.
     * 
     * @param user 
     */
    const handleUserLogin = (user: User) => {
        setUserState(actionTypes.user.SET_USERDATA, user);
        setUserStorage(user);
        getUserNotifications(user.username);
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
                    <Text className={styles.title} node="modal_signin_title" />

                    <div className={styles.textGroup}>
                        <Text
                            className={styles.text}
                            node="modal_signin_text" />

                        <Text
                            className={styles.link}
                            node="click_here"
                            onClick={changeModal} />
                    </div>
                </div>
                <div className={styles.col}>
                    <SignIn
                        onReject={onFailure}
                        onResolve={onSuccess}
                        onFocus={handleFocus} />
                </div>
            </div>
        </div>
    )
}

export default Login;
