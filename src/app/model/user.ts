/**
 * Interface for creating users
 */
import {Recipe} from './recipe';
import {Observable, Observer} from 'rxjs';

export interface User {
    _id: string;
    userName: string;
    loginMethod?: string;
    password?: string;  // if login with FB, google no need password
    avatar?: string;
    gender?: UserGender.OTHER;
    recipes?: Recipe[];
    comments?: Comment[];
    created?: string;
}

/**
 * User gender enums
 */
export enum UserGender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other',
}

/**
 * Logged class singleton class
 */
export abstract class LoggedUser {
    private static user: User;

    /**
     * Local storage token key name. Use it to get JWT as value.
     */
    public static readonly localStorageJWT = 'JwtToken';

    /**
     * Get currently logged user
     */
    static get = (): User => LoggedUser.user;

    /**
     * Set user as logged user
     * @param user - to be set as logged user
     */
    static set = (user: User): User => LoggedUser.user = user;

    /**
     * removes
     */
    static remove() {
        LoggedUser.user = null;
        localStorage.removeItem(LoggedUser.localStorageJWT);
    }

    /**
     * get JWT token from local storage
     */
    static getToken = (): string => localStorage.getItem(LoggedUser.localStorageJWT);
}
