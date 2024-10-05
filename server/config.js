var fs = require('fs');
var parseString = require('xml2js').parseString;

var config = {

    jwt_secret: process.env.JWT_SECRET,

}

module.exports = config;