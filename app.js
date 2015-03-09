/* jshint laxcomma: true, laxbreak: true, node: true, expr: true */
/**
 * FalconSocialTest server
 *
 * @author Peter Molnar <peter7012@icloud.com>
 * @module server
 * @requires express
 * @requires SocketIO
 * @requires http
 * @requires bodyParser
 * @requires _
 *
 * @requires app/constants/AppConstants
 */

var app_root            = __dirname + '/public',
  http                = require('follow-redirects').http,
  SocketIO            = require('socket.io'),
  express             = require('express'),
  bodyParser          = require('body-parser'),
  _                   = require('underscore'),
  SocketEvents        = require('./app/constants/AppConstants').SOCKET_EVENTS,
  AppPaths            = require('./app/constants/AppConstants').PATHS;

// Init
var app = express(),
  io = SocketIO.listen(app.listen(3000));

app.use(express.static(app_root));
app.use(bodyParser.json());

// Dummy test property to store publishing data
var publishing = null,
    randInterval = null,
    chartData = null;

/**
 * @function get_req
 * @description make "GET" request
 * @private
 * @param url {string} requested url string
 * @param cb  {object} callback
 */
function get_req(url, cb) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      cb({
        data: data,
        error: null
      });
    });
  }).on("error", function (_error) {
    cb({
      data: null,
      error: _error
    })
  })
}

// Routes
app.get(AppPaths.PUBLISHING.READ, function (req, res) {
  getPublishingData();
  res.sendFile('index.html', { root: app_root });
});

app.get(AppPaths.PUBLISHING.UPDATE, function (req, res) {
  if (publishing) {
    var publishIndex = _.findIndex(publishing.response, function (content) {
      return content.id ===  req.body.id;
    });
    if (!publishIndex) {
      res.redirect(AppPaths.ROOT_PATH);
    }
  } else {
    res.redirect(AppPaths.ROOT_PATH);
  }
  getPublishingData();
  res.sendFile('index.html', { root: app_root });
});

app.get(AppPaths.CHART, function (req, res) {
  res.sendFile('index.html', { root: app_root });
});

app.get('*', function (req, res) {
  res.redirect(AppPaths.ROOT_PATH);
});

app.put(AppPaths.PUBLISHING.UPDATE, function (req, res) {

  console.log('Update Publish', req.params);
  if (req.params.id) {
    var publishIndex = _.findIndex(publishing.response, function (content) {
      return content.id ===  req.params.id;
    });

    if (publishIndex === -1) {
      publishing.response.push(req.body);
    } else {
      publishing.response[publishIndex] = req.body;
    }
    res.status(200).send({
      status: req.params.id + ' - Publish succesfully updated'
    });
  } else {
    res.status(500).send('Invalid id param');
  }
  getPublishingData();
});

app.delete(AppPaths.PUBLISHING.DELETE, function (req, res) {

  console.log('Delete Publish', req.params);
  if (req.params.id) {
    var publishIndex = _.findIndex(publishing.response, function (content) {
      return content.id ===  req.params.id;
    });

    if (publishIndex === -1) {
      res.status(500).send('Invalid Publish id');
    } else {
      publishing.response.splice(publishIndex,1);
    }
    res.status(200).send({
      status: req.params.id + ' - Publish succesfully deleted'
    });
  } else {
    res.status(500).send('Invalid id param');
  }
  getPublishingData();
});

/**
 * @function getPublishingData
 * @description make request to get publishing data then emit the client when it's done
 */
function getPublishingData () {
  console.log(SocketEvents.PUBLISHING_GET);
  if (!publishing) {
    get_req(AppPaths.HTTP_HOST + AppPaths.HTTP_PUBLISH_PATH, function (response) {
      if (!response.error) {
        console.log(SocketEvents.PUBLISHING_LOADED, response);
        publishing = JSON.parse(response.data);
        io.sockets.emit(SocketEvents.PUBLISHING_LOADED, publishing);
      }
    });
  } else {
    io.sockets.emit(SocketEvents.PUBLISHING_LOADED,publishing);
  }
}

/**
 * @function getChartData
 * @description make request to get chart data then emit the client when it's done
 */
function getChartData () {
  console.log(SocketEvents.CHART_GET);
  get_req(AppPaths.HTTP_HOST + AppPaths.HTTP_DATA_PATH, function (response) {
    if (!response.error) {
      console.log(SocketEvents.CHART_LOADED);
      chartData = JSON.parse(response.data);
      if (!randInterval) {
        randInterval = setInterval(createDummyChartData, 15000);
      }
      io.sockets.emit(SocketEvents.CHART_LOADED, JSON.parse(response.data));
    }
  });
}

// IO connections
io.on('connection', function (socket) {

  socket.on(SocketEvents.PUBLISHING_GET, function () {
    getPublishingData();
  });

  socket.on(SocketEvents.CHART_GET, function () {
    getChartData();
  });

});

// Dummy data testing for Chart data
function createDummyChartData () {

  function generateRange () {
    return Math.floor(Math.random() * (maxRange-minRange) + minRange);
  }

  function generateChartObject () {
    return {
      value: Math.floor(Math.random() * maxValue),
      timestamp: date
    }
  }

  var minRange = 70,
      maxRange = 128,
      date = new Date(),
      maxValue = 128000,
      newResponse = [];

  for (var i = 0; i <= generateRange(); i++) {
    newResponse.push({
      'post_impressions': [generateChartObject()],
      'post_impressions_organic': [generateChartObject()],
      'post_impressions_paid': [generateChartObject()],
      'post_impressions_viral': [generateChartObject()]
    });
  }

  chartData.response = newResponse;
  io.sockets.emit(SocketEvents.CHART_LOADED, chartData);
}

console.log(new Date(), " - Server is up and running on port 3000");