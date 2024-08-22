//React
import {
    useEffect,
    useContext
} from 'react';

//Capacitor
import { App } from '@capacitor/app';

//Onsen UI
import {
    Page
} from 'react-onsenui';

//Context
import { DialogContext } from '../../context/Dialog';

//Views
import Prepare from '../Prepare';

//Components
import Tabs from '../../components/Tabs';

//Shared
import tabs from './tabs';
import { dialogTypes } from '../../shared/const';

//Interfaces
import TabButton from '../../interfaces/TabButton';
import DialogState from '../../interfaces/DialogState';

//Styles
//import styles from './Home.module.css';


/**
 * Interfaces
 * 
 */
interface Props {
    navigator: any;
}


/**
 * Home 
 * 
 * @returns
 */
function Home({ navigator }: Props) {
    //Context
    const { setDialogState } = useContext(DialogContext);


    /**
     * centerTabButton
     * 
     */
    const centerTabButton: TabButton = {
        icon: "fa-plus",
        onClick: () => navigator.pushPage({ component: Prepare })
    }


    //Effects
    useEffect(() => {
        //Onsen UI resetpage bugfix
        const elem = document.querySelector("ons-navigator > ons-page") as HTMLElement;
        elem.style.display = "block";

        //Android back button handler
        App.addListener('backButton', () => {
            if (navigator.pages.length === 2) {
                handleExit();
            } else {
                navigator.popPage();
            }
        });


        return () => {
            App.removeAllListeners()
        };

        //eslint-disable-next-line
    }, []);


    /**
     * handleExit
     * 
     */
    const handleExit = () => {
        const dialogState: DialogState = {
            type: dialogTypes.CONFIRM,
            text: "Biztosan kilépsz az alkalmazásból?",
            closeable: false,
            buttons: ["Mégsem", "Kilépés"],
            onSubmit: onSubmitExit,
            onClose: () => null
        }

        setDialogState(dialogState);
    }


    /**
     * onSubmitExit
     * 
     */
    const onSubmitExit = () => {
        return App.exitApp();
    }


    return (
        <Page>
            <Tabs
                left={tabs.left}
                center={centerTabButton}
                right={tabs.right} />
        </Page>
    )
}

export default Home;
