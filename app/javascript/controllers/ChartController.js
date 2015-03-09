'use strict';
/* jshint laxcomma: true, laxbreak: true, node: true */
/**
 * FalconSocialTest controllers.Chart
 *
 * @author Peter Molnar <peter7012@icloud.com>
 * @module controller
 */

module.exports = function($scope, ChartService) {

  function init () {
    console.log('***Init Chart Controller');
  }

  $scope.chartService = ChartService;

  init();
};