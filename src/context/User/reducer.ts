//Interfaces
import Action from '../../interfaces/Action';

//Shared
import { getUserStorage } from '../../shared/utils';
import { actionTypes } from '../../shared/const';


export const reducer = (state: any, action: Action) => {
    switch (action.type) {
        case actionTypes.user.SET_USERDATA:
            return {
                ...state,
                userdata: action.payload
            }
        default:
            return state
    }
}

export const initialState = {
    userdata: getUserStorage()
}