'use strict';
/**
 * controller
 * */
var authentication = require('./authentication'),
    user = require('./user'),
    vec = require('./vec'),
    organization = require('./organization');

/*
 * middleware
 * */
var token = require('../middlewares/token'),
    parse = require('../middlewares/parseRequestBody');


function addController(app) {

    /**
     * authentication
     */
    app.post('/auth', parse, authentication.auth);
    app.post('/signup', parse, authentication.signup);

    /**
     * user
     */

    app.get('/user/:id', token.verify, user.get);

    /**
     * organization
     */

    app.get('/org/:id', organization.get);
    app.post('/org', parse, token.verify, organization.add);
    app.get('/org/list', organization.list);
    app.get('/org/:id/staff', organization.listStaff);

    /*
     * vec recipes
     * */

    app.get('/vec/recipes', vec.list);
    app.post('/vec/recipe', parse, token.verify, vec.add);
    app.get('/vec/recipe/:id', vec.get);
    app.post('/vec/recipe/:id', parse, token.verify, vec.modify);
    app.del('/vec/recipe/:id', token.verify, vec.delete);
}


// exports
module.exports = addController;
