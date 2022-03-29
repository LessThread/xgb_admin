
// import {camelizeKeys} from 'humps'


let API_ROOT = 'http://120.48.17.78:8080/api';

export const fetchApi = (apiPath, request = {}) => {
    const fullUrl = `${API_ROOT}/${apiPath}`;
    const { headers, body, method } = request;
    let customRequest = {};

    if (method) {
        customRequest.method = method.toUpperCase();
    }
    if (body) {
        customRequest.body = body;
    }
    if (headers) {
        const { contentType, auth } = headers;
        customRequest.headers = {};

        if (contentType) {
            customRequest.headers['Content-Type'] = contentType;
        }
        if (auth) {
            customRequest.headers['Authentication'] = auth;
        }
    }
    return fetch(fullUrl, customRequest)
};

