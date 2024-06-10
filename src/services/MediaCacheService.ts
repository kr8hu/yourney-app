//Interfaces
import MediaCache from "../interfaces/MediaCache";

//Onsen core
import ons from "onsenui";


/**
 * schema
 * 
 */
const schema = [
    {
        name: "key",
        keyPath: "key",
        unique: true
    },
    {
        name: "value",
        keyPath: "value",
        unique: false
    }
];


/**
 * MediaCacheService
 * 
 */
class MediaCacheService {
    storage: string;


    /**
     * constructor
     */
    constructor() {
        this.storage = "MediaCache";
    }

    /**
     * Open
     * 
     * @returns 
     */
    open() {
        let promise = new Promise((resolve: any, reject: any) => {
            //Adatbázis megnyitása
            let request: IDBOpenDBRequest = indexedDB.open("Cache", 1);

            //Hiba esetén lefutó funkció
            request.onerror = (e: Event) => {
                reject("Hiba történt a gyorsítótár-művelet végrehajtása közben.");
            };

            //Sikeres művelet esetén lefutó funkció
            request.onsuccess = (e: Event) => {
                const db: IDBDatabase = (e.target as IDBOpenDBRequest).result;
                resolve(db);
            };

            //Adatbázis struktúra módosítás esetén lefutó funkció
            request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
                //Adatbázis kiválasztása
                const db: IDBDatabase = (e.target as IDBOpenDBRequest).result;

                //Tábla létrehozása ha még nem létezik
                if (!db.objectStoreNames.contains(this.storage)) {
                    let objectStore = db.createObjectStore(this.storage, { keyPath: 'id', autoIncrement: true });

                    schema.forEach((s: any) => {
                        console.log(s);
                        objectStore.createIndex(s.name, s.keyPath, { unique: s.unique });
                    });
                }
            };
        });

        return promise;
    }

    /**
     * Get
     * 
     * @returns 
     */
    get() {
        let promise = new Promise((resolve: any, reject: any) => {
            this.open()
                .then((db: unknown) => {
                    if (db instanceof IDBDatabase) {
                        const transaction: IDBTransaction = db.transaction(this.storage, "readonly");
                        const objectStore: IDBObjectStore = transaction.objectStore(this.storage);
                        const request: IDBRequest<any[]> = objectStore.getAll();

                        //Lekérdezés sikeres lefutását követően lefutó funkció
                        request.onsuccess = (e: Event) => {
                            const data: Array<MediaCache> = request.result;
                            resolve(data);
                        };

                        //Lekérdezés hiba esetén lefutó funkció
                        request.onerror = (e: Event) => {
                            reject(null);
                        };
                    }
                })
                .catch(() => {
                    ons.notification.alert("Hiba történt a gyorsítótár-művelet végrehajtása közben.");
                })
        });

        return promise;
    }

    /**
     * Set
     * 
     * @param data 
     */
    set(data: Array<MediaCache>) {
        this.open()
            .then((db: any) => {
                const transaction: IDBTransaction = db.transaction([this.storage], "readwrite");
                let objectStore: IDBObjectStore = transaction.objectStore(this.storage);

                data.forEach((item: MediaCache) => {
                    objectStore.add(item);
                });
            })
            .catch(() => {
                ons.notification.alert("Hiba történt a gyorsítótár-művelet végrehajtása közben.");
            })
    }

    /**
     * Clear
     * 
     */
    clear() {
        this.open()
            .then((db: any) => {
                if (db instanceof IDBDatabase) {
                    const transaction: IDBTransaction = db.transaction([this.storage], "readwrite");
                    const objectStore: IDBObjectStore = transaction.objectStore(this.storage);

                    const request: IDBRequest = objectStore.clear();

                    //Lekérdezés sikeres lefutását követően lefutó funkció
                    request.onsuccess = (e: Event) => { };

                    //Lekérdezés hiba esetén lefutó funkció
                    request.onerror = (e: Event) => { };
                }
            })
            .catch(() => {
                ons.notification.alert("Hiba történt a gyorsítótár-művelet végrehajtása közben.");
            })
    }
}

//eslint-disable-next-line
export default new MediaCacheService();