import axios from 'axios'
import config from "./config"

const instance = axios.create({
    baseURL: config.baseURL,
    timeout: config.requestTimeout,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // 跨域
    withCredentials: true
})

// 请求拦截器
instance.interceptors.request.use(config => {
    return config
}, error => {
    console.log(error)
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
    return response.data
}, error => {
    if (!error.response.status) return null

    switch (error.response.status) {
        case 401:
            console.log('未登录')
            break
        case 403:
            console.log('登录过期，请重新登录')
            break
        case 404:
            console.log('网络请求不存在')
            break
        default:
            console.log(error.response)
    }

    return error.response.data
})

interface RequestConfig {
    url: string
    data?: object | null
    params: object | null
    method: 'GET' | 'POST'
}

interface HttpParams {
    url: string
    query?: object | null
    data?: object | null
    method: 'GET' | 'POST'
}

class Http {
    static request<T>(params: HttpParams) : Promise<T> {

        const config: RequestConfig = {
            url: params.url,
            method: params.method,
            params: null,
            data: null
        }

        if (params.method === 'POST') {
            config.data = params.data
        } else {
            config.params = params.query
        }

        return instance(config)
    }
}

export default Http
