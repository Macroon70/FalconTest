'use strict';

var app = require('angular').module('testApp');

app.factory('socket',  require('./SocketFactory'));
app.factory('PublishingFactory', require('./PublishFactory').publishReadCreate);
app.factory('PublishingFactory', require('./PublishFactory').publishReadUpdateDelete);
app.factory('d3Service', require('./d3Factory'));
app.service('ChartService', require('./ChartService'));
app.service('PublishingService', require('./PublishingService'));