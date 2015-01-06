/**
 * Created by Spencer on 14/12/29.
 */
'use strict';

var Organization = require('mongoose').model('Organization');

exports.get = function *() {
    let id = this.params.id;
    try{ let found = yield Organization.findById(id).exec();
        if(found){
            this.body = found;
        } else {
            this.status = 404;
            this.body = {
                message: 'Organization does not exist.'
            };
        }
    }
    catch (error){
        this.status = 400;
        this.body = {
            message: error.message
        };
    }
};

exports.add = function *() {
    let org = new Organization(this.request.body.organization);
    try {
        let saved = yield org.save();
        if(saved){
            this.body = {
                _id: saved._id
            };
        } else {
            this.status = 400;
            this.body = {
                message: 'Some Error occurred. Save failed.'
            };
        }
    } catch (error){
        this.status = 400;
        this.body = {
            message: error.message
        };
    }
};

exports.list = function *() {
    Organization.find({});
};
exports.listStaff = function *() {
    Organization.find({});
};
