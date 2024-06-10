//Capacitor
import HttpRequest from '../http-common';

//Shared
import { requestMethods } from '../shared/const';


/**
 * PlanService
 * 
 */
class PlanService {

    entity = "plans";


    /**
     * Create
     * 
     * @param data 
     * @returns 
     */
    create(data: any) {
        const path = `${this.entity}/create`;
        return HttpRequest(requestMethods.POST, path, data);
    }

    /**
     * Find (id)
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    findById(id: string, data?: any) {
        const path = `${this.entity}/find/id/${id}`;
        return HttpRequest(requestMethods.GET, path, data);
    }

    /**
     * Find (query)
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    findByQuery(data: any) {
        const path = `${this.entity}/find/query`;
        return HttpRequest(requestMethods.POST, path, data);
    }

    /**
     * Update
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    update(id: string, data: any) {
        const path = `${this.entity}/update/${id}`;
        return HttpRequest(requestMethods.PUT, path, data);
    }

    /**
     * Like
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    like(id: string, data: any) {
        const path = `${this.entity}/like/${id}`;
        return HttpRequest(requestMethods.PUT, path, data);
    }

    /**
     * Approve
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    approve(id: string, data?: any) {
        const path = `${this.entity}/approve/${id}`;
        return HttpRequest(requestMethods.PUT, path, data);
    }

    /**
     * Delete
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    delete(id: string, data?: any) {
        const path = `${this.entity}/delete/${id}`;
        return HttpRequest(requestMethods.DELETE, path, data);
    }
}

//eslint-disable-next-line
export default new PlanService();
