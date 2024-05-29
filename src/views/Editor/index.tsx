//React
import {
    useContext,
} from 'react';

//Context
import { AppContext } from '../../context/App';
import { DialogContext } from '../../context/Dialog';

//Onsen UI
import { Page } from 'react-onsenui';

//Views
import PostsManager from '../PostsManager';

//Components
import Toolbar from '../../components/Toolbar';
import Container from '../../components/Container';
import EditorForm from '../../components/forms/Editor';

//Services
import PlanService from '../../services/PlanService';

//Shared
import {
    actionTypes,
    dialogTypes
} from '../../shared/const';

//Interfaces
import Post from '../../interfaces/Post';
import ToolbarButton from '../../interfaces/ToolbarButton';
import DialogState from '../../interfaces/DialogState';

//Styles
import styles from './Editor.module.css';


/**
 * Props
 * 
 */
interface Props {
    navigator: any;
    post: Post;
}


/**
 * Editor
 * 
 * @returns 
 */
function Editor({ navigator, post }: Props) {
    //Context
    const { setAppState } = useContext(AppContext);
    const { setDialogState } = useContext(DialogContext);


    /**
     * toolbarButtons
     * 
     */
    const toolbarButtons: Array<ToolbarButton> = [
        {
            icon: "fa-times",
            onClick: () => navigator.replacePage({ component: PostsManager })
        }
    ];


    /**
     * onFailure
     * 
     */
    const onFailure = (error: any) => {
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: `${error}`,
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
    const onSuccess = async (values: any) => {
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: "",
            closeable: true,
            onClose: () => null
        }

        try {
            setAppState(actionTypes.app.SET_BUSY, true);

            const response = await PlanService.update(post._id, values);
            dialogState.text = response.data.message;

            if (response.status === 200) {
                updateCache();
            }
        }
        catch (error) {
            dialogState.text = "Hiba történt a módosítások feltöltése közben.";
        }

        setDialogState(dialogState);
        setAppState(actionTypes.app.SET_BUSY, false);
    }


    /**
     * updateCache
     * 
     * Cache tartalmának frissítése
     */
    const updateCache = async () => {
        const response = await PlanService.findApproved();

        if (response.status === 200) {
            setAppState(actionTypes.app.SET_CACHE, response.data);
        }
    }


    return (
        <Page>
            <Container responsive>
                {/* Toolbar */}
                <Toolbar
                    fixed={true}
                    text="title_page_editor"
                    buttons={toolbarButtons} />

                {/* Tartalom */}
                <div className={styles.row}>
                    <div className={styles.col}>
                        <EditorForm
                            onReject={onFailure}
                            onResolve={onSuccess}
                            initialValues={post} />
                    </div>
                </div>
            </Container>
        </Page>
    )
}

export default Editor;
