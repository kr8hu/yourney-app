//State
import {
    useState,
    useContext
} from 'react';

//Context
import { AppContext } from '../../context/App';
import { UserContext } from '../../context/User';
import { DialogContext } from '../../context/Dialog';

//Capacitor
import { HttpResponse } from '@capacitor/core';

//Onsen UI
import {
    Fab,
    Icon,
    Page
} from 'react-onsenui';

//Views
import Privacy from '../Privacy';

//Components
import Text from '../../components/Text';
import Button from '../../components/Button';
import Toolbar from '../../components/Toolbar';
import Section from '../../components/Section';
import Container from '../../components/Container';
import PhotoPicker from '../../components/PhotoPicker';

//Services
import UserService from '../../services/UserService';

//Shared
import {
    actionTypes,
    dialogTypes
} from '../../shared/const';
import { setUserStorage } from '../../shared/utils';

//Interfaces
import ToolbarButton from '../../interfaces/ToolbarButton';
import DialogState from '../../interfaces/DialogState';

//Styles
import styles from './ProfileEditor.module.css';
import defaultStyles from '../../components/Form/styles/Default.module.css';



/**
 * Props
 * 
 */
interface Props {
    navigator: any;
}


/**
 * ProfileEditor
 * 
 * @returns 
 */
function ProfileEditor(props: Props) {
    //Context
    const { setAppState } = useContext(AppContext);
    const { setDialogState } = useContext(DialogContext);
    const { userState, setUserState } = useContext(UserContext);


    //State
    const [photo, setPhoto] = useState<any>(undefined);


    /**
     * Toolbar Buttons
     * 
     */
    const toolbarButtons: Array<ToolbarButton> = [
        {
            icon: "fa-times",
            onClick: () => props.navigator.popPage()
        }
    ];


    /**
     * renderFixed
     * 
     */
    const renderFixed = () => {
        return (
            <Fab
                className={styles.fab}
                position="bottom right"
                onClick={() => props.navigator.pushPage({ component: Privacy })}>
                <Icon
                    icon={{
                        default: "fa-info"
                    }}
                    fixedWidth />
            </Fab>
        )
    }


    /**
     * onSubmit
     * 
     */
    const onSubmit = () => {
        const payload = {
            picture: photo[0]
        };

        setAppState(actionTypes.app.SET_BUSY, true);

        UserService.update(userState.userdata._id, payload)
            .then(onSuccess)
            .catch(onFailure);
    }


    /**
     * onFailure
     * 
     */
    const onFailure = (error: any) => {
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: error.message ?? "Hiba történt a művelet végrehajtása közben.",
            closeable: true,
            onClose: () => null
        }

        setDialogState(dialogState);
        setAppState(actionTypes.app.SET_BUSY, false);
    }


    /**
     * onSuccess
     * 
     */
    const onSuccess = (response: HttpResponse) => {
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: response.data.message,
            closeable: true,
            onClose: () => null
        }

        if (response.status === 200) {
            setUserState(actionTypes.user.SET_USERDATA, response.data.userdata);
            setUserStorage(response.data.userdata);
        }

        setDialogState(dialogState);
        setAppState(actionTypes.app.SET_BUSY, false);
    }


    return (
        <Page renderFixed={renderFixed}>
            <Container responsive>
                {/* Toolbar */}
                <Toolbar
                    fixed={true}
                    text="title_page_profile_editor"
                    buttons={toolbarButtons} />

                <form className={defaultStyles.container}>
                    <Section title="Profilkép">
                        <div className={styles.content}>
                            {/* Fotó */}
                            <div className={styles.field}>
                                <Text
                                    className={styles.text}
                                    node="profile_editor_photo_text" />
                                <PhotoPicker
                                    className={styles.photoPicker}
                                    onChange={(res: any) => setPhoto(res)} />
                            </div>
                        </div>
                    </Section>

                    {/* Feltöltés */}
                    <div className={styles.field}>
                        <Button
                            className={styles.button}
                            onClick={onSubmit}>
                            <Text node="upload" />
                        </Button>
                    </div>
                </form>
            </Container>
        </Page>
    )
}

export default ProfileEditor;
