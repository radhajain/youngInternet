var spawn = require('child_process').spawn;
var fs = require('fs');

var csv = require('fast-csv');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.createConnection('mongodb://localhost:27017/tyi', ['influencers'], (err, db) => {
	if (err) return console.log(err);
  // closure(db);
});
mongoose.Promise = global.Promise;

var influencerSchema = new Schema({
  // _id: Schema.Types.ObjectId(),
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

var Influencer = mongoose.model('Influencer', influencerSchema);

var influencerFile = 'the_young_internet_nodes.csv';
var edgeFile = 'the_young_internet_edges.csv';
var influencers = [];
// Influencer.create({ _id: new mongoose.Types.ObjectId(), name: 'val' })
Influencer.create({ _id: new mongoose.Types.ObjectId(), name: 'val8' })

var stream = fs.createReadStream(influencerFile);

var csvStream = csv.parse().on("data", function(data) 
{
  var influencerObj = {};
  influencerObj["_id"] = new mongoose.Types.ObjectId();
  influencerObj["intid"] = parseInt(data[0]);
  influencerObj["artist"] = data[1];
  influencerObj["soundcloudFollows"] = [];
  influencerObj["soundcloud_url"] = data[2];
  influencerObj["instagram_url"] = data[3];
  influencerObj["yt_channel_id"] = data[4];
  influencerObj["ytchannel_url"] = data[5];
  influencerObj["twitter_url"] = data[6];
  influencerObj["tyi_url"] = data[7];
  influencerObj["artist_type"] = data[8];
  influencerObj["type_label"] = data[9];
  if (data[10] == "") influencerObj["soundcloud_followers"] = 0;
  else influencerObj["soundcloud_followers"] = parseInt(data[10]);
  influencerObj["location"] = data[11];
  influencerObj["label"] = data[12];
  influencerObj["signed"] = data[13];
  influencerObj["monitored"] = data[14];
  influencerObj["score"] = data[15];
  influencerObj["images"] = [];
  influencerObj["parent"] = '';
  influencerObj["notes"] = '';
  influencers.push(influencerObj);
}).on("end", function() {
	//skip first 'influencer' which was the first row of headings
	for (var i = 1; i < influencers.length; i++) {
	  db.collection('influencers').save(influencers[i], function(err, infl) {
			if (err) console.log(err);
		})
}});
 
stream.pipe(csvStream);