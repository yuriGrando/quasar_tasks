import axios from 'axios';
import { authOptions } from 'src/api/apikey-token';

export const instance = axios.create({
    baseURL: 'https://sys-dev.searchandstay.com/api/admin',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
});

export const requests = {

    get: (url) => instance.get(url, authOptions()),

    post: (url, body) => instance.post(url, body, authOptions()),

    delete: (url) => instance.delete(url, authOptions()),

    put: (url, body) => instance.put(url, body, authOptions()),
};
