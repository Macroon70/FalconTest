"use strict";
/* jshint laxcomma: true, laxbreak: true, node: true */
/**
 * FalconSocialTest services.PublishFactory
 *
 * @author Peter Molnar <peter7012@icloud.com>
 * @module service
 */

/**
 * @function PublishReadCreate
 * @description set publishing list CRUD
 * @returns {*}
 * @constructor
 */
var PublishReadCreate = function ($resource, appConstants) {
  return $resource(appConstants.PATHS.PUBLISHING.READ, {}, {
    get: { method: 'GET', isArray: false },
    create: { method: 'POST' }
  })
};

/**
 * @function PublishReadUpdateDelete
 * @description set publish item CRUD
 * @returns {*}
 * @constructor
 */
var PublishReadUpdateDelete = function ($resource, appConstants) {
  return $resource(appConstants.PATHS.PUBLISHING.UPDATE, {}, {
    read: { method: 'GET', params: { id: '@id'} },
    update: { method: 'PUT' ,params: { id: '@id' }},
    delete: { method: 'DELETE', params: { id: '@id' }}
  })
};

module.exports = {
  publishReadCreate: PublishReadCreate,
  publishReadUpdateDelete: PublishReadUpdateDelete
};