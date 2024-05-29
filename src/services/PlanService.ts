//Capacitor
import http from '../http-common';


class PlanService {

    entity = "plans";

    create(data: any) {
        return http.post(`${this.entity}/create`, data);
    }

    findAll(data?: any) {
        return http.post(this.entity, data);
    }

    findApproved(data?: any) {
        return http.post(`${this.entity}/find/approved`, data);
    }

    findById(id: string, data?: any) {
        return http.post(`${this.entity}/find/id/${id}`, data);
    }

    findByAuthor(author: string, data?: any) {
        return http.post(`${this.entity}/find/author/${author}`, data);
    }

    update(id: string, data: any) {
        return http.put(`${this.entity}/update/${id}`, data);
    }

    like(id: string, data: any) {
        return http.put(`${this.entity}/like/${id}`, data);
    }

    approve(id: string, data?: any) {
        return http.put(`${this.entity}/approve/${id}`, data);
    }

    delete(id: string, data?: any) {
        return http.delete(`${this.entity}/delete/${id}`, data);
    }
}

//eslint-disable-next-line
export default new PlanService();
