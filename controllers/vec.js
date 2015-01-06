'use strict';

//app.get('/vec/recipes', vec.list);
//app.post('/vec/recipe', token.verify, vec.createRecipe);
//app.get('/vec/recipe/:id', vec.getRecipe);
//app.post('/vec/recipe/:id', token.verify, vec.modifyRecipe);
//app.del('/vec/recipe/:id', token.verify, vec.deleteRecipe);

var mongoose = require('mongoose'),
    Recipe = mongoose.model('Recipe');

// /vec/recipes
exports.list = function *(next) {
    this.body = yield Recipe.find({})
        .sort('-updatedAt')
        .exec();
    yield next;
};

// /vec/recipe
exports.add = function *(next) {
    let _id = this.validate._id;
    //TODO: add validate function.
    let recipe = new Recipe(this.request.body.recipe);
    recipe.createdBy = _id;

    try {
        yield recipe.save();
        this.status = 201;
        this.body = {
            message: 'Recipe created.'
        };
    } catch (error) {
        this.status = 400;
        this.body = {
            message: error.message
        };
    }
    yield next;
};

// /vec/recipe/:id
exports.get = function *(next) {
    console.log('get recipe called');
    let id = this.params.id;

    let found = yield Recipe.findById(id).exec();

    if (!found) {
        this.status = 404;
        this.body = {
            message: 'The recipe does not exist.'
        };
        return;
    }

    this.body = found;

    yield next;
};

exports.modify = function *(next) {
    let recipeId = this.params.id,
        userId = this.validate._id;

    let found = yield Recipe.findById(recipeId).exec();

    if (!found) {
        this.status = 404;
        this.body = {
            message: 'The recipe does not exist.'
        };
        return;
    }

    if (found.createdBy !== userId) {
        this.status = 403;
        this.body = {
            message: 'You are not authorized to modify the recipe.'
        };
        return;
    }

    try {
        //TODO add validate functions later
        var modified = yield Recipe.findByIdAndUpdate(recipeId, this.request.body).exec();
        //debug
        //TODO delete it later
        //console.log(modified);
        this.status = 200;
        this.body = {
            message: 'Modified successfully.'
        };
    } catch (error) {
        this.status = 400;
        this.body = {
            message: error.message
        };
    }

    yield next;
};

exports.delete = function *(next) {
    let recipeId = this.params.id,
        userId = this.validate._id;

    let found = yield Recipe.findById(recipeId).exec();

    if (!found) {
        this.status = 404;
        this.body = {
            message: 'The recipe does not exist.'
        };
        return;
    }

    if (found.createdBy !== userId) {
        this.status = 403;
        this.body = {
            message: 'You are not authorized to delete the recipe.'
        };
        return;
    }

    try {
        let removed = yield Recipe.remove().exec();
        //debug
        //TODO: remove it later
        //console.log('removed');
        console.log(removed);
        this.status = 200;
        this.body = {
            message: 'Removed successfully.'
        };
    }
    catch (error) {
        this.status = 400;
        this.body = {
            message: error.message
        };
    }
    yield next;

};
