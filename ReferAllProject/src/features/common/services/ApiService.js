import axios from 'axios';
// import CONFIG from './../../../config';
import history from '../../../common/history';
import AuthService from '../../authentication/services/AuthService';
import {LOGIN_PAGE, AUTH_HOME_PAGE} from '../../authentication/redux/constants';

// const BASE_URL = `${CONFIG.API_PROTOCOL}://${CONFIG.API_BASE_URL}:${CONFIG.API_PORT}`;

// const BASE_URL = "http://ec2-34-211-142-125.us-west-2.compute.amazonaws.com:80/api/";
const BASE_URL = "http://127.0.0.1:5000/api/";
// const token = '';
// const API_BASE_URL = `${BASE_URL}/${CONFIG.API_INDEX}`;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: '0',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    config => {
      config.headers["Accept"] = 'application/json';
      config.headers["Content-Type"] = 'application/json';

      if(AuthService.getSessionData().token != null){
        config.headers["Authorization"] = "Bearer " + AuthService.getSessionData().token;
      }
      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

axiosInstance.interceptors.response.use(response => {
        console.log('INTERCEPT RESPONSE: ',response);

        if (response.data && response.data.error && response.data.error === 'ALREADY AUTHENTICATED') {
            const user = response.data.user;

            AuthService.login(user);

            history.push(AUTH_HOME_PAGE);
        }

        return Promise.resolve(response);
    },
    error => {
        if (error.response && (
            (error.response.status && error.response.status === 401) // Not logged in
            || error.response.status === 419 // Session expired
            || error.response.status === 503 // Down for maintenance
        )) {
            if (!history.location.pathname.includes(LOGIN_PAGE)) {
                AuthService.logout();

                const location = {
                    pathname: LOGIN_PAGE,
                    search: `?intended=${history.location.pathname}`,
                    state: {
                        referrer: history.location.pathname
                    }
                };

                history.push(location);
            }

            return Promise.reject({status: 401, errors: ['Unauthorized']});
        }

        return Promise.reject(error);
    }
);

export const getFirstError = (err) => {
    let error = {...err};

    if (err.errors) {
        for(let field in err.errors) {
            if (Array.isArray(err.errors[field]) && err.errors[field].length) {
                error.message = err.errors[field][0];
            }
        }
    }

    return error;
};

export const getHtmlErrors = (err) => {
    let html = '';
    if (err.errors) {
        for(let field in err.errors) {
            if (Array.isArray(err.errors[field]) && err.errors[field].length > 0) {
                html += '<p>' + err.errors[field][0] + '</p>';
            }
        }
    } else {
        return {
            message: err.message,
        };
    }
    html += '';
    return {html: html};
};

export default class ApiService {

    static rejectError(error, reject) {
        if (error.response) {
            reject(error.response.data);
        } else {
            reject(error);
        }
    }

    static getCsrfCookie() {
        return axiosInstance.get(`${BASE_URL}/sanctum/csrf-cookie`);
    }

    static signIn(data) {
        return new Promise((resolve, reject) => {
            axiosInstance.post('auth', data)
                .then(
                    res => {
                        if(res.data.status === 200){
                            resolve(res.data.data);
                        } else {
                            ApiService.rejectError(res, reject);
                        }
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static getSpecialties(keyword_search) {
        const config = { 
                'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getSessionData().token}`
            }
        }
        return new Promise((resolve, reject) => {
            axiosInstance.get(`specialty/${keyword_search}`, null, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static getFavoriteClinics() {
        const config = { 
                'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getSessionData().token}`
            }
        }
        let user_id = AuthService.getSessionData().user.user_id;
        return new Promise((resolve, reject) => {
            axiosInstance.get(`clinic/${user_id}/favorites`, null, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static getClinicsBySpecialty(specialty_id) {
        const config = { 
                'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getSessionData().token}`
            }
        }
        return new Promise((resolve, reject) => {
            axiosInstance.get(`clinic/${specialty_id}/specialty`, null, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static getClinics() {
        const config = { 
                'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getSessionData().token}`
            }
        }
        return new Promise((resolve, reject) => {
            axiosInstance.get(`clinic`, null, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static sendReferral(data) {
        const config = { 
            'headers': {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${AuthService.getSessionData().token}`
        }
    }
        let user_id = AuthService.getSessionData().user.user_id;
        const formData = new FormData();
        Object.values(data.files).forEach(function (file, index) {
            formData.append('files',file.file);
        });
        formData.append('json',data.json);
        return new Promise((resolve, reject) => {
            axiosInstance.post(`/referral/${user_id}/send`, formData, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static getSentActiveReferrals(page, pageSize, status) {
        const config = { 
                'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getSessionData().token}`
            }
        }
        var clinic_id = -1;
        if(AuthService.getSessionData().user != null){
            clinic_id = AuthService.getSessionData().user.clinic_id;
        }
        return new Promise((resolve, reject) => {
            if (clinic_id === -1) {
                ApiService.rejectError({'response': {'data':"Not Logged In"}}, reject);
            }
            axiosInstance.get(`referral/clinic/${clinic_id}/sent/${page}/${pageSize}/${status}/`, null, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static getReceivedActiveReferrals(page, pageSize, status) {
        const config = { 
                'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getSessionData().token}`
            }
        }
        let clinic_id = AuthService.getSessionData().user.clinic_id;
        return new Promise((resolve, reject) => {
            axiosInstance.get(`referral/clinic/${clinic_id}/received/${page}/${pageSize}/${status}/`, null, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static getReferralFiles(referral_id) {
        const config = { 
                'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getSessionData().token}`
            }
        }
        return new Promise((resolve, reject) => {
            axiosInstance.get(`referral/${referral_id}/files`, null, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static getReferralPatient(referral_id) {
        const config = { 
                'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getSessionData().token}`
            }
        }
        return new Promise((resolve, reject) => {
            axiosInstance.get(`referral/${referral_id}/patient`, null, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static saveReferralNote(data, referral_id) {
        const config = { 
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getSessionData().token}`
            }
        }
        let user_id = AuthService.getSessionData().user.user_id;
        data['user_id'] = user_id;

        return new Promise((resolve, reject) => {
            axiosInstance.put(`/referral/${referral_id}/note`, data, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static getReferralNote(referral_id, page, pageSize) {
        const config = { 
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getSessionData().token}`
            }
        }

        return new Promise((resolve, reject) => {
            axiosInstance.get(`/referral/${referral_id}/note/${page}/${pageSize}`, null, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }

    static updateReferral(data, referral_id) {
        const config = { 
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AuthService.getSessionData().token}`
            }
        }
        let user_id = AuthService.getSessionData().user.user_id;
        data['user_id'] = user_id;

        return new Promise((resolve, reject) => {
            axiosInstance.put(`/referral/${referral_id}/status/`, data, config)
                .then(
                    res => {
                        resolve(res.data);
                    },
                    error => {
                        ApiService.rejectError(error, reject);
                    }
                );
        });
    }
}