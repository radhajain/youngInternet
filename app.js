var express = require('express');
var exec = require('exec');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var spawn = require('child_process').spawn;
var routes = require('./routes/index');
var users = require('./routes/users');
var csv = require('fast-csv');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
// mongoose.Promise = global.Promise;
// var Cat = mongoose.model('Cat', { name: String });

var artistSchema = newSchema({
  _id: mongoose.Schema.Types.ObjectId,
  intid: Number,
  artist: String,
  soundcloudFollows: [Number],
  soundcloud_url: String,
  instagram_url: String,
  yt_channel_id: String,
  t_channel_url: String,
  twitter_name: String,
  tyi_url: String,
  artist_type: String,
  type_label: String,
  soundcloud_followers: Number,
  location: String,
  label: String,
  signed: String,
  monitored: String,
  score: String,
  growth_percent: String,
  image: [String],
  parent: String,
  notes: String
});


// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });


var process = spawn('python3',["/home/bitnami/projects/sample/get_soundcloud_followers_today.py"]);
setInterval(function() {
  spawn('python3',["/home/bitnami/projects/sample/get_soundcloud_followers_today.py"])
  function() {

  }
}, 10 * 1000)
module.exports = app;

app.listen(3000, () => console.log('Example app listening on port 3000!'))
