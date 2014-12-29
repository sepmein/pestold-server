/**
 * Created by Spencer on 14/12/29.
 */

'use strict';
var jwt = require('../lib/jwt');

exports.verify = function * (next) {
    let token = this.header.token;
    if (!token) {
        this.throw(401, 'unauthorized');
    } else {
        try {
            let validate = yield jwt.verify(token);
            this.validate = validate;
            yield next;
        }
        catch (e) {
            this.throw(401, e);
        }
    }
};
