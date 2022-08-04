import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class Http {

    private instance: AxiosInstance

    constructor(baseURL: string) {
        this.instance = axios.create({ baseURL })

        this.instance.interceptors.request.use((config: AxiosRequestConfig) : AxiosRequestConfig => {
            return config
        })

        this.instance.interceptors.response.use((response: AxiosResponse) => {
            return response.data
        })
    }

    protected get<T>(url: string, config ?: AxiosRequestConfig | undefined) : Promise<T> {
        return this.instance.get<T>(url, config)
    }

}

export default Http
