//Capacitor
import api from '../http-common';

//Shared
import { requestMethods } from '../shared/const';


/**
 * AuthService
 * 
 */
class AuthService {

    controller = "auth";


    /**
     * Login
     * 
     * @param data 
     * @returns 
     */
    login(data: any) {
        const path = `${this.controller}/login`;
        return api(requestMethods.POST, path ,data);
    }


    /**
     * Activate
     * 
     * @param data 
     * @returns 
     */
    activate(data: any) {
        const path = `${this.controller}/activate`;
        return api(requestMethods.POST, path ,data);
    }
}

//eslint-disable-next-line
export default new AuthService();
