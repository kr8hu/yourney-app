//Capacitor
import httpRequest from '../http-common';

//Shared
import { requestMethods } from '../shared/const';


/**
 * AuthService
 * 
 */
class AuthService {

    entity = "auth";


    /**
     * Login
     * 
     * @param data 
     * @returns 
     */
    login(data: any) {
        const path = `${this.entity}/login`;
        return httpRequest(requestMethods.POST, path ,data);
    }


    /**
     * Activate
     * 
     * @param data 
     * @returns 
     */
    activate(data: any) {
        const path = `${this.entity}/activate`;
        return httpRequest(requestMethods.POST, path ,data);
    }
}

//eslint-disable-next-line
export default new AuthService();
