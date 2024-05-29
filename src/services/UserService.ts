//Capacitor
import http from '../http-common';


class UserService {

    entity = "users";

    create(data: any) {
        return http.post(`${this.entity}/create`, data);
    }

    findByUsername(username: string, data?: any) {
        return http.post(`${this.entity}/find/username/${username}`, data);
    }

    findAll(data?: any) {
        return http.post(`${this.entity}/users`, data);
    }

    update(id: string, data: any) {
        return http.put(`${this.entity}/update/${id}`, data);
    }

    changePassword(id: string, data: any) {
        return http.put(`${this.entity}/changePassword/${id}`, data);
    }

    delete(id: string, data?: any) {
        return http.delete(`${this.entity}/delete/${id}`, data);
    }
}

//eslint-disable-next-line
export default new UserService();
