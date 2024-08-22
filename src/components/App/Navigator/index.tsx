//React
import React, {
    useContext
} from 'react';

//Onsen UI
import * as Ons from 'react-onsenui';

//Context
import { AppContext } from '../../../context/App';

//Views
import Dialog from '../../Dialog';
import Initialize from '../../../views/Initialize';

//Components
import Loading from '../../Loading';
import Modal from '../../Modal';

//Shared
import {
    actionTypes,
    animationTypes
} from '../../../shared/const';


/**
 * Navigator 
 * 
 * @returns
 */
function Navigator() {
    //Context
    const { appState, setAppState } = useContext(AppContext);


    /**
     * initialRoute
     * 
     */
    const initialRoute = { component: Initialize };


    /**
     * renderPage
     * 
     * @see https://onsen.io/v2/api/react/Navigator.html
     * @param {*} route 
     * @param {*} navigator 
     * @returns 
     */
    const renderPage = (route: any, navigator: any) => {
        const props = route.props || {};
        props.navigator = navigator;

        if (appState.navigator === undefined) {
            /**
             * Navigator mentése az appState-be, ez lehetővé teszi a navigációt
             * az olyan komponensekből is, amiket nem az Onsen UI navigator kezel 
             * (pl.: olyan komponensek, ahol nincs használatban a <Page> elem)
             */
            setAppState(actionTypes.app.SET_NAVIGATOR, navigator);
        }

        return React.createElement(route.component, props);
    }


    /**
     * LoadingComponent
     * 
     */
    const LoadingComponent = () => appState.busy ? <Loading /> : null;


    return (
        <React.Fragment>
            <Ons.Navigator
                animation={animationTypes.FADE}
                initialRoute={initialRoute}
                renderPage={renderPage} />

            <Dialog />
            <Modal />
            <LoadingComponent />
        </React.Fragment>
    );
}

export default Navigator;