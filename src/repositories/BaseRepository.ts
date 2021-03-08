import { RepoWriter } from "../interfaces/RepoWriter";
import { RepoReader } from "../interfaces/RepoReader";

export abstract class BaseRepository<T> implements RepoReader<T>, RepoWriter<T> {
    private lastId: number;
    private recordMap: Map<string, T>;

    constructor() {
        this.lastId = 0;
        this.recordMap = new Map();
    }

    find(item: T): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
    create(item: T): Promise<string> {
        this.lastId++;
        this.recordMap.set(this.lastId.toString(), item);
        return Promise.resolve<string>(JSON.stringify({id: this.lastId.toString(), item}));
    }
    update(id: string, item: T): Promise<string> {
        if(this.recordMap.has(id)){
            this.recordMap.set(id, item);
            return Promise.resolve(id);
        } else {
            return Promise.reject(new Error("Id and item content must be valid for update."));
        }
    }
    delete(id: string): Promise<string> {
        if (this.recordMap.has(id)) {
            this.recordMap.delete(id);
            return Promise.resolve(id);
        } else {
            return Promise.reject(new Error("Id has not been found."));
        }
    }
}