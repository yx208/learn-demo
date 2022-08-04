const { Schema, SchemaTypes } = require('mongoose');
const db = require('../db/mongo');

const articleSchema = new Schema({
    name: SchemaTypes.String,
    path: SchemaTypes.String,
    category: SchemaTypes.String,
    tags: [SchemaTypes.String],
    type: SchemaTypes.Number,
    cover: SchemaTypes.String
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
});

const ArticleModel = db.model('Article', articleSchema, 'Article');

module.exports = ArticleModel;
