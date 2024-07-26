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
 * Ez a komponens kezeli az oldalak közti navigációt
 * 
 * @returns
 */
function Navigator() {
    //Context
    const { appState, setAppState } = useContext(AppContext);


    /**
     * initialRoute
     * 
     * Első megjelenített oldal meghatározása
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
            //Navigator mentése az appState-be, ez lehetővé teszi a nem Onsen Navigatorban lévő komponensekből a navigációt.
            setAppState(actionTypes.app.SET_NAVIGATOR, navigator);
        }

        return React.createElement(route.component, props);
    }


    /**
     * LoadingComponent
     * 
     * Betöltést jelző komponens feltételes megjelenítése
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