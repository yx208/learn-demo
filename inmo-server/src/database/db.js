const { Sequelize, Model } = require('sequelize')
const { db } = require('../config')

const sequelize = new Sequelize({
    dialect: 'mysql',
    username: db.user,
    password: db.password,
    database: db.database,
    port: db.port,
    host: db.host,
    timezone: '+08:00',
    logging: false,
    define: {
        timestamps: true,
        paranoid: true,
        createdAt: "CreatedAt",
        updatedAt: "UpdatedAt",
        deletedAt: "DeletedAt",
        underscored: true
    },
})

sequelize.sync({ force: false })

module.exports = sequelize
