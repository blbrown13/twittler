$(document).ready(function() {
  var $body = $('body');
  var $tweetCont = $('#home-tweets-cont');

  var lastCheckedIndex = 0;
  var userFilter = '';

  var clearFilter = function(){
    setUserFilter('');
    lastCheckedIndex = 0;
  }

  var $filterButton = $('#clear-filter');
  $filterButton.click(function(){
    clearFilter();
  });

  var checkForTweet = function() {
    var newTweets = [];
    var stream = userFilter ? streams.users[userFilter] : streams.home;

    if (userFilter) {
      newTweets = getTweetsFromStream(stream, 0);
    } else {
      newTweets = getTweetsFromStream(stream, lastCheckedIndex);
      lastCheckedIndex = streams.home.length - 1;
    }

    displayTweets(newTweets);
    setTimeout(checkForTweet, Math.random() * 1500);
  };

  var getTweetsFromStream = function(stream, index) {
    var newTweets = stream.slice(index + 1);
    return newTweets;
  }

  var displayTweets = function(tweets){
    tweets.forEach(function(tweet){
      var tweetDisplay = getTweetDisplay(tweet);
      $tweetCont.prepend(tweetDisplay);
    });
  }

  var getTweetDisplay = function(tweet) {
    var $tweet = $('<div class="tweet-cont"></div>');
    var $tweetMsg = $('<div></div>');
    var $tweetDate = $('<div></div>');
    var $tweetUser = $('<a href="#"></a>');

    $tweetMsg.text(tweet.message);
    $tweetDate.text(tweet.created_at);
    $tweetUser.text('@' + tweet.user);
    $tweetUser.css({
      'color': 'black',
      'text-decoration': 'none',
      'font-weight': 'bold'
    });

    $tweetUser.click(function(){
      setUserFilter(tweet.user);
    });

    $tweet.append($tweetUser);
    $tweet.append($tweetMsg);
    $tweet.append($tweetDate);

    return $tweet;
  }

  var setUserFilter = function(user){
    userFilter = user;
    clearTweets();
  }

  var clearTweets = function() {
    $tweetCont.empty();
  }

  checkForTweet();
});

// ********************************************************
// create function for user click
// var getTweetsFromUser = function(user){
//   var $userStream = $('#user-tweets-cont');
//   console.log(user);
//   var $homeStream = $('#home-tweets-cont');

//   // $userStream.toggle();
//   $tweetCont = $('#user-tweets-cont');
//   // $homeStream.toggle();

//   var userTweets = streams.users[user];
//   displayTweets(userTweets);
// }

// stop auto-populate of tweets
// if(lastCheckedIndex < 15) {
//     setTimeout(checkForTweet, Math.random() * 1500);
// }
