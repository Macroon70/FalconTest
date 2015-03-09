'use strict';
/* jshint laxcomma: true, laxbreak: true, node: true */
/**
 * FalconSocialTest services.PublishService
 *
 * @author Peter Molnar <peter7012@icloud.com>
 * @module service
 */

module.exports = function ($rootScope, socket, appConstants, PublishingModel, PublishingFactory) {

  var _this = this;

  var status        = appConstants.STATUS,
      socketEvents  = appConstants.SOCKET_EVENTS,
      nameSpace     = 'PublishingService';

  /**
   * Init
   */
  function init () {
    socket.on(nameSpace, socketEvents.PUBLISHING_LOADED, _onDataLoaded);
  }

  /**
   * @function onDataLoaded
   * @description parse response data
   * @private
   * @param {object} data
   */
  function _onDataLoaded (data) {
    _this.isLoading = false;
    console.log('New publishing data:', data);
    if (data.status === status.OK) {
      _this.publishingData.length = 0;
      for (var i=0; i < data.response.length; i++) {
        _this.publishingData.push(new PublishingModel(data.response[i]))
      }
    }
  }


  _this.publishingData = [];
  _this.isLoading = true;

  /**
   * @function add
   * @description add new publish item to the list
   * @returns {*}
   */
  _this.add = function () {
    var newPublish = new PublishingModel();
    newPublish.isNew = true;
    _this.publishingData.push(newPublish);
    return newPublish.id;
  };

  init();
};