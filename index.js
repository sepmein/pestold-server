'use strict';

/**
 * node internal
 * */

var path = require('path');

/**
 * npm modules
 * */

var koa = require('koa'),
    router = require('koa-router'),
    app = koa();

// settings
app.name = 'pestold';
app.env = process.env.NODE_ENV || 'development';

/**
 * mongoose
 * */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pestold');
var db = mongoose.connection;
db.on('error', function (err) {
    app.emit('error', new Error('db connect error: ', err));
});
db.once('open', function () {
    app.listen(4000);
    console.log('app started!');
});

//app.on('error', function (error) {
//    console.error(error);
//});

/**
 * require models
 */

var modelPath = path.join(__dirname, 'models');
require('fs').readdirSync(modelPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        require(path.join(modelPath, file));
    }
});

/**
 * router
 */

var allowAccessControl = require('./middlewares/allowCrossOrigin');
app.use(allowAccessControl);
app.use(router(app));
require('./controllers')(app);
