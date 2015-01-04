/**
 * Created by Spencer on 15/1/4.
 */

'use strict';
var parse = require('co-body');

module.exports = function *(next) {
    this.request.body = yield parse(this);
    yield next;
};
