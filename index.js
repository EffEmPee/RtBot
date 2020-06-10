var Twit = require('twit');
var config = require('./config.js');
const randomItem  = require('random-item');
var schedule = require('node-schedule');

var Twitter = new Twit(config);

function retweet(){

  var last_id;
  var query = {
    q: 'atriz',
    result_type:"recent",
    since_id: last_id
  }


  Twitter.get('search/tweets',query, (error, data, response) => {
    if (error) {
      console.log('Bot não pôde achar o último tweet, : ' + error);
    }
    else {
        var id = {
          id : data.statuses[0].id_str,
        }

        Twitter.post('statuses/retweet/:id', id, () => {
          if (error) {
            console.log('Bot não pode retweetar, : ' + error);
          }
          else {
            console.log('Bot retweetou : ' + id.id);
            last_id = id.id;
          }
      })
    }
    console.log(data.statuses);
  })
}

  setInterval(retweet, 10*1000);

