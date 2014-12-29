/**
 * Created by Spencer on 14/12/29.
 */

'use strict';

var bcrypt = require('bcrypt');

exports.compare = function compare(password, hash) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, hash, function (err, same) {
            if (err) {
                reject(err);
            } else {
                resolve(same);
            }
        });
    });
};

exports.genSalt = function genSalt(step) {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(step, function (err, salt) {
            if (err) {
                reject(err);
            } else {
                resolve(salt);
            }
        });
    });
};

exports.hash = function hash(password, salt) {
    return new Promise(function (resolve, reject) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};

