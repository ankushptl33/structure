import Cookies from 'universal-cookie';
import { API_GATEWAY_URL, REGISTRY_UNIT_NAME } from '@/helper/constants.js';
import client from './axiosClient';

const APIHelper = function() {};

Object.defineProperty(APIHelper.prototype, 'Url', {
    value: API_GATEWAY_URL,
    writable: false
});

Object.defineProperty(APIHelper.prototype, 'Resources', {
    get() {
        return {
            Practice: this.Url + 'practice',
            Provider: this.Url + 'provider',
            Location: this.Url + 'location',
            Measure: this.Url + 'measure',
            Performance: this.Url + 'performance',
            Patient: this.Url + 'patient',
            Authenticate: this.Url + 'checkidpwddb',
            FogotPassword: this.Url + 'getresetpasswordtoken',
            AuthenticateToken: this.Url + 'validateresetpasswordtoken',
            ResetPassword: this.Url + 'updatepassword',
            RenewToken: this.Url + 'renewtoken',
            TokenDeactivate: this.Url + 'token/deactivate',
            GetMenuDetails: this.Url + 'getresourcedetails',
            ValidateToken: this.Url + 'validatetoken',
            GetUserProfile: this.Url + 'getuserprofile',
            ResetPasswordLink: this.Url + 'resetpassword',
            ValidateRegistryDashboardToken: this.Url + 'validateregistrydashboardtoken',
            Visit: this.Url + 'GetVisit',
            SearchVisit: this.Url + 'SearchVisit',
            Webtool: this.Url + 'dynamicformservice',
            qualityPreference: this.Url + 'webtool',
            patientVisit: this.Url + 'patient',
            Export: this.Url + 'report',
            RegistryUnit: REGISTRY_UNIT_NAME
        };
    },
    readable: true
});

Object.defineProperty(APIHelper.prototype, 'Actions', {
    get() {
        return {
            View: 'View',
            Create: 'Create',
            Update: 'Update',
            Delete: 'Delete'
        };
    },
    readable: true
});

Object.defineProperty(APIHelper.prototype, 'PegasusAPI', {
    get() {
        return async (url, requestOptions, callback) => {
            const res = await client.post(url, requestOptions.body, {
                headers: requestOptions.headers
            });
            if (res.statusText === 'OK') {
                return res.data;
            } else {
                if (res.status === 401) {
                    const cookies = new Cookies();
                    cookies.set('interval', '', {
                        path: '/',
                        secure: 0,
                        maxAge: 1
                    });
                    cookies.set('jwt-token', '', {
                        path: '/',
                        secure: 0,
                        maxAge: 1
                    });
                    window.location.href = '/login';
                } else {
                    const error = new Error(res.statusText);
                    error.response = res;
                    return error;
                }
            }
        };
    },
    readable: true
});

Object.defineProperty(APIHelper.prototype, 'getRequestOption', {
    get() {
        return (query, variables, action, token) => ({
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Action: action,
                Authorization: token
            },
            body: JSON.stringify({ query, variables })
        });
    },
    readable: true
});

export default APIHelper;
