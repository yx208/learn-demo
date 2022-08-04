const requireDirectory = require('require-directory')

const config = require('../config')

class InitManager {
    static initCore(app) {
        InitManager._app = app
        InitManager.initLoadRouter()
    }

    static initLoadRouter() {
        requireDirectory(module, config.routerPath, { visit: (router) => {
            InitManager._app.use(router.routes())
            InitManager._app.use(router.allowedMethods())
        }})
    }
}

module.exports = InitManager
