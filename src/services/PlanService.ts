//Capacitor
import api from '../http-common';

//Shared
import { requestMethods } from '../shared/const';


/**
 * PlanService
 * 
 */
class PlanService {

    controller = "plans";


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
     * Find (id)
     * 
     * @param id
     * @param data
     * @returns 
     */
    findById(id: string, data?: any) {
        const route = `${this.controller}/find/id/${id}`;
        return api(requestMethods.GET, route, data);
    }

    /**
     * Find (query)
     * 
     * @param id 
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
     * @param id 
     * @param data 
     * @returns 
     */
    update(id: string, data: any) {
        const route = `${this.controller}/update/${id}`;
        return api(requestMethods.PUT, route, data);
    }

    /**
     * Like
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    like(id: string, data: any) {
        const route = `${this.controller}/like/${id}`;
        return api(requestMethods.PUT, route, data);
    }

    /**
     * Approve
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    approve(id: string, data?: any) {
        const route = `${this.controller}/approve/${id}`;
        return api(requestMethods.PUT, route, data);
    }

    /**
     * Delete
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    delete(id: string, data?: any) {
        const route = `${this.controller}/delete/${id}`;
        return api(requestMethods.DELETE, route, data);
    }
}

//eslint-disable-next-line
export default new PlanService();
