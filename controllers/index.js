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

    /*
     * vec recipes
     * */

    app.get('/vec/recipes', vec.listRecipes);
    app.post('/vec/recipe', parse, token.verify, vec.createRecipe);
    app.get('/vec/recipe/:id', vec.getRecipe);
    app.post('/vec/recipe/:id', parse, token.verify, vec.modifyRecipe);
    app.del('/vec/recipe/:id', token.verify, vec.deleteRecipe);
}


// exports
module.exports = addController;
