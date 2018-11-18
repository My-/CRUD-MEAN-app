/**
 * Interface for creating users
 */
export interface User {
    id: number;
    userName: string;
    loginMethod: string;
    password?: string;
    avatar?: string;
    gender?: UserGender.OTHER;
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
}
