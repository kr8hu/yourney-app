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
    const onFormFailure = (error: any) => {
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
    const onFormSuccess = async (values: any) => {
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: "",
            closeable: true,
            onClose: () => null
        }

        setAppState(actionTypes.app.SET_BUSY, true);

        const response = await PlanService.update(post._id, values);
        dialogState.text = response.message;

        if (response.payload) {
            updateCache();

            setDialogState(dialogState);
            setAppState(actionTypes.app.SET_BUSY, false);
        }
    }


    /**
     * updateCache
     * 
     * Cache tartalmának frissítése
     */
    const updateCache = async () => {
        const query = { approved: true }
        const response = await PlanService.findByQuery(query);

        if (response.payload) {
            setAppState(actionTypes.app.SET_CONTENT, response.payload);
        }
    }


    return (
        <Page>
            <Container>
                {/* Toolbar */}
                <Toolbar
                    fixed={true}
                    text="title_page_editor"
                    buttons={toolbarButtons} />

                {/* Tartalom */}
                <div className={styles.row}>
                    <div className={styles.col}>
                        <EditorForm
                            onReject={onFormFailure}
                            onResolve={onFormSuccess}
                            initialValues={post} />
                    </div>
                </div>
            </Container>
        </Page>
    )
}

export default Editor;
