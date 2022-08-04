
/**
 * @description 深拷贝
 * @param {Object} target 要深拷贝的对象
 * @return {Object} 处理好的对象
 */
function deepClone(target) {

    if (target === null) return null
    if (typeof target !== 'object') return target

    const type = getType(target) 
    let result

    if (type === 'Object') {
        result = {}
        for (let key in target) result[key] = target[key]

    } else if (type === 'Array') {
        result = []
        for (let key in target) result[key] = target[key]
    }

    return result
}

/**
 * @description 获取变量的类型
 * @param {any} param 要判断的变量
 * @return {String} 参数的类型
 */
function getType(param) {
    return Object.prototype.toString(param).match(/\s(.*)?]/)[1]
}

export {
    deepClone,
    getType
}
