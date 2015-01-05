/**
 * Created by Spencer on 14/12/30.
 */

'use strict';

module.exports = function*(next) {
    //console.log('access control called');
    this.set('Access-Control-Allow-Origin', '*');
    this.set('Access-Control-Allow-Methods', 'GET, POST');
    this.set('Access-Control-Allow-Headers', 'content-type, Authorization');
    yield next;
};
