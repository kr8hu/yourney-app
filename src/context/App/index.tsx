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
 * Props 
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
    cache: Array<any>;
    notifications: Array<any>;
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