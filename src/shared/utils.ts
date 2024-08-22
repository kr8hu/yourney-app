//Consts
import { postCategories } from "./const";


/**
 * getUserStorage
 * 
 * @return {Object}
 */
export function getUserStorage() {
    let userdata = JSON.parse(localStorage.getItem('Yourney_userdata') ?? "null");
    return userdata;
}


/**
 * setUserStorage
 * 
 */
export function setUserStorage(data: any) {
    let userdata = JSON.stringify(data);
    localStorage.setItem('Yourney_userdata', `${userdata}`);
}


/**
 * clearUserStorage
 * 
*/
export function clearUserStorage() {
    localStorage.removeItem('Yourney_userdata');
}

/**
 * sortByProperty
 * 
 */
export function sortByProperty(property: string, desc: boolean) {
    let sortOrder = desc ? -1 : 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return (a: any, b: any) => {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}



/**
 * blobToBase64
 * 
 */
export function blobToBase64(url: string) {
    return fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        }));
}


/**
 * base64ToBlob
 * 
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return 
 */
export function base64ToBlob(b64Data: string, contentType: string, sliceSize: number) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);

        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}


/**
 * calculateTime
 * 
 * @param startTime 
 * @param endTime 
 * @returns 
 */
export function calculateTime(startTime: string, endTime: string) {
    const startParts = startTime?.split(':') ?? "";
    const endParts = endTime?.split(':') ?? "";

    const startMinutes = parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
    const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);

    let durationMinutes = endMinutes - startMinutes;

    if (durationMinutes < 0) {
        durationMinutes += 24 * 60;
    }

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours === 0 && minutes === 0) return undefined;
    if (isNaN(hours) || isNaN(minutes)) return undefined;
    return { hours, minutes };
}


/**
 * getCategoryNameByID
 * 
 * @param category 
 * @returns 
 */
export function getCategoryNameByID(category: string) {
    for (const categoryKey in postCategories) {
        if (postCategories.hasOwnProperty(categoryKey)) {
            if (postCategories[categoryKey].id === category) {
                return postCategories[categoryKey].name;
            }
        }
    }
    return "N/A";
}

/**
 * shuffleArray
 * 
 * @param array 
 * @returns 
 */
export function shuffleArray(array: Array<any>) {
    return array.sort(() => Math.random() - 0.5);
}; 