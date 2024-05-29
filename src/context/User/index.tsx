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

//Interfaces
import User from '../../interfaces/User';


/**
 * Props 
 * 
 */
interface Props {
    children: any;
}


/**
 * IUserState 
 * 
 */
interface IUserState {
    userdata: User;
}


/**
 * IUserContext 
 * 
 */
interface IUserContext {
    userState: IUserState;
    setUserState: (type: any, payload: any) => void;
}


/**
 * UserContext 
 * 
 */
export const UserContext = createContext<IUserContext>({
    userState: initialState,
    setUserState: () => null
});


/**
 * UserProvider 
 * 
 */
export const UserProvider = (props: Props) => {
    const [userState, dispatch] = useReducer(reducer, initialState);
    const setUserState = (type: any, payload: any) => dispatch({ type, payload });

    
    return (
        <UserContext.Provider value={{
            userState,
            setUserState
        }}>
            {props.children}
        </UserContext.Provider>
    )
}