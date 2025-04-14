// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

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
let $tweet = $(
  ` <article class="tweet">
      <header>
        <div><img src="${tweet.user.avatars}"></img></div>
        <div>${tweet.user.name}</div>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <div>${tweet.created_at}</div>
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

renderTweets(data);



$("form").on('submit', function (event) {
  event.preventDefault();
  let $serializedTweet = $(this).serialize();
  //test code
  //console.log($serializedTweet);
  $.ajax({
    url: 'api/tweets',
    method: 'POST',
    data: $serializedTweet,
    success:function(response) {
      console.log('Tweet submitted successfully:', response);
    }
  })
});
