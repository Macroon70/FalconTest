'use strict';
/* jshint laxcomma: true, laxbreak: true, node: true */
/**
 * FalconSocialTest controllers.Publishing
 *
 * @author Peter Molnar <peter7012@icloud.com>
 * @module controller
 * @requires moment
 * @requires _
 */

var moment  = require('moment'),
    _       = require('underscore');

module.exports = function($scope, $location, $routeParams,  appConstants, PublishingService, PublishingFactory) {

  /**
   * Init
   */
  function init () {
    console.log('***Init Publishing Controller');
    if ($routeParams.id && !$scope.publishingService.isLoading) {
      setPublishingIndex($routeParams.id);
      PublishingFactory.read($scope.currentPublishing);
    } else {
      PublishingFactory.get();
    }
  }

  /**
   * @function setPublishingIndex
   * @description set the current publishing item's store value
   * @param id {string}
   */
  function setPublishingIndex (id) {
    $scope.currentPublishing = _.find($scope.publishingService.publishingData, function(data) {
      return data.id === id;
    });
  }

  $scope.currentPublishing = null;
  $scope.publishingService = PublishingService;
  $scope.moment = moment;

  /**
   * Watch the PublishingService.isLoading state
   */
  $scope.$watch(function () {
    return $scope.publishingService.isLoading;
  }, function (newValue) {
    if (!newValue && $routeParams.id) {
      setPublishingIndex($routeParams.id);
    }
  });

  /**
   * @function onSaveClick
   * @description Handle when user clicked on save button
   */
  $scope.onSaveClick = function () {
    PublishingFactory.update($scope.currentPublishing.serialize())
      .$promise.then(function (resp) {
        // TODO: add response to UI
        $location.path(appConstants.PATHS.PUBLISHING.READ);
      });
  };

  /**
   * @function onDeleteClick
   * @description Handle when user clicked on delete button
   */
  $scope.onDeleteClick = function () {
    PublishingFactory.delete($scope.currentPublishing.serialize())
      .$promise.then(function (resp) {
        // TODO: add response to UI
        $scope.publishingService.isLoading = true;
        $location.path(appConstants.PATHS.PUBLISHING.READ);
      });
  };

  /**
   * @function onDeleteClick
   * @description Handle when user clicked on new button
   */
  $scope.onNewClick = function () {
    $location.path(appConstants.PATHS.PUBLISHING.READ + '/' + PublishingService.add());
  };

  /**
   * @function onDeleteClick
   * @description Handle when user clicked on back button
   */
  $scope.onBackClick = function () {
    $scope.publishingService.isLoading = true;
    $location.path(appConstants.PATHS.PUBLISHING.READ);
  };

  /**
   * @function onDeleteClick
   * @description Handle when user clicked on a publish item
   */
  $scope.onPublishClick = function (id) {
    $scope.publishingService.isLoading = true;
    $location.path(appConstants.PATHS.PUBLISHING.READ + '/' + id);
  };

  init()
};