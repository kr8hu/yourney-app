//Capacitor
import http from '../http-common';


class MailService {

    entity = "mail";

    contact(data: any) {
        return http.post(`${this.entity}/contact`, data);
    }
}

//eslint-disable-next-line
export default new MailService();
