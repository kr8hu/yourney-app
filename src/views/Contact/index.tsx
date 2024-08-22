//React
import { useContext } from 'react';

//Context
import { UserContext } from '../../context/User';
import { DialogContext } from '../../context/Dialog';

//Onsen UI
import { Page } from 'react-onsenui';

//Components
import Text from '../../components/Text';
import Toolbar from '../../components/Toolbar';
import ContactForm from '../../components/forms/Contact';

//Shared
import { dialogTypes } from '../../shared/const';

//Services
import MailService from '../../services/MailService';

//Interfaces
import ToolbarButton from '../../interfaces/ToolbarButton';
import DialogState from '../../interfaces/DialogState';

//Styles
import styles from './Contact.module.css';
import Container from '../../components/Container';


/**
 * Interfaces
 * 
 */
interface Props {
    navigator: any;
}


/**
 * Contact
 * 
 * @returns 
 */
function Contact({ navigator }: Props) {
    //Context
    const { userState } = useContext(UserContext);
    const { setDialogState } = useContext(DialogContext);


    /**
     * toolbarButtons
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
    const onFormFailure = (err: any) => {
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
     * @param {string} message 
     * @returns 
     */
    const onFormSuccess = async (message: string) => {
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: "",
            closeable: true,
            onClose: () => null
        }

        const payload = {
            name: userState.userdata.name || userState.userdata.username,
            message,
        };

        const response = await MailService.contact(payload);
        dialogState.text = response.message;

        setDialogState(dialogState);
    }


    return (
        <Page>
            <Container stretch>
                {/* Toolbar */}
                <Toolbar
                    fixed
                    text="title_page_contact"
                    buttons={toolbarButtons} />

                {/* Tartalom */}
                <div className={styles.row}>
                    <div className={styles.col}>
                        <Text
                            className={styles.text}
                            node="contact_text" />
                        <ContactForm
                            onReject={onFormFailure}
                            onResolve={onFormSuccess} />
                    </div>
                </div>
            </Container>
        </Page>
    )
}

export default Contact;
