const env = import.meta.env.MODE;
const isDevelopment = env === 'development';

const baseHost = isDevelopment ? 'https://192.168.47.104:8443' : 'https://';

const network = {
    baseURL: baseHost + '/api/v1',
    timeout: 8000
}

export {
    network
}
