/**
 * Created by Spencer on 14/12/29.
 */

'use strict';
var jwt = require('../lib/jwt');

exports.verify = function * (next) {
    let bearer = this.header.authorization;
    let token = bearer.split(' ')[1];
    if (!token) {
        this.status = 401;
        this.body = {message: 'unauthorized, required token'};
    } else {
        try {
            let validate = yield jwt.verify(token);
            this.validate = validate;
            yield next;
        }
        catch (e) {
            this.status = 401;
            this.body = {message: e.message};
        }
    }
};
