import { BaseRepository } from "./BaseRepository";
import { User } from "../models/User";

export class UserRepository extends BaseRepository<User>{
    public isValid(user: User) {
        if (typeof user != undefined && user && Object.keys(user).length > 0) {
            return true;
        }
        return false;
    }
}