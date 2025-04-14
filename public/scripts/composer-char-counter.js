$(document).ready(function() {
  // --- our code goes here ---
  //test code
  //console.log('ready!');
  loadTweets();
  
  $("#tweet-text").on('input', function() {
    const maxChars = 140;
    const counter= $(this).parent().find('.counter');
    const tweetLength = $(this).val().length;
    const remainingCount = maxChars - tweetLength;
    counter.text(remainingCount);
    if (remainingCount < 0) {
      counter.css('color', '#FF0000') ;
    } else {
      counter.css('color', ''); // Reset color to default if within limit
    }
  });
});