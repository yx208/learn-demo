import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../sql/sequelize'

class BookModel extends Model {}

BookModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    stock: DataTypes.INTEGER,
    previewImages: DataTypes.STRING(512),
    title: DataTypes.STRING(64),
    subTitle: DataTypes.STRING(256),
    author: DataTypes.STRING(64),
    pubDate: DataTypes.STRING(32),
    star: DataTypes.TINYINT,
    price: DataTypes.STRING,
    ebook: DataTypes.JSON,

    publisher: DataTypes.JSON,
    detailDescribe: DataTypes.JSON,
    feature: DataTypes.TEXT,
    relateGoods: DataTypes.JSON,
    abstract: DataTypes.TEXT,
    contentIntroduction: DataTypes.TEXT,
    authorIntroduction: DataTypes.TEXT,
    toc: DataTypes.TEXT,
    mediaFeedback: DataTypes.TEXT,
    preface: DataTypes.TEXT,
    extract: DataTypes.TEXT
}, {
    sequelize,
    modelName: 'Book'
})

export default BookModel
