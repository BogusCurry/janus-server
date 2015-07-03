var fs = require('fs');
var splitca = require('split-ca');

module.exports = {
    /* Socket port to listen on */
    port: 5566,

    /* Web UI */
    webServer: 8080,

    /*Log Levels - default is "info"
     *  
     *  This setting controls all logging into
     *  the server.log file - other than the
     *  restart message which will ALWAYS show.
     *
     * "info" -> log info and error events
     * "error" -> log error events only
     * "silent" -> do not log at all
     *
     * debug, warn, fatal, error, http could be 
     * implemented as well, but not done yet*/
    logLevel: "info",
    
    /* SSL configurations */
    ssl: {
        port: 5567,
        options: {
            ca: splitca('cert/cabundle.pem'),
            key: fs.readFileSync('cert/server-key.pem'),
            cert: fs.readFileSync('cert/server-cert.pem'),
        }
    },

    /* Controls how many results a request for 'users_online' receives. */
    maxUserResults: 100, 

    /* MySQL database connection info for mysql-auth and mysql-userlist */
    MySQL_Hostname: 'localhost',
    MySQL_Database: 'janusvr',
    MySQL_Username: 'janusvr',
    MySQL_Password: 'janusvr',

    /* Authentication mode:
        'none'     - Will not attempt to authenticate users, 
                     anyone can connect with any unused userId.
        'optional' - Anyone can connect, but if userId has been registered
                     a password must be provided.
        'required' - Only users with userids and passwords are allowed to connect.
    */
    authMode: "optional",

    /* Plugins must be store in ./plugins to be loaded. */
    /* methodPlugins are called while parsing messages */
    methodPlugins: {  
        logon: { 
            plugins: [ "mysql-auth" ]
        },
    },

    /* intervalPlugins are called in intervals specified in seconds. */
    intervalPlugins: [
        { plugin: "mysql-userlist", interval: 5 }
    ],
};
