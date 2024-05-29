//Capacitor
import {
    CapacitorHttp,
    HttpHeaders,
    HttpOptions
} from "@capacitor/core";

//Shared
import { url } from "./shared/const";


/**
 * HTTP Headers
 * 
 */
const headers: HttpHeaders = {
    "Content-Type": "application/json"
};


/**
 * Http
 * 
 */
class Http {
    /**
     * get
     * 
     * @param path 
     * @param params 
     */
    async get(path: string, params: any) {
        const options: HttpOptions = {
            headers,
            params,
            url: url + path,
        };

        const response = await CapacitorHttp.post(options);
        return response;
    }


    /**
     * post
     * 
     * @param path 
     * @param params 
     */
    async post(path: string, data?: any) {
        const options: HttpOptions = {
            headers,
            data,
            url: url + path,
        };

        const response = await CapacitorHttp.post(options);
        return response;
    }


    /**
     * put
     * 
     * @param path 
     * @param data 
     * @returns 
     */
    async put(path: string, data: any) {
        const options: HttpOptions = {
            headers,
            data,
            url: url + path,
        };

        const response = await CapacitorHttp.put(options);
        return response;
    }
    

    /**
     * delete
     * 
     * @param path 
     * @param data 
     * @returns 
     */
    async delete(path: string, data: any) {
        const options: HttpOptions = {
            headers,
            data,
            url: url + path,
        };

        const response = await CapacitorHttp.delete(options);
        return response;
    }
}

//eslint-disable-next-line
export default new Http();