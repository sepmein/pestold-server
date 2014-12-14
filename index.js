/**
 * node internal
 * */

var path = require('path');

/**
 * koa.js
 * */

var koa = require('koa'),
  router = require('koa-router'),
  parse = require('co-body'),
  jwt = require('jsonwebtoken'),
  Promise = require('bluebird'),
  app = koa();

// settings
app.name = 'pestold';
app.env = process.env.NODE_ENV || 'development';

const secret = require('./config/secret')

/**
 * mongoose
 * */

//promisfy using bluebird
// see:
// https://github.com/LearnBoost/mongoose/issues/2177
// https://github.com/petkaantonov/bluebird/blob/master/API.md#promisification
var mongoose = Promise.promisifyAll(require("mongoose"));

mongoose.connect('mongodb://localhost:27017/pestold');
var db = mongoose.connection;
db.on('error', function(err) {
  app.emit('error', new Error('db connect error: ', err));
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
    }
  }
});

/**
 * require models
 */

require(__dirname + '/models/' + 'user.js');
require(__dirname + '/models/' + 'organization.js');

var User = mongoose.model('User'),
  Organization = mongoose.model('organization');

/**
 * router
 */

app.use(router(app));

/**
 * authentication
 */
app.post('/auth', function*(next) {
  var user =
    yield parse(this);
  // User.verify(user, function(){

  // })
});

app.get('/user/:id', function*(next) {
  var token = this.header.token;
  if (!token) {
    this.throw(401, 'not logged in');
  }
  var user =
    yield User.findByToken(token);
  if (user) {
    if (user._id = this.params.id) {
      this.body = user;
    } else {
      this.throw(403, 'not authorized to see the content');
    }
  } else {
    this.throw(404, 'user not exist')
  }
})

app.post('/signup', function*(next) {
  var requestBody =
    yield parse(this);
  var user = new User({
    name: requestBody.name,
    password: requestBody.password
  });

  // use jwt to generate token
  user.token = jwt.sign(requestBody, secret);

  var context = this;
  var saveUser = user.saveAsync(user)
  .then(function(err, product, numberAffected){
    console.log('err',err);
    console.log('product',product);
    console.log('numberAffected',numberAffected);
  })
  .catch(mongoose.Error, function(e) {
    context.throw(400, e.errors.name.message);
  }).error(function(e) {
    context.throw(500, e);
  });

});

app.listen(4000);