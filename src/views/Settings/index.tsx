//React
import { useContext } from 'react';

//Context
import { AppContext } from '../../context/App';
import { UserContext } from '../../context/User';
import { DialogContext } from '../../context/Dialog';

//Onsen UI
import {
    Page,
    List,
    ListHeader
} from 'react-onsenui';

//Components
import Setting from './Setting';
import Toolbar from '../../components/Toolbar';

//Views
import About from '../About';
import Contact from '../Contact';
import Password from '../Password';
import PostsManager from '../PostsManager';
import UsersManager from '../UsersManager';
import ProfileEditor from '../ProfileEditor';

//Shared
import {
    actionTypes,
    appversion,
    cacheType,
    dialogTypes
} from '../../shared/const';
import { clearUserStorage } from '../../shared/utils';

//Interfaces
import ToolbarButton from '../../interfaces/ToolbarButton';
import ISetting from '../../interfaces/Setting';
import DialogState from '../../interfaces/DialogState';

//Styles
import styles from './Settings.module.css';
import Container from '../../components/Container';
import CacheService from '../../services/CacheService';


/**
 * Props
 * 
 */
interface Props {
    navigator: any;
}


/**
 * Notifications
 * 
 * @returns 
 */
function Settings({ navigator }: Props) {
    //Context
    const { setAppState } = useContext(AppContext);
    const { setDialogState } = useContext(DialogContext);
    const { userState, setUserState } = useContext(UserContext);


    /**
     * Toolbar Buttons
     */
    const toolbarButtons: Array<ToolbarButton> = [
        {
            icon: "fa-times",
            onClick: () => navigator.popPage()
        }
    ];


    /**
     * appSettings
     * 
     */
    const appSettings = {
        title: "Névjegy",
        options: [
            {
                textNode: "settings_app_version",
                type: "expandable",
                value: appversion
            },
            {
                textNode: "settings_app_about",
                type: "link",
                component: About
            }
        ] as Array<ISetting>
    };


    /**
     * adminSettings
     * 
     */
    const adminSettings = {
        title: "Adminisztráció",
        options: [
            {
                textNode: "settings_admin_users_manage",
                type: "link",
                component: UsersManager
            },
        ] as Array<ISetting>
    };


    /**
     * profileSettings
     * 
     */
    const profileSettings = {
        title: "Felhasználó",
        options: [
            {
                textNode: "settings_profile_edit",
                type: "link",
                component: ProfileEditor
            },
            {
                textNode: "settings_profile_password",
                type: "link",
                component: Password
            },
            {
                textNode: "settings_profile_posts",
                type: "link",
                component: PostsManager
            },
            {
                textNode: "settings_app_contact",
                type: "link",
                component: Contact
            },
            {
                color: "maroon",
                textNode: "settings_logout",
                onClick: () => handleLogout()
            }
        ] as Array<ISetting>
    };


    /**
     * handleLogout
     */
    const handleLogout = () => {
        clearUserStorage();
        CacheService.clear(cacheType.NOTIFICATION);

        setAppState(actionTypes.app.SET_NOTIFICATIONS, null);
        setUserState(actionTypes.user.SET_USERDATA, null);


        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: "Kijelentkeztél a fiókból.",
            closeable: false,
            onClose: () => null
        }

        setDialogState(dialogState);
    }


    /**
     * renderHeader
     * 
     * @param title 
     * @returns 
     */
    const renderHeader = (title: string) => <ListHeader> {title} </ListHeader>


    /**
     * renderRow
     * 
     * @param row 
     * @param idx 
     * @returns 
     */
    const renderRow = (row: ISetting, idx: number) => <Setting key={idx} row={row} index={idx} />


    /**
     * renderAdminSettings
     * 
     * @returns 
     */
    const renderAdminSettings = () => {
        return (
            <List
                className={styles.list}
                dataSource={adminSettings.options}
                renderHeader={() => renderHeader(adminSettings.title)}
                renderRow={renderRow}>
            </List>
        )
    }


    /**
     * renderProfileSettings
     * 
     * @returns 
     */
    const renderProfileSettings = () => {
        if (!userState.userdata) return;

        return (
            <List
                className={styles.list}
                dataSource={profileSettings.options}
                renderHeader={() => renderHeader(profileSettings.title)}
                renderRow={renderRow}>
            </List>
        )
    }


    return (
        <Page>
            <Container>
                {/* Toolbar */}
                <Toolbar
                    fixed={true}
                    buttons={toolbarButtons}
                    text="title_page_settings" />

                {/* Tartalom */}
                <div className={styles.row}>
                    {/* Alkalmazás beállításai */}
                    <div className={styles.col}>
                        <List
                            className={styles.list}
                            dataSource={appSettings.options}
                            renderHeader={() => renderHeader(appSettings.title)}
                            renderRow={renderRow}>
                        </List>
                    </div>

                    {/* Admin jogosultsághoz kötött beállítások */}
                    {userState.userdata?.group === 1 && (
                        <div className={styles.col}>
                            {renderAdminSettings()}
                        </div>
                    )}

                    {/* Profil beállításai */}
                    <div className={styles.col}>
                        {renderProfileSettings()}
                    </div>
                </div>
            </Container>
        </Page>
    )
}

export default Settings;
