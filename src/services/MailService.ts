//Capacitor
import HttpRequest from '../http-common';

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
        return HttpRequest(requestMethods.POST, path, data);
    }
}

//eslint-disable-next-line
export default new MailService();
