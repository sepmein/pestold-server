'use strict';
/**
 * controller
 * */
var authentication = require('./authentication'),
    user = require('./user'),
    organization = require('./organization');

/*
 * middleware
 * */
var token = require('../middlewares/token');


function addController(app) {

    /**
     * authentication
     */
    app.post('/auth', authentication.auth);

    app.post('/signup', authentication.signup);

    /**
     * user
     */

    app.get('/user/:id', token.verify, user.id);

    /**
     * organization
     */

//app.get('/org/:id');
//
//app.post('/org');
//
//app.get('/org/list');
//
//app.get('/org/:id/staff');


}


// exports
module.exports = addController;
