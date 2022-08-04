(function(graph) {
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

        require('./src/index.js')
    })({"./src/index.js":{"deps":{"./add.js":"./src/add.js","./minus.js":"./src/minus.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _minus = require(\"./minus.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar sum = (0, _add[\"default\"])(1, 2);\nvar division = (0, _minus.minus)(2, 1);\nconsole.log(sum);\nconsole.log(division);"},"./src/add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _default = function _default(a, b) {\n  return a + b;\n};\n\nexports[\"default\"] = _default;"},"./src/minus.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.minus = void 0;\n\nvar minus = function minus(a, b) {\n  return a - b;\n};\n\nexports.minus = minus;"}})