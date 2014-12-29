/**
 * Created by Spencer on 14/12/29.
 */

'use strict';

var jwt = require('jsonwebtoken'),
    secret = process.env.JWT_SECRET || require('../config/secret');

exports.verify = function (jwtString) {
    return new Promise(function (resolve, reject) {
        jwt.verify(jwtString, secret, function (err, decoded) {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
};
