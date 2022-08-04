const sequelize = require('../database/db')
const { Model, DataTypes } = require('sequelize')

class Article extends Model {}

Article.init({
    index: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        unique: true
    },
    author: DataTypes.STRING,
    pubdate: {
        type: DataTypes.BIGINT,
        defaultValue: DataTypes.NOW()
    },
    content: DataTypes.TEXT,
    category: {
        type: DataTypes.STRING,
        defaultValue: 'Note'
    },
    tags: {
        type: DataTypes.STRING,
        defaultValue: 'Note',
        set(val) {
            return typeof val === 'string' ? val : val.toString()
        },
        get(val) {
            return String(this.getDataValue(val)).split(',')
        }
    }
}, {
    sequelize,
    timestamps: true,
    tableName: 'article'
})

module.exports = Article
