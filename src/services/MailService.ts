//Capacitor
import api from '../http-common';

//Shared
import { requestMethods } from '../shared/const';


/**
 * MailService
 * 
 */
class MailService {

    controller = "mail";

    /**
     * Contact
     * 
     * @param data 
     * @returns 
     */
    contact(data: any) {
        const route = `${this.controller}/contact`;
        return api(requestMethods.POST, route, data);
    }
}

//eslint-disable-next-line
export default new MailService();
