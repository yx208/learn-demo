const mongoose = require('mongoose');
const { dataBase } = require('../config/config');

const db = mongoose.createConnection(dataBase.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db.on('error', () => {
    console.error('connection error');
});
db.once('open', () => {
    console.log('connected mongodb');
});

module.exports = db;
