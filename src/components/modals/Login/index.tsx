//React
import { useContext, useState } from 'react';

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
    cacheType,
    dialogTypes
} from '../../../shared/const';
import { setUserStorage } from '../../../shared/utils';

//Interfaces
import User from '../../../interfaces/User';
import DialogState from '../../../interfaces/DialogState';

//Services
import UserService from '../../../services/UserService';

//Styles
import styles from './Login.module.css';
import CacheService from '../../../services/CacheService';


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
     * @param {Object} res 
     * @returns 
     */
    const onFormSuccess = async (payload: any) => {
        //Dialog tulajdonságai
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: "",
            closeable: true,
            onClose: () => null
        }

        //HTTP művelet végrehajtása és eredményének tárolása
        const response = await AuthService.login(payload);

        //Kapott válaszüzenet átadása a dialog tartalmaként
        dialogState.text = response.message;

        //Ha a válasz tartalmaz adatot
        if (response.payload) {
            //Átvesszük a felhasználói adatokat
            const user: User = response.payload;

            //Ha még nincs aktiválva a fiók
            if (!user.activated) {
                createActivationDialog(user._id);
                return;
            }

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
    const createActivationDialog = (id: any) => {
        //Dialog tulajdonságai
        const dialogState: DialogState = {
            type: dialogTypes.PROMPT,
            text: "Add meg az e-mail üzenetben kapott 6 számjegyű aktiválási kódot.",
            buttons: ["Bezárás", "Küldés"],
            value: "",
            maxLength: 6,
            closeable: false,
            onSubmit: (code: any) => sendActivationCode(id, code),
            onClose: () => null
        }

        //Dialog és Loading kezelése
        setDialogState(dialogState);
        setAppState(actionTypes.app.SET_BUSY, false);
    }


    /**
     * sendActivationCode
     * 
     * Felhasználói fiók aktiválásának küldése
     * 
     * @param id 
     * @param code 
     */
    const sendActivationCode = async (id: any, code: string) => {
        //Elküldésre kerülő adatok
        const payload = { id, code }

        //Dialog tulajdonságai
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            closeable: true,
            onClose: () => null
        }

        //HTTP művelet végrehajtása és eredményének tárolása
        const response = await AuthService.activate(payload);

        //Kapott válaszüzenet átadása a dialog tartalmaként.
        dialogState.text = response.message;

        //Ha a válasz tartalmaz adatot
        if (response.payload === true) {
            updateUser(id);
        }

        //Dialog tulajdonságainak módosítása
        setDialogState(dialogState);
    }


    /**
     * updateUser
     * 
     * Felhasználói fiók aktiválási státuszának frissítése
     * 
     * @param response 
     */
    const updateUser = async (id: any) => {
        //Query
        const query = { activated: true };

        //HTTP művelet végrehajtása és az eredmény tárolása
        const response = await UserService.update(id, query);

        //Ha a válasz tartalmaz adatot
        if (response.payload) {
            //Átvesszük az adatokat
            const updatedUser: User = response.payload;

            //Useradatok betöltése az alkalmazásba
            handleUserLogin(updatedUser);

            //Modal elrejtése
            setModalState(actionTypes.modal.SET_MODAL_STATUS, false);
        }
    }


    /**
     * getUserNotifications
     * 
     * Felhasználó értesítéseinek lekérése és betöltése a statebe
     * 
     * @returns 
     */
    const getUserNotifications = async (username: string) => {
        //Query
        const query = {
            addressee: username
        };

        //HTTP lekérdezés
        const response = await NotificationService.findByQuery(query);

        if (response.payload) {
            for (let notification of response.payload) {
                await CacheService.create(cacheType.NOTIFICATION, notification);
            }
            setAppState(actionTypes.app.SET_NOTIFICATIONS, response.payload);
        }
    }


    /**
     * handleUserLogin
     * 
     * Felhasználói adatok betöltésének kezelése.
     * 
     * @param user 
     */
    const handleUserLogin = (user: User) => {
        //Felhasználói adatok betöltése a statebe
        setUserState(actionTypes.user.SET_USERDATA, user);

        //Felhasználói adatok tárolása a localStorageban
        setUserStorage(user);

        //Felhasználó értesítéseinek lekérése és tárolása
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
                        onReject={onFormFailure}
                        onResolve={onFormSuccess}
                        onFocus={handleFocus} />
                </div>
            </div>
        </div>
    )
}

export default Login;
