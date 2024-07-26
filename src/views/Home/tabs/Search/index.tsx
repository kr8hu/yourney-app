//React
import {
    useContext,
} from 'react';

//Dialog
import { AppContext } from '../../../../context/App';
import { DialogContext } from '../../../../context/Dialog';

//Views
import Feed from '../../../Feed';

//Components
import Text from '../../../../components/Text';
import Toolbar from '../../../../components/Toolbar';
import SearchForm from '../../../../components/forms/Search';
import BackgroundLayout from '../../../../components/layouts/BackgroundLayout';

//Shared
import { dialogTypes } from '../../../../shared/const';

//Interfaces
import Post from '../../../../interfaces/Post';
import DialogState from '../../../../interfaces/DialogState';

//Assets
import backgroundImage from '../../../../assets/images/backgrounds/ai/search.jpeg';

//Styles
import styles from './Search.module.css';


/**
 * Props 
 * 
 */
interface Props {
    className?: any;
}


/**
 * Search 
 * 
 * @returns
 */
function Search(props: Props) {
    //Context
    const { appState } = useContext(AppContext);
    const { setDialogState } = useContext(DialogContext);


    /**
     * classNames
     * 
     */
    const classNames = `${styles.container} ${props.className}`;


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
     * @param {string} value 
     * @returns 
     */
    const onSuccess = (value: string) => {
        //Megadott szöveg alapján keresés a bejegyzések címében
        const filteredPostsByName = appState.content.filter((post: Post) => post.name.toLowerCase().includes(value.toLowerCase()));

        //Megadott szöveg alapján keresés a bejegyzések leírásában
        const filteredPostsByDesc = appState.content.filter((post: Post) => post.description.toLowerCase().includes(value.toLowerCase()));

        //Keresési találhatok összefűzése
        const set = new Set([
            ...filteredPostsByName,
            ...filteredPostsByDesc
        ]);

        appState.navigator.pushPage({
            component: Feed,
            props: {
                plans: Array.from(set)
            }
        });
    }


    return (
        <div className={classNames}>
            <BackgroundLayout backgroundImage={backgroundImage}>
                {/* Fejléc */}
                <Toolbar
                    text="title_page_home_search"
                    fixed={true} />

                <div className={styles.row}>
                    {/* Szöveg */}
                    <div className={styles.col}>
                        <Text
                            className={styles.text}
                            node="search_text" />

                        {/* Keresés */}
                        <SearchForm
                            onReject={onFailure}
                            onResolve={onSuccess} />
                    </div>
                </div>
            </BackgroundLayout>
        </div>
    )
}

export default Search;
