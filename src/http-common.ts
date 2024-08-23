//Capacitor
import {
    CapacitorHttp,
    HttpHeaders,
    HttpOptions,
    HttpResponse
} from "@capacitor/core";

//Shared
import {
    requestMethods,
    url
} from "./shared/const";

//Interfaces
import ServiceResponse from "./interfaces/ServiceResponse";


/**
 * HTTP Headers
 * 
 */
const headers: HttpHeaders = {
    "Content-Type": "application/json"
};


/**
 * api
 * 
 * @param method 
 * @param path 
 * @param data 
 * @returns 
 */
const api = async (method: string, route: string, data: any) => {
    const params = method !== requestMethods.GET ? "" : data;

    const options: HttpOptions = {
        headers,
        method,
        data,
        params,
        url: url + route
    };

    try {
        let httpResponse: HttpResponse = await CapacitorHttp.request(options);
        return httpResponse.data as ServiceResponse;
    }
    catch (e) {
        const ServiceResponse: ServiceResponse = {
            payload: null,
            message: "Hiba lépett fel a művelet végrehajtása közben.",
        }
        return ServiceResponse;
    }
}

export default api;