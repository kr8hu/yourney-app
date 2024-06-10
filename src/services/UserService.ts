//Capacitor
import httpRequest from '../http-common';

//Shared
import { requestMethods } from '../shared/const';


/**
 * UserService
 * 
 */
class UserService {

    entity = "users";


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
     * findBy (id)
     * 
     * @param data 
     * @returns 
     */
    findById(id: string, data?: any) {
        const path = `${this.entity}/find/id/${id}`;
        return httpRequest(requestMethods.GET, path, data);
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
     * Update
     * 
     * @param data 
     * @returns 
     */
    update(id: string, data: any) {
        const path = `${this.entity}/update/${id}`;
        return httpRequest(requestMethods.PUT, path, data);
    }

    /**
     * Change Password
     * 
     * @param data 
     * @returns 
     */
    changePassword(id: string, data: any) {
        const path = `${this.entity}/changePassword/${id}`;
        return httpRequest(requestMethods.PUT, path, data);
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
export default new UserService();
