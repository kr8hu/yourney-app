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
 * Ez a komponens kezeli az oldalakat és az oldalak közötti navigációt.
 * 
 * @returns
 */
function Navigator() {
    //Context
    const { appState, setAppState } = useContext(AppContext);


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
            //navigator mentése az appState-be, hogy a nem Onsen UI által kezelt oldalakon is elérhető legyen a navigáció
            setAppState(actionTypes.app.SET_NAVIGATOR, navigator);
        }

        return React.createElement(route.component, props);
    }


    return (
        <React.Fragment>
            <Ons.Navigator
                animation={animationTypes.FADE}
                initialRoute={{
                    component: Initialize
                }}
                renderPage={renderPage} />

            {/* Dialog komponens elhelyezése */}
            <Dialog />

            {/* Modal komponens elhelyezése */}
            <Modal />

            {/* Amíg az alkalmazás elfoglalt állapotban van, megjeleníti a réteg komponenst */}
            {appState.busy && <Loading />}
        </React.Fragment>
    );
}

export default Navigator;