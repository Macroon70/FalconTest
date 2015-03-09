'use strict';
/* jshint laxcomma: true, laxbreak: true, node: true */
/**
 * FalconSocialTest models.Publishing
 *
 * @author Peter Molnar <peter7012@icloud.com>
 * @module model
 */
module.exports = function () {

  var VALID_CHARS = '0123456789abcdefghijklmnopqrstuvwxyz',
    ID_LENGTH   = 32;

  /**
   * @function randomString
   * @description Generate UID
   * @param length  {number} UID length
   * @param chars   {string} UID valid chars
   * @returns {string}
   */
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }

  return function (data) {

    var _this = this;

    /**
     * @function sanitize
     * @description sanitize data
     * @private
     * @param {object} data
     * @returns {*|{}}
     */
    function sanitize (data) {

      var newId = randomString(ID_LENGTH, VALID_CHARS);

      data                         = data                          || {};
      _this.id                     = data.id                       || newId;
      _this.status                 = data.status                   || 'draft';
      _this.scheduled              = data.scheduled                || new Date();
      data.content                 = data.content                  || {};
      _this.content                = data.content                  || {};
      _this.content.message        = data.content.message          || '';
      _this.content.id             = data.content.id               || newId;
      _this.content.network        = data.content.network          || '';
      _this.content.postType       = data.content.postType         || '';
      data.content.media           = data.content.media            || {};
      _this.content.media          = data.content.media            || {};
      _this.content.media.fileName = data.content.media.fileName   || '';
      _this.content.media.url      = data.content.media.url        || '';
      _this.tags                   = data.tags                     || [];
      _this.channels               = data.channels                 || [];
      data.geo                     = data.geo                      || {};
      _this.geo                    = data.geo                      || {};
      _this.geo.countries          = data.geo.countries            || [];
      _this.geo.languages          = data.geo.languages            || [];
      _this.geo.cities             = data.geo.cities               || [];
      _this.geo.regions            = data.geo.regions              || [];

      return data;
    }

    /**
     * @function parse
     * @description parse data
     * @private
     * @param {object} data
     */
    function parse (data) {
      sanitize(data);
    }

    /**
     * @function serialize
     * @description serialize data
     * @public
     * @return {object}
     */
    _this.serialize = function () {
      return {
        id:         _this.id,
        status:     _this.status,
        scheduled:  _this.scheduled,
        content:    _this.content,
        tags:       _this.tags,
        channels:   _this.channels,
        geo:        _this.geo
      };
    };

    parse(data);
  };
};