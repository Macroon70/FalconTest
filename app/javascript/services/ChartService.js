'use strict';
/* jshint laxcomma: true, laxbreak: true, node: true */
/**
 * FalconSocialTest services.Chart
 *
 * @author Peter Molnar <peter7012@icloud.com>
 * @module service
 */

module.exports = function ($rootScope, socket, appConstants) {

  var _this = this;

  var status        = appConstants.STATUS,
      socketEvents  = appConstants.SOCKET_EVENTS,
      nameSpace     = 'ChartService';

  /**
   * Init
   */
  function init () {
    socket.on(nameSpace, appConstants.SOCKET_EVENTS.CHART_LOADED, onDataLoaded);
    socket.emit(socketEvents.CHART_GET);
  }

  /**
   * @function onDataLoaded
   * @description parse response data
   * @private
   * @param {object} data
   */
  function onDataLoaded (data) {
    _this.isLoading = false;
    console.log('New chart data:', data);
     if (data.status === status.OK) {
       _this.chartData = data.response;
     }
  }

  _this.chartData = [];
  _this.isLoading = true;

  /**
   * @function get
   * @description Emit get event
   */
  _this.get = function () {
    socket.emit(socketEvents.CHART_GET);
  };

  init();
};