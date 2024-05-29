//Capacitor
import http from '../http-common';


class NotificationService {

    entity = "notifications";

    create(data: any) {
        return http.post(`${this.entity}/create`, data);
    }

    findAll(data?: any) {
        return http.post(this.entity, data);
    }

    findByAddressee(username: string, data?: any) {
        return http.post(`${this.entity}/find/addressee/${username}`, data);
    }

    delete(id: string, data?: any) {
        return http.delete(`${this.entity}/delete/${id}`, data);
    }
}

//eslint-disable-next-line
export default new NotificationService();
