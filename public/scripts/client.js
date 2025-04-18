// // Fake data taken from initial-tweets.json
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet); 
  }
}

const createTweetElement = function(tweet) {
  let timeAgo = timeago.format(tweet.created_at);
    
  let $tweet = $(
    ` <article class="tweet">
        <header>
          <div><img src="${tweet.user.avatars}"></img></div>
          <div>${tweet.user.name}</div>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer>
          <div>${timeAgo})</div>
          <div class="icon">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`
    );

return $tweet;
}


$("#tweet-box").on('submit', function (event) {
  event.preventDefault();
  let $serializedTweet = $(this).serialize();
  //test code
  //console.log($serializedTweet);
  const $tweetToSend = $(this).find("textarea").val().trim();

  if (!validateTweet($tweetToSend)) {
    return false;
  }

  $.ajax({
    url: '/api/tweets',
    method: 'POST',
    data: $serializedTweet,
    success:function(response) {
      console.log('Tweet submitted successfully:', response);
      $("#new-tweet").trigger("reset");
      $("#tweets-container").empty();
      loadTweets();
    }
  })

});


const validateTweet = function(tweet) {

  if (tweet.length === 0) {
    showError("Error: your tweet is empty");
    return false;
  }

  if (tweet.length > 140){
    showError("Error: max 140 characters allowed");
    return false;
  }
  
  clearError();
  return true;

}

const loadTweets = function() {
  $.ajax({
    url: 'api/tweets',
    method: 'GET',
    success:renderTweets
  })
}


const showError = function(message) {
  $("#tweet-error").text(message).show().slideDown();
}

const clearError = function() {
  $("#tweet-error").hide().text('');
}