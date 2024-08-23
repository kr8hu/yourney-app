//Capacitor
import api from '../http-common';

//Shared
import { requestMethods } from '../shared/const';


/**
 * NotificationService
 * 
 */
class NotificationService {

    controller = "notifications";


    /**
     * Create
     * 
     * @param data 
     * @returns 
     */
    create(data: any) {
        const route = `${this.controller}/create`;
        return api(requestMethods.POST, route, data);
    }

    /**
     * findBy (query)
     * 
     * @param data 
     * @returns 
     */
    findByQuery(data: any) {
        const route = `${this.controller}/find/query`;
        return api(requestMethods.POST, route, data);
    }

    /**
     * Delete
     * 
     * @param data 
     * @returns 
     */
    delete(id: string, data?: any) {
        const route = `${this.controller}/delete/${id}`;
        return api(requestMethods.DELETE, route, data);
    }
}

//eslint-disable-next-line
export default new NotificationService();
