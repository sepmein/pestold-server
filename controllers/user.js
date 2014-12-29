/**
 * Created by Spencer on 14/12/29.
 */
'use strict';

var User = require('mongoose').model('User');

exports.id = function*() {
    let user =
        yield User.findOne(this.validate.userName).exec();
    if (user) {
        delete user.password;
        if (user._id.toString() === this.params.id) {
            this.body = user;
        } else {
            this.throw(401, 'wrong token');
        }
    } else {
        this.throw(404, 'user not exist');
    }
};
