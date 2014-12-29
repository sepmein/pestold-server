/**
 * Created by Spencer on 14/12/29.
 */
'use strict';

var parse = require('co-body'),
    User = require('mongoose').model('User'),
    bcrypt = require('../lib/bcrypt'),
    jwt = require('jsonwebtoken'),
    secret = process.env.JWT_SECRET || require('../config/secret');

exports.auth = function*() {
    let requestBody =
        yield parse(this);

    let userName = requestBody.userName,
        password = requestBody.password;

    let context = this;

    let found =
        yield User.findOne({
            userName: userName
        }).exec()
            .on('err', function (e) {
                context.throw(500, e);
            });

    if (found) {
        console.log(bcrypt.compare);
        try {
            var same = yield bcrypt.compare(password, found.password);
            if (same) {
                this.body = jwt.sign({
                    userName: userName
                }, secret, {
                    expiresInMinutes: '60 * 2'
                });
            } else {
                this.throw(401, 'password not match');
            }
        } catch (e) {
            console.error(e);
            this.throw(500, e);
        }

    } else {
        this.throw(401, 'User not exist');
    }
};

exports.signup = function*() {
    var requestBody =
        yield parse(this);
    var user = new User({
        userName: requestBody.userName,
        password: requestBody.password
    });

    // use jwt to generate token
    user.token = jwt.sign(requestBody, secret);

    try {
        yield user.save();
        this.body = user.token;
    }
    catch (error) {
        this.throw(400, error);
    }
};


