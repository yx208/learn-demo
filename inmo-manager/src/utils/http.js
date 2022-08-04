import axios from 'axios'
import config from './config'

axios.defaults.baseURL = config.baseURL

axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.reject(error)
})

class Http {

    get(url, config = {}) {
        return axios.get(url, config)
    }

    post(url, data, config) {
        return axios.post(url, data, config)
    }

    delete(url, config) {
        return axios.delete(url, config)
    }

    put(url, data, config) {
        return axios.put(url, data, config)
    }


    

    static setStorage(key, value) {
        localStorage.setItem(key, value)
    }

    static getStorage(key) {
        return localStorage.getItem(key)
    }

    static removeStorage(key) {
        localStorage.removeItem(key)
    }

}


export default Http
