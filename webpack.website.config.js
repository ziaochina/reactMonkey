var config = require('./webpack.config.js');

config.output.path = __dirname + '/../publish/website/dist',
//config.output.path = "D:/Chanjet/TPlusPro/WebSite/dist";
config.output.publicPath = '/tplus/dist/',
module.exports = config;
