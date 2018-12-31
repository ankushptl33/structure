import axios from 'axios';
import Cookies from 'universal-cookie';

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseUrl = null) => {
    const options = {
        baseURL: baseUrl
    };

    // if (store.getters['users/isAuthenticated']) {
    //   options.headers = {
    //     Authorization: `Bearer ${store.getters['users/accessToken']}`,
    //   };
    // }

    const client = axios.create(options);

    // Add a request interceptor
    client.interceptors.request.use(
        requestConfig => requestConfig,
        requestError => {
            // console.log((requestError);

            return Promise.reject(requestError);
        }
    );

    // Add a response interceptor
    client.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status >= 500) {
                // console.log((error);
            }
            if (error.response.status === 401) {
                const cookies = new Cookies();
                cookies.set('interval', '', { path: '/', secure: 0, maxAge: 1 });
                cookies.set('jwt-token', '', { path: '/', secure: 0, maxAge: 1 });
                window.location.href = '/login';
            }

            return Promise.reject(error);
        }
    );

    return client;
};

class ApiClient {
    constructor(baseUrl = null) {
        this.client = getClient(baseUrl);
    }

    async get(url, conf = {}) {
        try {
            const response = await this.client.get(url, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async delete(url, conf = {}) {
        try {
            const response = await this.client.delete(url, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async head(url, conf = {}) {
        try {
            const response = await this.client.head(url, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    options(url, conf = {}) {
        return this.client
            .options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    }

    async post(url, data = {}, conf = {}) {
        try {
            const response = await this.client.post(url, data, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async put(url, data = {}, conf = {}) {
        try {
            const response = await this.client.put(url, data, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async patch(url, data = {}, conf = {}) {
        try {
            const response = await this.client.patch(url, data, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export { ApiClient };

/**
 * Base HTTP Client
 */
export default {
    // Provide request methods with the default base_url
    async get(url, conf = {}) {
        try {
            const response = await getClient().get(url, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async delete(url, conf = {}) {
        try {
            const response = await getClient().delete(url, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async head(url, conf = {}) {
        try {
            const response = await getClient().head(url, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    },

    options(url, conf = {}) {
        return getClient()
            .options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    async post(url, data = {}, conf = {}) {
        try {
            const response = await getClient().post(url, data, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async put(url, data = {}, conf = {}) {
        try {
            const response = await getClient().put(url, data, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async patch(url, data = {}, conf = {}) {
        try {
            const response = await getClient().patch(url, data, conf);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    }
};
