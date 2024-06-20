//Interfaces
import Action from '../../interfaces/Action';

//Shared
import { actionTypes } from '../../shared/const';


export const reducer = (state: any, action: Action) => {
    switch (action.type) {
        case actionTypes.app.SET_NAVIGATOR:
            return {
                ...state,
                navigator: action.payload
            }
        case actionTypes.app.SET_BUSY:
            return {
                ...state,
                busy: action.payload
            }
        case actionTypes.app.SET_DEVICE:
            return {
                ...state,
                device: action.payload
            }
        case actionTypes.app.SET_CONTENT:
            return {
                ...state,
                content: action.payload
            }
        case actionTypes.app.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        default:
            return state
    }
}

export const initialState = {
    navigator: undefined,
    busy: false,
    device: undefined,
    content: [],
    notifications: []
}