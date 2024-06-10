//Capacitor
import httpRequest from '../http-common';

//Shared
import { requestMethods } from '../shared/const';


/**
 * MailService
 * 
 */
class MailService {

    entity = "mail";

    /**
     * Contact
     * 
     * @param data 
     * @returns 
     */
    contact(data: any) {
        const path = `${this.entity}/contact`;
        return httpRequest(requestMethods.POST, path, data);
    }
}

//eslint-disable-next-line
export default new MailService();
