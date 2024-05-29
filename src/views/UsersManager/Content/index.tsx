//React
import {
    useState,
    useEffect,
    useContext,
} from 'react';

//Capacitor
import { HttpResponse } from '@capacitor/core';

//Context
import { AppContext } from '../../../context/App';
import { DialogContext } from '../../../context/Dialog';

//Onsen UI
import {
    LazyList,
} from 'react-onsenui';

//Components
import ListItem from '../ListItem';
import Text from '../../../components/Text';

//Shared
import {
    actionTypes,
    dialogTypes,
} from '../../../shared/const';

//Components
import Container from '../../../components/Container';

//Services
import UserService from '../../../services/UserService';

//Interfaces
import User from '../../../interfaces/User';
import DialogState from '../../../interfaces/DialogState';

//Styles
import styles from './Content.module.css';


/**
 * Content
 * 
 * @returns 
 */
function Content() {
    //Context
    const { setAppState } = useContext(AppContext);
    const { setDialogState } = useContext(DialogContext);


    //States
    const [users, setUsers] = useState<Array<User>>([]);


    //Effects
    useEffect(() => {
        setAppState(actionTypes.app.SET_BUSY, true);

        getUsers();
        //eslint-disable-next-line
    }, []);


    /**
     * getUsers
     * 
     * Felhasználók lekérése
     * 
     */
    const getUsers = () => {
        UserService.findAll()
            .then(onSuccess)
            .catch(onFailure)
    }


    /**
     * onSuccess
     * 
     * Sikeres `UserService.findAll` request után lefutó funkció
     * 
     * @param response 
     */
    const onSuccess = (response: HttpResponse) => {
        setAppState(actionTypes.app.SET_BUSY, false);

        if (response.status === 200) {
            setUsers(response.data);
        }
    }


    /**
     * onFailure
     * 
     * Sikertelen `UserService.findAll` request után lefutó funkció
     * 
     * @param error 
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
     * deleteUserHandler
     * 
     */
    const deleteUserHandler = (user: User) => {
        const dialogState: DialogState = {
            type: dialogTypes.CONFIRM,
            text: `Biztosan törölni szeretnéd a(z) '${user.username}' nevű felhasználót?`,
            buttons: ["Mégsem", "Törlés"],
            closeable: true,
            onSubmit: () => deleteUser(user),
            onClose: () => null
        }

        setDialogState(dialogState);
    }


    /**
     * deleteUser
     * 
     * Felhasználó törlése request
     * 
     * @param post 
     */
    const deleteUser = async (user: User) => {
        UserService.delete(user._id)
            .then(onDeleteUserSuccess)
            .catch(onDeleteUserFailed)
    }


    /**
     * onDeleteUserSuccess
     * 
     * Sikeres `UserService.delete` request után lefutó funkció
     * 
     * @param post 
     */
    const onDeleteUserSuccess = (response: HttpResponse) => {
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: response.data.message,
            closeable: true,
            onClose: () => null
        }

        setDialogState(dialogState);
    }


    /**
     * onDeleteUserFailed
     * 
     * Sikertelen `UserService.delete` request után lefutó funkció
     * 
     * @param post 
     */
    const onDeleteUserFailed = (error: any) => {
        const dialogState: DialogState = {
            type: dialogTypes.ALERT,
            text: `${error}`,
            closeable: true,
            onClose: () => null
        }

        setDialogState(dialogState);
    }


    /**
     * renderList
     * 
     * @returns 
     */
    const renderList = () => {
        return (
            <div className={styles.col}>
                <LazyList
                    className={styles.list}
                    length={users.length}
                    renderRow={renderRow}
                    calculateItemHeight={() => 44}>
                </LazyList>
            </div>
        )
    }


    /**
     * renderRow
     * 
     * @param index 
     * @returns 
     */
    const renderRow = (index: number) => {
        return (
            <ListItem
                key={index}
                user={users[index]}
                onDelete={deleteUserHandler} />
        )
    }


    /**
     * renderPlaceholder
     * 
     * @returns 
     */
    const renderPlaceholder = () => {
        return (
            <div className={styles.col}>
                <Text node="placeholder_postsmanager" />
            </div>
        )
    }


    return (
        <Container>
            <div className={styles.row}>
                {users.length === 0 ?
                    renderPlaceholder()
                    :
                    renderList()
                }
            </div>
        </Container>
    )
}

export default Content;