
/*
 * Roles
 */
const ADMIN = 'admin';
const USER = 'user';

const STATUS_ACTIVATED = 'ACTIVATED';

export default class User {
    role;
    email;
    firstname;
    lastname;
    contact_number;
    profile_photo_url;
    status;

    constructor(data) {
        Object.assign(this, data);
    }

    getDisplayName() {
        return `${this.firstname} ${this.lastname}`;
    }

    static isAdmin(role) {
        return role === ADMIN;
    }

    static isUser(role) {
        return role === USER;
    }

    static isActivated(user) {
        if (!user) {
            return false;
        }
        return user.status === STATUS_ACTIVATED;
    }
}