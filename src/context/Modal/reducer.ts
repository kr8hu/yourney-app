//Interfaces
import Action from '../../interfaces/Action';

//Shared
import { actionTypes } from '../../shared/const';


export const reducer = (state: any, action: Action) => {
    switch (action.type) {
        case actionTypes.modal.SET_MODAL_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case actionTypes.modal.SET_MODAL_HEIGHT:
            return {
                ...state,
                height: action.payload
            }
        case actionTypes.modal.SET_MODAL_COMPONENT:
            return {
                ...state,
                component: action.payload
            }
        default:
            return {
                ...state,
                status: action.payload.status,
                height: action.payload.height,
                component: action.payload.component,
            };
    }
}

export const initialState = {
    status: false,
    height: 0,
    component: null,
}