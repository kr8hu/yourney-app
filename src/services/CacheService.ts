//Onsen UI
import ons from "onsenui";

//Shared
import { cacheType, url } from "../shared/const";
import { blobToBase64 } from "../shared/utils";

//Interfaces
import Post from "../interfaces/Post";


/**
 * CacheService
 * 
 */
class CacheService {
    private db: IDBDatabase | null = null;
    private name: string;

    constructor() {
        this.db = null;
        this.name = "Cache";

        this.open();
    }


    /**
     * Open
     * 
     * @returns 
     */
    async open(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name, 1);

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                this.db = (event.target as IDBOpenDBRequest).result;

                this.db.createObjectStore(cacheType.CONTENT, { keyPath: "id", autoIncrement: true });
                this.db.createObjectStore(cacheType.MEDIA, { keyPath: "id", autoIncrement: true });
                this.db.createObjectStore(cacheType.NOTIFICATION, { keyPath: "id", autoIncrement: true });
            };

            request.onsuccess = (event: Event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve(this.db);
            };

            request.onerror = (event: Event) => {
                const errorMessage = (event.target as IDBOpenDBRequest).error?.message;
                reject(errorMessage);
            };
        });
    }


    /**
     * Create
     * 
     * @param record 
     * @returns 
     */
    async create(store: string, record: any) {
        return new Promise((resolve, reject) => {
            if (this.db) {
                const transaction = this.db.transaction([store], "readwrite");
                const objectStore = transaction.objectStore(store);
                const request = objectStore.add(record);

                request.onsuccess = () => {
                    resolve(true);
                };

                request.onerror = (event: Event) => {
                    const errorMessage = (event.target as IDBOpenDBRequest).error?.message;
                    ons.notification.alert(errorMessage as string);
                    reject(false);
                };
            }
        });
    }


    /**
     * Read
     * 
     * @param id 
     * @returns 
     */
    async find(store: string, id: any) {
        return new Promise((resolve, reject) => {
            if (this.db) {
                const transaction = this.db.transaction([store]);
                const objectStore = transaction.objectStore(store);
                const request = objectStore.get(id);

                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = (event: Event) => {
                    const errorMessage = (event.target as IDBOpenDBRequest).error?.message;
                    reject(errorMessage);
                };
            }
        });
    }


    /**
     * Find (all)
     * 
     * @returns 
     */
    async findAll(store: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.db) {
                const transaction = this.db.transaction([store]);
                const objectStore = transaction.objectStore(store);
                const request = objectStore.getAll();

                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = (event: Event) => {
                    const errorMessage = (event.target as IDBOpenDBRequest).error?.message;
                    reject(errorMessage);
                };
            }
        });
    }


    /**
     * Update
     * 
     * @param record 
     * @returns 
     */
    async update(store: string, record: any) {
        return new Promise((resolve, reject) => {
            if (this.db) {
                const transaction = this.db.transaction([store], "readwrite");
                const objectStore = transaction.objectStore(store);
                const request = objectStore.put(record);

                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = (event: Event) => {
                    const errorMessage = (event.target as IDBOpenDBRequest).error?.message;
                    reject(errorMessage);
                };
            }
        });
    }


    /**
     * Delete
     * 
     * @param id 
     * @returns 
     */
    async delete(store: string, id: any) {
        return new Promise((resolve, reject) => {
            if (this.db) {
                const transaction = this.db.transaction([store], "readwrite");
                const objectStore = transaction.objectStore(store);
                const request = objectStore.delete(id);

                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = (event: Event) => {
                    const errorMessage = (event.target as IDBOpenDBRequest).error?.message;
                    reject(errorMessage);
                };
            }
        });
    }


    /**
     * Clear
     * 
     * @returns 
     */
    async clear(store: string) {
        return new Promise((resolve, reject) => {
            if (this.db) {
                const transaction = this.db.transaction([store], "readwrite");
                const objectStore = transaction.objectStore(store);
                const request: IDBRequest = objectStore.clear();

                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = (event: Event) => {
                    const errorMessage = (event.target as IDBOpenDBRequest).error?.message;
                    reject(errorMessage);
                };
            }
        });
    }


    /**
     * Convert
     * 
     */
    async convert() {
        //Cachelt tartalom lekérése
        const posts = await this.findAll(cacheType.CONTENT);

        if (posts) {
            for (let post of posts) {
                //Galériaképek
                this.convertImages(post.photos);

                //Helyszín képek
                for (let location of post.locations) {
                    this.convertImages(location.photos);
                }
            }
        }
    }


    /**
     * convertImages
     *     
     * @param source 
     */
    async convertImages(source: Array<Post | Location>) {
        for (let i = 0; i < source.length; i++) {
            //Kép url
            const photoUrl = `${url}/public/images/plans/${source[i]}`;

            //Kép átalakítása base64 formátumra
            const base64image = await blobToBase64(photoUrl);

            if (base64image) {
                //Tárolás a mediacache-ben
                const record = {
                    key: source[i],
                    value: base64image
                };

                this.create(cacheType.MEDIA, record);
            }
        }
    }
}

//eslint-disable-next-line
export default new CacheService();