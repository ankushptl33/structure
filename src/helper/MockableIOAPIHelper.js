import { API_GATEWAY_URL } from '@/helper/MockableIOConstant.js';

var APIHelper = function() {};

Object.defineProperty(APIHelper.prototype, 'Url', {
    value: API_GATEWAY_URL,
    writable: false
});

Object.defineProperty(APIHelper.prototype, 'Resources', {
    get: function() {
        return {
            Visit: this.Url + 'GetVisit',
            SearchVisit: this.Url + 'SearchVisit',
            Measure: this.Url + 'measureget',
            Year: this.Url + 'yearget'
        };
    },
    readable: true
});

Object.defineProperty(APIHelper.prototype, 'Actions', {
    get: function() {
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
    get: function() {
        return (url, requestOptions, callback) => {
            return fetch(url, requestOptions).then(response => {
                return response;
            });
        };
    },
    readable: true
});

export default APIHelper;
