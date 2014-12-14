/**
 * koa.js
 * */

var koa = require('koa'),
  app = koa();

var koaStatic = require('koa-static');

/**
 * mongodb
 * */

var client = require('mongodb').MongoClient,
  db;

/**
 * node internal
 * */

var path = require('path');

client.connect("mongodb://localhost:27017/pestold", function(err, dbInstance) {
  if (!err) {
    db = dbInstance;
  } else {
    app.emit('error', new Error('db connect error: ', err));
  }
});

//double check the db connection.
app.use(function*(next) {
  if (db) {
    this.db = db;
    yield next;
  } else {
    this.status = 500;
  }
});

app.listen(3000);
