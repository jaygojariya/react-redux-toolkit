import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_PROJECT_API_URL;

const GENERIC_ERROR_MESSAGES = {
    429: 'Too many requests, please try again later.',
    500: 'Something went wrong, please try again later.',
}

const defaultHeaders = {
    accept: 'application/json',
    'Content-Type': 'application/json'
};

const returnResponse = async (r) => {
    let json = r;
    if (r.status === 429 || r.status === 500) {
        json = { message: GENERIC_ERROR_MESSAGES[r.status], status: r.status };
        // errorEvents.apiError(window.location.pathname, json.message, json.status);
    } else if (r.status === 422) {
        // errorEvents.apiError(window.location.pathname, json.message, json.status);
        for (const i in json.details.errors) {
            json = { message: json.details.errors[i][0].msg || '', status: r.status };
        }
    }

    return ({
        status: r.status,
        response: json,
    });
};

export const get = async (url, headers = {}, data = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${apiBaseUrl}${url}`, {
                headers: {
                    ...defaultHeaders,
                    ...headers
                },
                data
            });
            resolve(await returnResponse(response));
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};