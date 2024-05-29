//Capacitor
import http from '../http-common';



class AuthService {

    entity = "auth";


    /**
     * Login
     * 
     * 
     * @param data 
     * @returns 
     */
    login(data: any) {
        return http.post(`${this.entity}/login`, data);

    }


    /**
     * Activate
     * 
     * @param id userid
     * @param data 
     * @returns 
     */
    activate(data: any) {
        return http.post(`${this.entity}/activate`, data);
    }
}

//eslint-disable-next-line
export default new AuthService();
