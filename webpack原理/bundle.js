const fs = require('fs')
const path = require('path')

const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const getModuleInfo = (file) => {
    const body = fs.readFileSync(file, 'utf-8')
    // 将我们提供的代码解析成完整的ECMAScript代码的AST。
    const ast = parser.parse(body, {
        sourceType: 'module',   // 表示解析的是ES模块
    })

    // 现在我们需要 遍历AST，将用到的依赖收集起来。什么意思呢？
    // 其实就是将用import语句引入的文件路径收集起来。我们将收集起来的路径放到deps里。
    const deps = {}
    // 第一个参数就是AST。第二个参数就是配置对象
    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(file)
            const abspath = './' + path.join(dirname, node.source.value)

            deps[node.source.value] = abspath
        }
    })

    // 把获得的ES6的AST转化成ES5
    // 将我们传入的AST转化成我们在第三个参数里配置的模块类型
    const { code } = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })

    // 把该模块的路径，依赖，转换成es5的代码return出去
    const moduleInfo = { file, deps, code }
    return moduleInfo
}

// 转换模块
const parseModules = (file) => {

    // 获取主模块信息
    const entry = getModuleInfo(file)

    // 将获得的模块信息放到temp数组里。
    const temp = [entry]
    const depsGraph = {}

    // 外面的循坏遍历temp数组，此时的temp数组只有主模块
    for (let i = 0; i < temp.length; i++) {
        const deps = temp[i].deps

        // 循环里面再获得主模块的依赖deps
        if (deps) {
            for (const key in deps) {
                if (deps.hasOwnProperty(key)) {
                    temp.push(getModuleInfo(deps[key]))
                }
            }
        }
    }

    temp.forEach(moduleInfo => {
        depsGraph[moduleInfo.file] = {
            deps: moduleInfo.deps,
            code: moduleInfo.code
        }
    })

    return depsGraph
}

const bundle = (file) => {

    // 获取到 depsGraph，转成字符串
    const depsGraph = JSON.stringify(parseModules(file))

    // 把保存下来的depsGraph，传入一个立即执行函数
    return `(function(graph) {
        // 将主模块路径传入require函数执行
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath])
            }
            
            const exports = {}

            // 执行reuire函数的时候，又立即执行一个立即执行函数，这里是把code的值传进去了
            ;(function (require, exports, code) {
                // 执行代码
                eval(code)
            })(absRequire, exports, graph[file].code)

            return exports
        }

        require('${file}')
    })(${depsGraph})`
}

const content = bundle('./src/index.js')


fs.mkdirSync('./dist')
fs.writeFileSync('./dist/bundle.js', content)

// index.js
// "use strict";
// var _add = _interopRequireDefault(require("./add.js"));
// var _minus = require("./minus.js"); 
// function _interopRequireDefault(obj) { 
//     return obj && obj.__esModule ? obj : { "default": obj }; 
// }
// var sum = (0, _add["default"])(1, 2);
// var division = (0, _minus.minus)(2, 1);
// console.log(sum);
// console.log(division);
// ---------------------------
// add.js
// "use strict"
// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports["default"] = void 0;
// var _default = function _default(a, b) {
//   return a + b;
// };
// exports["default"] = _default;
// ---------------------------
// minus.js
// "use strict";
// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.minus = void 0;
// var minus = function minus(a, b) {
//   return a - b;
// };
// exports.minus = minus;

