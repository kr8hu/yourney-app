//React
import {
    createContext,
    useReducer
} from 'react';

//Reducer
import {
    reducer,
    initialState
} from './reducer';


/**
 * Interfaces 
 * 
 */
interface Props {
    children: any;
}


/**
 * IModalState 
 * 
 */
interface IModalState {
    status: boolean;
    height: number;
    component: any;
}


/**
 * IModalContext 
 * 
 */
interface IModalContext {
    modalState: IModalState;
    setModalState: (type: any, payload?: any) => void;
}


/**
 * ModalContext 
 * 
 */
export const ModalContext = createContext<IModalContext>({
    modalState: initialState,
    setModalState: () => null
});


/**
 * ModalProvider 
 * 
 */
export const ModalProvider = (props: Props) => {
    const [modalState, dispatch] = useReducer(reducer, initialState);
    //const setModalState = (type: any, payload: any) => dispatch({ type, payload });

    const setModalState = (arg0: any, arg1?: any) => {
        dispatch({
            type: typeof arg0 == 'object' ? undefined : arg0,
            payload: typeof arg0 == 'object' ? arg0 : arg1
        });
    }

    return (
        <ModalContext.Provider value={{
            modalState,
            setModalState
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}