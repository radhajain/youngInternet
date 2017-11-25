const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/tyi', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get influencers
router.get('/influencers', (req, res) => {
    connection((db) => {
        db.collection('influencers')
            .find({}).sort({ 'score': 1})
            .toArray()
            .then((influencers) => {
                response.data = influencers;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

function addNewInfluencer(name, soundcloud_url, instagram_url, yt_channel_id, yt_channel_url) {
  var newInfluencer = {}
  //get num influencers and assign num + 1
  newInfluencer['intid'] = name;
  newInfluencer['artist'] = name;
  //scrape this from the soundcloud url
  newInfluencer['soundcloudFollows'] = name;
  newInfluencer['soundcloud_url'] = soundcloud_url;

  newInfluencer['instagram_url'] = instagram_url;
  newInfluencer['yt_channel_id'] = yt_channel_id;
  newInfluencer['yt_channel_url'] = yt_channel_url;

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



// Adjust Settings
// router.get('/settings', (req, res) => {
//     connection((db) => {
//         db.collection('settings')
//             .find()
//             .toArray()
//             .then((users) => {
//                 response.data = users;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });
module.exports = router;
