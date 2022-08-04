
/**
 * 0	OK, 成功
 * 1000 未知错误
 * 1001	输入的json格式不正确
 * 1002	找不到资源
 * 1003	输入参数错误
 * 1004	禁止访问
 * 1006	服务器内部错误
 * 1007 token 过期
 * 
 * 2000 服务器连接失败
 * 
 * 3000 禁止注册
 */

const config = {
    port: 3000,
    environment: 'dev',
    registerable: false,
    routerPath: `${process.cwd()}/src/api`,
    db: {
        user: 'root',
        password: '*',
        port: 3306,
        host: 'localhost',
        database: 'blog'
    },
    security: {
        secretKey: '*',
        expiresIn: 60 * 60 * 60
    }
}

module.exports = config
