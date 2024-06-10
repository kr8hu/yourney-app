//Capacitor
import httpRequest from '../http-common';

//Shared
import { requestMethods } from '../shared/const';


/**
 * NotificationService
 * 
 */
class NotificationService {

    entity = "notifications";


    /**
     * Create
     * 
     * @param data 
     * @returns 
     */
    create(data: any) {
        const path = `${this.entity}/create`;
        return httpRequest(requestMethods.POST, path, data);
    }

    /**
     * findBy (query)
     * 
     * @param data 
     * @returns 
     */
    findByQuery(data: any) {
        const path = `${this.entity}/find/query`;
        return httpRequest(requestMethods.POST, path, data);
    }

    /**
     * Delete
     * 
     * @param data 
     * @returns 
     */
    delete(id: string, data?: any) {
        const path = `${this.entity}/delete/${id}`;
        return httpRequest(requestMethods.DELETE, path, data);
    }
}

//eslint-disable-next-line
export default new NotificationService();
