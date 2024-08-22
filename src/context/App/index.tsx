//React
import {
    createContext,
    useReducer,
} from 'react';

//Reducer
import {
    reducer,
    initialState
} from './reducer';

//Capacitor
import { DeviceInfo } from '@capacitor/device';


/**
 * Interfaces 
 * 
 */
interface Props {
    children: any;
}


/**
 * IAppState 
 * 
 */
interface IAppState {
    navigator: any;
    busy: boolean;
    device: DeviceInfo | undefined;
    content: Array<any>;
    notifications: Array<any>;
    network: boolean;
}


/**
 * IAppContext 
 * 
 */
interface IAppContext {
    appState: IAppState;
    setAppState: (type: any, payload: any) => void;
}


/**
 * AppContext 
 * 
 */
export const AppContext = createContext<IAppContext>({
    appState: initialState,
    setAppState: () => null
});


/**
 * AppProvider 
 * 
 */
export const AppProvider = (props: Props) => {
    const [appState, dispatch] = useReducer(reducer, initialState);
    const setAppState = (type: any, payload: any) => dispatch({ type, payload });


    return (
        <AppContext.Provider value={{
            appState,
            setAppState
        }}>
            {props.children}
        </AppContext.Provider>
    )
}