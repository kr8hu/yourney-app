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
import CustomResponse from "./interfaces/CustomResponse";


/**
 * HTTP Headers
 * 
 */
const headers: HttpHeaders = {
    "Content-Type": "application/json"
};

/**
 * HttpRequest
 * 
 * @param method 
 * @param path 
 * @param data 
 * @returns 
 */
async function HttpRequest(method: string, path: string, data: any) {
    const params = method !== requestMethods.GET ? "" : data;

    const options: HttpOptions = {
        headers,
        method,
        data,
        params,
        url: url + path
    };

    try {
        let httpResponse: HttpResponse = await CapacitorHttp.request(options);
        return httpResponse.data as CustomResponse;
    }
    catch (e) {
        const customResponse: CustomResponse = {
            payload: null,
            message: "Hiba lépett fel a művelet végrehajtása közben.",
        }
        return customResponse;
    }
}

export default HttpRequest;