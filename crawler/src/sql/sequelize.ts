import { Sequelize } from 'sequelize'
import config from "../config/config"

const sequelize = new Sequelize({
    dialect: 'mysql',
    username: config.db.userName,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    port: config.db.port,
    timezone: '+08:00',
    logging: false,
    define: {
        timestamps: true,
        createdAt: 'CreatedAt',
        updatedAt: 'UpdateAt',
        deletedAt: 'DeleteAt',
        paranoid: true,
        underscored: true
    }
})

;(async () => {
    await sequelize.sync({ force: false })
})()

export {
    sequelize
}
