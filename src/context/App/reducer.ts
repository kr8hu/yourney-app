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
        case actionTypes.app.SET_CACHE:
            return {
                ...state,
                cache: action.payload
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
    cache: localStorage.getItem("Yourney_cache") ? JSON.parse(`${localStorage.getItem("Yourney_cache")}`) : [],
    notifications: localStorage.getItem("Yourney_notifications") ? JSON.parse(`${localStorage.getItem("Yourney_notifications")}`) : []
}