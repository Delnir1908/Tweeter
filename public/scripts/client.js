
const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet); 
  }
}

//escapes a string for HTML output, preventing Cross-Site Scripting

const htmlEscape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//create new tweet as html element
const createTweetElement = function(tweet) {

  //convert timestamp of time created into readable time string (eg. "1 day ago")
  let timeAgo = timeago.format(tweet.created_at);
    
  let $tweet = $(
    ` <article class="tweet">
        <header>
            <div><img src="${tweet.user.avatars}"></img></div>
            <div>${tweet.user.name}</div>
            <div class="user-handle">${tweet.user.handle}</div>
        </header>
        <p>${htmlEscape(tweet.content.text)}</p>
        <footer>
          <div>${timeAgo}</div>
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

$(document).ready(function() {

  $("#tweet-box").on('submit', function (event) {
    
    //prevent from propogation 
    event.preventDefault();

    //create a URL-encoded string for AJAX and trim for validation
    let serializedTweet = $(this).serialize();
    const $tweetToSend = $(this).find("textarea").val().trim();

    if (!validateTweet($tweetToSend)) {
      return false;
    }

    //ajax allows part of page to update on successful tweet submission
    $.ajax({
      url: '/api/tweets',
      method: 'POST',
      data: serializedTweet,
      success:function(response) {
        console.log('Tweet submitted successfully:', response);
        //reset textarea
        $("#tweet-box").trigger("reset");
        //reset counter
        $('.counter').text(140).css('color', '');
        //add new tweet top of tweets
        const $tweetElement = createTweetElement(response);
        $("#tweets-container").prepend($tweetElement);
      }
    });

  });

});

//validate tweet to check if string length is between 0 and 140
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

//render all tweets on successful GET request
const loadTweets = function() {
  $.ajax({
    url: 'api/tweets',
    method: 'GET',
    success:renderTweets
  })
}

//show error with slide animation
const showError = function(message) {
  $("#tweet-error").text(message).hide().slideDown();
}

//hide error (on successful submission)
const clearError = function() {
  $("#tweet-error").hide().text('');
}