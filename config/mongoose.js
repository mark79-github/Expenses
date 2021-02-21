const mongoose = require('mongoose');
const config = require('./config');
const {msg} = require('./constants');

const dbConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}

mongoose.connect(config.DB, dbConnectionOptions)
    .then((res) => console.log(msg.DB_CONNECTED(res.connections[0].host, res.connections[0].name, config.PORT)))
    .catch(console.warn.bind(console, msg.DB_CONNECTION_ERROR));

module.exports = mongoose.connection;