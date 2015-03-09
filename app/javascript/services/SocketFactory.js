'use strict';
/* jshint laxcomma: true, laxbreak: true, node: true */
/**
 * FalconSocialTest services.SocketFactory
 *
 * @author Peter Molnar <peter7012@icloud.com>
 * @module service
 *
 * @requires io
 * @requires _
 */

var io  = require('socket.io-client'),
    _   = require('underscore');

module.exports = function ($rootScope) {
  var socket            = io.connect(),
      subscribedEvents  = {};

  return {
    /**
     * @description subscribe to IO event
     * @param {string}  nameSpace
     * @param {string}  eventName
     * @param {*}       cb
     */
    on: function (nameSpace, eventName, cb) {
      var eventNameSpace = nameSpace+":"+eventName;
      var event = _.find(subscribedEvents, function (_eventDetails, _eventNameSpace) {
        return _eventNameSpace === eventNameSpace;
      });
      if (event) {
        socket.removeAllListeners(event._eventName);
        delete subscribedEvents[eventNameSpace];
      }
      socket.on(eventName, function () {
        var args = arguments;
        subscribedEvents[eventNameSpace] ={
          _eventName: eventName,
          _cb: cb
        };
        $rootScope.$apply(function () {
          cb.apply(socket, args);
        });
      });
    },
    /**
     * @description emit IO event
     * @param {string}  eventName
     * @param {*}       data
     * @param {*}       cb
     */
    emit: function (eventName, data, cb) {
      socket.emit(eventName, data, function () {
        var arg = arguments;
        $rootScope.$apply(function () {
          if (cb) {
            cb.apply(socket, args);
          }
        })
      })
    },
    /**
     * @description unsubscribe IO event
     * @param {string} eventName
     */
    off: function (eventName) {
      socket.removeAllListeners(eventName);
    }
  }
};