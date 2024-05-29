//React
import { useContext } from 'react';

//Context
import { UserContext } from '../../context/User';
import { DialogContext } from '../../context/Dialog';

//Onsen UI
import { Page } from 'react-onsenui';

//Components
import Toolbar from '../../components/Toolbar';
import PasswordForm from '../../components/forms/Password';

//Shared
import { dialogTypes } from '../../shared/const';

//Services
import UserService from '../../services/UserService';

//Interfaces
import ToolbarButton from '../../interfaces/ToolbarButton';
import DialogState from '../../interfaces/DialogState';

//Styles
import styles from './Password.module.css';
import Container from '../../components/Container';


/**
 * Props
 * 
 */
interface Props {
    navigator: any;
}


/**
 * Password
 * 
 * @returns 
 */
function Password({ navigator }: Props) {
    //Context
    const { userState } = useContext(UserContext);
    const { setDialogState } = useContext(DialogContext);


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
     * onFailure
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
    }


    /**
     * onSuccess
     * 
     * Form sikeres kitöltése esetén lefutó funkció.
     * Űrlapban szereplő adatok küldés a szervernek és válaszüzenet megjelenítése
     * 
     * @param {string} values 
     * @returns 
     */
    const onSuccess = async (values: any) => {
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: "",
            closeable: true,
            onClose: () => null
        }

        try {
            const response = await UserService.changePassword(userState.userdata._id, values);
            dialogState.text = response.data.message;
        }
        catch (error) {
            dialogState.text = "Hiba történt a jelszó módosítása közben."
        }

        setDialogState(dialogState);
    }


    return (
        <Page>
            <Container
                fill
                responsive>
                {/* Toolbar */}
                <Toolbar
                    fixed
                    text="title_page_password"
                    buttons={toolbarButtons} />

                {/* Form */}
                <div className={styles.row}>
                    <div className={styles.col}>
                        <PasswordForm
                            onReject={onFailure}
                            onResolve={onSuccess} />
                    </div>
                </div>
            </Container>
        </Page>
    )
}

export default Password;
