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

//double check the db connection.
app.use(function*(next) {
    if (db) {
        this.db = db;
        yield next;
    } else {
        this.status = 500;
        this.body = {
            message: '服务器数据库无法连接'
        };
    }
});

app.on('error', function (error) {
    console.error(error);
});

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

app.use(router(app));

require('./controllers')(app);
