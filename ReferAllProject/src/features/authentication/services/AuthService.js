import Cookies from 'js-cookie';
import {isEmpty} from 'lodash';
import User from '../models/User';
import {
    ADMIN_USER_MENU_ITEMS,
    PUBLIC_MENU_ITEMS,
    USER_MENU_ITEMS,
    USER_SETTINGS_OPTIONS
} from '../../common/menu/UserMenuItems';
import moment from 'moment';
import {DATETIME_VALUE_FROM_DB} from '../../common/utils/DateFormatter';

const AUTH_USER = 'current_user';
const AUTH_TOKEN = 'user_token';

export default class AuthService {

    static login(userData) {
        // Cookies.set(AUTH_TOKEN, userData);
        // Cookies.set(AUTH_EXPIRATION, data.expires);
        Cookies.set(AUTH_USER, JSON.stringify(userData), {expires: 86400, sameSite: 'lax'});
        // localStorage.setItem(AUTH_USER, JSON.stringify(userData));
        // console.log('EXPIRE date: ', new Date(data.expires));
        console.log("Session Data: ");
        console.log(AuthService.getSessionData());
        return AuthService.getSessionData();
    }

    static updateUser(userData) {
        let existingUser = AuthService.getAuthUser();
        let newUserData = {
            ...existingUser,
            ...userData,
        };

        Cookies.remove(AUTH_USER, {expires: 86400, sameSite: 'lax'});
        Cookies.set(AUTH_USER, JSON.stringify(newUserData), {expires: 86400, sameSite: 'lax'});

        return AuthService.getSessionData();
    }

    static getActivatedUserSessionData() {
        return AuthService.updateUser({status: 'ACTIVATED', email_verified_at: moment().format(DATETIME_VALUE_FROM_DB)});
    }

    static logout() {
        // Cookies.remove(AUTH_TOKEN);
        // Cookies.remove(AUTH_EXPIRATION);
        Cookies.remove(AUTH_USER, {expires: 86400, sameSite: 'lax'});
        // localStorage.removeItem(AUTH_USER);
    }

    static getAuthUser() {
        const user = Cookies.get(AUTH_USER);
        // const user = localStorage.getItem(AUTH_USER);

        if (!user) {
            // AuthService.signOut();
            // throw new Error('No authenticated user found');
            return null;
        }

        return JSON.parse(user);

        // TODO: refractor this later to use this below
        // return new User(JSON.parse(user));
    }

    static isLoggedIn() {
        return !!AuthService.getAuthUser();
    }

    static isAdmin() {
        const user = AuthService.getAuthUser();

        if (!user) {
            throw new Error('Unauthenticated');
        }

        return User.isAdmin(user.role);
    }

    static getHeaderMenuItemsByUser(user) {
        if (!user) {
            return PUBLIC_MENU_ITEMS;
        }

        if (User.isAdmin(user.role)) {
            return ADMIN_USER_MENU_ITEMS;
        } else if (User.isUser(user.role)) {
            return USER_MENU_ITEMS;
        } else {
            return PUBLIC_MENU_ITEMS;
        }
    }

    static getHeaderDropDownItems(user) {
        if (!user) {
            return [];
        }

        if (User.isAdmin(user.role)) {
            const excludeItems = ['billing'];
            return USER_SETTINGS_OPTIONS.filter(item => !excludeItems.includes(item.label.toLowerCase()));
        }

        return USER_SETTINGS_OPTIONS;
    }

    static getSessionData() {
        const user = AuthService.getAuthUser();
        const isUserNotEmpty = !isEmpty(user);

        let displayName = '';

        if (isUserNotEmpty) {
            displayName = user.first_name || user.last_name
                          ? `${user.first_name}`
                          : user.email;
        }

        const menuItems = AuthService.getHeaderMenuItemsByUser(user);
        const userDropdownOptions = AuthService.getHeaderDropDownItems(user);
        return {
            token: !isUserNotEmpty ? null : user.token,
            user: !isUserNotEmpty ? null : {...user, displayName},
            headerMenuItems: menuItems,
            isAuthenticated: isUserNotEmpty,
            userSettingsOptions: userDropdownOptions,
        };
    }

    static setIntended(intended) {
        Cookies.set('INTENDED_ROUTE', intended, {expires: 86400, sameSite: 'lax'});
    }

    static getIntended() {
        return Cookies.get('INTENDED_ROUTE');
    }

    static clearIntended() {
        Cookies.remove('INTENDED_ROUTE', {expires: 86400, sameSite: 'lax'});
    }
}