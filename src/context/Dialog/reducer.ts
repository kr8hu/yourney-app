//Shared
import { actionTypes } from "../../shared/const";


export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case actionTypes.dialog.SET_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case actionTypes.dialog.SET_VALUE:
            return {
                ...state,
                value: action.payload
            }
        default:
            return {
                ...state,
                status: true,
                type: action.payload.type,
                text: action.payload.text,
                closeable: action.payload.closeable,
                buttons: action.payload.buttons,
                options: action.payload.options,
                maxLength: action.payload.maxLength,
                onSubmit: action.payload.onSubmit,
                onClose: action.payload.onClose
            }
    }
}

export const initialState = {
    status: false,
    type: undefined,
    closeable: false,
    text: '',
    buttons: [],
    options: [],
    maxLength: 32,
    value: undefined,
    onSubmit: null,
    onClose: null
}

