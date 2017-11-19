var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var spawn = require('child_process').spawn;
var fs = require('fs');
var main = require('./routes/index');
var settings = require('./routes/settings');
var influencer = require('./routes/influencer');
var csv = require('fast-csv');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

//blog main
app.use('/', main);

//skyler admin dashboard
app.use('/settings', settings);

//CRUD an influencer record
app.use('/influencer', influencer)

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
//exec('/usr/bin/python3 /home/bitnami/projects/sample/get_soundcloud_followers_today.py')
//var process = spawn('python3',["/home/bitnami/projects/sample/get_soundcloud_followers_today.py"]);
  //spawn('python3',["/home/bitnami/projects/sample/get_soundcloud_followers_today.py"])}, 120* 1000)

// mongoose.connect('mongodb://localhost/test', { useMongoClient: true }, function(error) {
//   console.log('we connected')
//   console.log(error)
// });
// var db = mongoose.createConnection('mongodb:///opt/bitnami/mongodb/tmp/mongodb-27017.sock/admin');
var db = mongoose.createConnection('mongodb:///opt/bitnami/mongodb/tmp/mongodb-27017.sock/admin');
mongoose.Promise = global.Promise;
var Cat = mongoose.model('Cat', { name: String });

var artistSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  intid: Number,
  artist: String,
  soundcloudFollows: [Number],
  soundcloud_url: String,
  instagram_url: String,
  yt_channel_id: String,
  yt_channel_url: String,
  twitter_url: String,
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

function addNewInfluencer(name, soundcloud_url, instagram_url, yt_channel_id, yt_channel_url) {
  var newInfluencer = {}''
  //get num influencers and assign num + 1
  newInfluencer['intid'] = name;
  newInfluencer['artist'] = name;
  //scrape this from the soundcloud url
  newInfluencer['soundcloudFollows']: = name;
  newInfluencer['soundcloud_url'] = soundcloud_url;

  newInfluencer['instagram_url'] = instagram_url;
  newInfluencer['yt_channel_id'] = yt_channel_id;
  newInfluencer['yt_channel_url'] = ytchannel_url;

  // newInfluencer['twitter_url'] = name;
  //assign url 
  // newInfluencer['tyi_url'] = name;
  // newInfluencer['artist_type'] = name;
  // newInfluencer['type_label'] = name;
  // newInfluencer['soundcloud_followers'] = name;
  // newInfluencer['location'] = name;
  // newInfluencer['label'] = name;
  // newInfluencer['signed'] = name;
  // newInfluencer['monitored'] = name;
  // newInfluencer['score'] = name;
  // newInfluencer['growth_percent'] = name;
  // newInfluencer['image']: = name;
  // newInfluencer['parent'] = name;
  // newInfluencer['notes'] = name;
}

function editInfluencer(id, field, value) {
  //get artist by ID
  //artist[field] = value;
  //mongo record save
}

var Artist = mongoose.model('Artist', artistSchema);

var artistFile = 'the_young_internet_nodes.csv';
var edgeFile = 'the_young_internet_edges.csv';
var artists = [];

var stream = fs.createReadStream(artistFile);
// var csvStream = csv().on('data', function(data) {
//   // data[_id] = new mongoose.Types.ObjectId();
//   // artists.push(data);
//   console.log(data)
// }).on('end', function() {
//   Artist.create(artists, function(err, documents) {
//     if (err) throw err;
//   });
// })

var csvStream = csv.parse().on("data", function(data) 
{
  var artistObj = {};
  artistObj["_id"] = new mongoose.Types.ObjectId();
  artistObj["intid"] = parseInt(data[0]);
  artistObj["artist"] = data[1];
  artistObj["soundcloudFollows"] = [];
  artistObj["soundcloud_url"] = data[2];
  artistObj["instagram_url"] = data[3];
  artistObj["yt_channel_id"] = data[4];
  artistObj["ytchannel_url"] = data[5];
  artistObj["twitter_url"] = data[6];
  artistObj["tyi_url"] = data[7];
  artistObj["artist_type"] = data[8];
  artistObj["type_label"] = data[9];
  artistObj["soundcloud_followers"] = parseInt(data[10]);
  artistObj["location"] = data[11];
  artistObj["label"] = data[12];
  artistObj["signed"] = data[13];
  artistObj["monitored"] = data[14];
  artistObj["score"] = data[15];
  artistObj["images"] = [];
  artistObj["parent"] = '';
  artistObj["notes"] = '';
  artists.push(artistObj);
  // console.log(data);
}).on("end", function(){
  console.log(artists.slice(1, artists.length));
  Artist.create(artists, function(err, documents) {
    if (err) throw err;
  });    
});
 
stream.pipe(csvStream);

// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });

module.exports = app;
app.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})

