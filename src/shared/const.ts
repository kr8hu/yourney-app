//Interfaces
import PostCategory from "../interfaces/PostCategory";


/**
 * App version
 * 
 */
export const appversion = "1.0.3";


/**
 * Server
 * 
 */
export const server = {
    dev: `${process.env.REACT_APP_SERVER_IP_DEV}:${process.env.REACT_APP_SERVER_PORT_DEV}`,
    prod: `${process.env.REACT_APP_SERVER_IP_PROD}:${process.env.REACT_APP_SERVER_PORT_PROD}`,
};


/**
 * Url
 * 
 */
export const url = `${process.env.REACT_APP_SERVER_PROTOCOL}://${server.dev}/`;


/**
 * Action Types
 */
export const actionTypes = {
    app: {
        SET_NAVIGATOR: 'APP_SET_NAVIGATOR',
        SET_BUSY: 'APP_SET_BUSY',
        SET_DEVICE: 'APP_SET_DEVICE',
        SET_CONTENT: 'APP_SET_LOCAL_CONTENT',
        SET_NOTIFICATIONS: 'APP_SET_NOTIFICATIONS',
    },
    dialog: {
        SET_STATUS: 'DIALOG_SET_STATUS',
        SET_VALUE: 'DIALOG_SET_VALUE'
    },
    modal: {
        SET_MODAL_STATUS: 'MODAL_SET_STATUS',
        SET_MODAL_HEIGHT: 'MODAL_SET_HEIGHT',
        SET_MODAL_COMPONENT: 'MODAL_SET_COMPONENT'
    },
    loading: {
        SET_STATUS: 'LOADING_SET_STATUS'
    },
    user: {
        SET_USERDATA: 'USER_SET_DATA'
    }
}


/**
 * Animation Types
 */
export const animationTypes = {
    LIFT: "lift",
    SLIDE: "slide",
    FADE: "fade"
}


/**
 * Dialog Types
 */
export const dialogTypes = {
    ALERT: 'DIALOG_ALERT',
    CONFIRM: 'DIALOG_CONFIRM',
    PROMPT: 'DIALOG_PROMPT',
    SELECT: 'DIALOG_SELECT'
}

/**
 * Post Categories
 */
export const postCategories: { [key: string]: PostCategory } = {
    SIGHTSEEING: {
        icon: '🌇',
        id: 'CAT_SIGHTSEEING',
        name: "Városnézés"
    },
    TRIP: {
        icon: '🏕',
        id: 'CAT_TRIP',
        name: "Kirándulás"
    },
    TOUR: {
        icon: '🧗',
        id: 'CAT_TOUR',
        name: "Túra"
    },
    VACATION: {
        icon: '🏖',
        id: 'CAT_VACATION',
        name: "Nyaralás"
    }
}

export const loadingStates = {
    init: 0,
    strings: 1,
    content: 2,
    notifications: 3,
    device: 4,
    finished: 100
}

export const requestMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

export const cacheType = {
    MEDIA: "Media",
    CONTENT: "Content",
    NOTIFICATION: "Notifications"
}