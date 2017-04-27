var configs = {};
configs.applicationPort = process.env.PORT || 3000;;
configs.dbName = 'VideoPortal';
configs.dbHost = 'mongodb://yourmlabname:yourpassword@ds153400.mlab.com:53400/videoportal';


module.exports = configs;