/* jshint laxcomma: true, laxbreak: true, node: true */
/**
 * FalconSocialTest app constant lib
 *
 * @author Peter Molnar <peter7012@icloud.com>
 */

var publishingPath  = '/api/publishing',
    chartPath       = '/api/chart';

function createCRUDPathObject(path) {
  return {
    CREATE: path,
    READ:   path,
    UPDATE: path + '/:id',
    DELETE: path + '/:id'
  }
}

module.exports = {

  STATUS: {
    OK: "OK"
  },

  PATHS: {

    HTTP_HOST: 'http://jsonblob.com',
    HTTP_PUBLISH_PATH: '/api/jsonBlob/5208ac13e4b002188ed03bdf',
    HTTP_DATA_PATH: '/api/jsonBlob/5208a709e4b002188ed03bdd',

    ROOT_PATH: publishingPath,
    PUBLISHING: createCRUDPathObject(publishingPath),
    CHART: chartPath
  },

  SOCKET_EVENTS: {
    PUBLISHING_GET: 'publishing:get',
    PUBLISHING_LOADED: 'publishing:loaded',
    CHART_GET: 'chart:get',
    CHART_LOADED: 'chart:loaded'
  }
};
