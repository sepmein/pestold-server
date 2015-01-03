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

    let found =
        yield User.findOne({
            userName: userName
        }).exec();

    if (found) {
        try {
            var same = yield bcrypt.compare(password, found.password);
            if (same) {
                this.body = jwt.sign({
                    userName: userName
                }, secret, {
                    expiresInMinutes: '60 * 2'
                });
            } else {
                //console.log('password not match');
                this.status = 401;
                this.body = {message: 'password not match'};
            }
        } catch (e) {
            console.log('bcrypt compare failed: ', e);
            //this.throw(500, e);
            this.status = 500;
            this.body = {message: 'Server Error: bcrypt compare error'};
        }

    } else {
        this.status = 401;
        this.body = {message: 'User not exist'};
    }
};

exports.signup = function*() {
    let requestBody =
        yield parse(this);

    let existed = yield User.findOne({userName: requestBody.userName}).exec();

    if (existed) {
        this.status = 403;
        this.body = {message: 'user already existed'};
        return;
    }

    let user = new User({
        userName: requestBody.userName,
        password: requestBody.password
    });

    // use jwt to generate token
    user.token = jwt.sign(requestBody, secret);

    try {
        yield user.save();
        this.status = 201;
        this.body = {
            userName: requestBody.userName,
            token: user.token
        };
    }
    catch (error) {
        this.status = 400;
        this.body = {message: error.message};
    }
};


