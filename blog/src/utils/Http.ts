import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { network } from './config';

const instance = axios.create({
    baseURL: network.baseURL,
    timeout: network.timeout
});

instance.interceptors.request.use(config => {
    return config;
}, err => {
    console.log('<Request reject error> => ', err);
    return Promise.reject(err);
});

instance.interceptors.response.use(response => {
    return response.data;
}, err => {
    console.log('<Response reject error> => ', err);
    return Promise.reject(err);
});

interface PostData {
    [key: string]: any
}

class Http {

    private static instance: AxiosInstance = instance;

    static request<T>(config: AxiosRequestConfig) : Promise<T> {
        return this.instance<T>(config);
    }

    static get<T>(url: string, query: object = null) : Promise<T> {
        return this.instance<T>({
            url,
            method: 'GET',
            params: query,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static post<T>(url: string, data: PostData) : Promise<T> {

        const formData = new FormData();

        const keys = Object.keys(data);
        keys.forEach(key => formData.append(key, data[key]));

        return this.instance<T>({
            url,
            data: formData,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

}

export default Http;
