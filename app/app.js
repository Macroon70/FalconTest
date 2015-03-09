'use strict';
/* jshint laxcomma: true, laxbreak: true, node: true */
/**
 * FalconSocialTest app
 *
 * @author Peter Molnar <peter7012@icloud.com>
 * @requires angular
 * @requires constants/AppConstants
 */

var angular       = require('angular'),
  AppConstants  = require('./constants/AppConstants');

/**
 * App holder
 */
var app = angular.module("testApp", [require('angular-route'), require('angular-resource')], function ($locationProvider) {
  $locationProvider.html5Mode(true);
});

app
  // Set app constants
  .constant('appConstants', AppConstants)
  // routes
  .config(['$routeProvider', 'appConstants', function ($routeProvider, appConstants) {
    $routeProvider
      .when(appConstants.PATHS.PUBLISHING.READ, {
        templateUrl: 'views/publishingList.html',
        controller: 'publishingCtrl'
      })
      .when(appConstants.PATHS.PUBLISHING.UPDATE, {
        templateUrl: 'views/publishing.html',
        controller: 'publishingCtrl'
      })
      .when(appConstants.PATHS.CHART, {
        templateUrl: 'views/chart.html',
        controller: 'chartCtrl'
      })
      .otherwise(appConstants.PATHS.PUBLISHING.READ);
  }]);

// load dependecies
require('./javascript/controllers');
require('./javascript/services');
require('./javascript/directives');
require('./javascript/models');



