/**
 * Created by Spencer on 14/12/29.
 */
'use strict';

var User = require('mongoose').model('User'),
    bcrypt = require('../lib/bcrypt'),
    jwt = require('jsonwebtoken'),
    secret = process.env.JWT_SECRET || require('../config/secret');

exports.auth = function*() {
    let userName = this.request.body.userName,
        password = this.request.body.password;

    let found =
        yield User.findOne({
            userName: userName
        }).exec();

    if (found) {
        try {
            var same = yield bcrypt.compare(password, found.password);
            if (same) {
                this.body = jwt.sign({
                    userName: userName,
                    _id: found._id
                }, secret);
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
    let userName = this.request.body.userName,
        password = this.request.body.password;

    let existed = yield User.findOne({userName: userName}).exec();

    if (existed) {
        this.status = 403;
        this.body = {message: 'user already existed'};
        return;
    }

    let user = new User({
        userName: userName,
        password: password
    });

    try {
        let saved = yield user.save();
        // use jwt to generate token
        let token = jwt.sign({
            userName: userName,
            _id: saved._id
        }, secret);
        this.status = 201;
        this.body = {
            userName: userName,
            token: token
        };
    }
    catch (error) {
        this.status = 400;
        this.body = {message: error.message};
    }
};


