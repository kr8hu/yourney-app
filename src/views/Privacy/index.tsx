//React
import { useContext } from 'react';

//Context
import { AppContext } from '../../context/App';
import { UserContext } from '../../context/User';
import { DialogContext } from '../../context/Dialog';

//Capacitor
import { HttpResponse } from '@capacitor/core';

//Onsen UI
import { Page } from 'react-onsenui';

//Views
import Home from '../Home';

//Components
import Text from '../../components/Text';
import Button from '../../components/Button';
import Toolbar from '../../components/Toolbar';
import Container from '../../components/Container';

//Shared
import {
    actionTypes,
    dialogTypes
} from '../../shared/const';
import { clearUserStorage } from '../../shared/utils';

//Servives
import UserService from '../../services/UserService';

//Interfaces
import ToolbarButton from '../../interfaces/ToolbarButton';
import DialogState from '../../interfaces/DialogState';

//Styles
import styles from './Privacy.module.css';


/**
 * Props
 * 
 */
interface Props {
    navigator: any;
}


/**
 * Information
 * 
 * @returns 
 */
function Privacy({ navigator }: Props) {
    //Context
    const { setAppState } = useContext(AppContext);
    const { setDialogState } = useContext(DialogContext);
    const { userState, setUserState } = useContext(UserContext);


    /**
     * Toolbar Buttons
     * 
     */
    const toolbarButtons: Array<ToolbarButton> = [
        {
            icon: "fa-times",
            onClick: () => navigator.popPage()
        }
    ];


    /**
     * onClick
     * 
     */
    const onClick = () => {
        const dialogState: DialogState = {
            type: dialogTypes.CONFIRM,
            text: "A fiókod törölve lesz. A művelet nem visszavonható.",
            closeable: false,
            buttons: ["Mégsem", "Törlés"],
            onSubmit: () => onSubmit(),
            onClose: () => null
        }

        setDialogState(dialogState);
    }


    /**
     * onSubmit
     * 
     */
    const onSubmit = async () => {
        setAppState(actionTypes.app.SET_BUSY, true);


        UserService.delete(userState.userdata._id)
            .then(onSuccess)
            .catch(onFailure)
    }


    /**
     * onSuccess
     * 
     */
    const onSuccess = (response: HttpResponse) => {
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: response.data.message,
            closeable: false,
            onClose: () => handleDelete()
        }

        setDialogState(dialogState);
        setAppState(actionTypes.app.SET_BUSY, false);
    }


    /**
     * onFailure
     * 
     */
    const onFailure = (error: any) => {
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: `${error}`,
            closeable: false,
            onClose: () => null
        }

        setDialogState(dialogState);
        setAppState(actionTypes.app.SET_BUSY, false);
    }


    /**
     * handleDelete
     * 
     */
    const handleDelete = () => {
        clearUserStorage();
        setUserState(actionTypes.user.SET_USERDATA, null);

        navigator.resetPage({ component: Home });
    }


    return (
        <Page>
            <Container responsive>
                {/* Toolbar */}
                <Toolbar
                    fixed
                    text="Információk"
                    buttons={toolbarButtons} />

                {/* Tartalom */}
                <div className={styles.row}>
                    <div className={styles.col}>
                        <Text
                            className={styles.title}
                            node="privacy_title" />
                    </div>
                    <div className={styles.col}>
                        <Text
                            className={styles.text}
                            node="privacy_text_data" />
                    </div>
                    <div className={styles.col}>
                        <Text
                            className={styles.text}
                            node="privacy_text_delete" />
                    </div>
                    <div className={styles.col}>
                        <Button
                            className={styles.button}
                            onClick={onClick}>
                            <Text node="privacy_button_delete" />
                        </Button>
                    </div>
                </div>
            </Container>
        </Page>
    )
}

export default Privacy;
