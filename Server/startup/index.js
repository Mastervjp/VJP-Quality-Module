const config = require("./../config");

let configExport = {};

configExport.dbConfig = {
    'username': config.username,
    'password': config.password,
    'database': config.db,
    'host': config.dbhost,
    'dialect': 'mysql',
    //logging: false,
    define: {
        timestamps: false
    }
}


module.exports = configExport