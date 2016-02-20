if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'DEV' }
var Config = require('config-js');
var config = new Config('config/app_##.js');

exports.get = (key) => {
    return config.get(key);
};