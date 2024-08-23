//Capacitor
import api from '../http-common';

//Shared
import { requestMethods } from '../shared/const';


/**
 * UserService
 * 
 */
class UserService {

    controller = "users";


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
     * findBy (id)
     * 
     * @param data 
     * @returns 
     */
    findById(id: string, data?: any) {
        const route = `${this.controller}/find/id/${id}`;
        return api(requestMethods.GET, route, data);
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
     * Update
     * 
     * @param data 
     * @returns 
     */
    update(id: string, data: any) {
        const route = `${this.controller}/update/${id}`;
        return api(requestMethods.PUT, route, data);
    }

    /**
     * Change Password
     * 
     * @param data 
     * @returns 
     */
    changePassword(id: string, data: any) {
        const route = `${this.controller}/changePassword/${id}`;
        return api(requestMethods.PUT, route, data);
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
export default new UserService();
