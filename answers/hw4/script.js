var console = window.console;

var clientId = "gty48ewtge90oxfobw7z2zfu45yf94";
var game = "League%20of%20Legends";
var limit = 20;
var urlToTwitch = "https://api.twitch.tv/kraken/streams/?";

urlToTwitch += "game=" + game;
urlToTwitch += "&limit=" + limit;
urlToTwitch += "&client_id=" + clientId;

var xhr = new XMLHttpRequest();

xhr.open("GET", urlToTwitch, true);
xhr.send();

xhr.onreadystatechange = function() {
  if(this.readyState === 4 && this.status === 200) {
    var dataObject = JSON.parse(this.responseText);
    
    var addHTML = '';
    for(var i = 0; i < dataObject.streams.length; i++){
      addHTML += 
        '<section class="aPreview">' + 
          '<div class="videoPreview">' +
            '<img src="' + dataObject.streams[i].preview.medium + '" alt="">' +
          '</div>' +
          '<div class="playerDescription">' +
            '<div class="playerImg">' + 
              '<img src="' + dataObject.streams[i].channel.logo + '" alt="">' +
            '</div>' +
            '<div class="channelIntro">' +
              '<div class="channelName">' + dataObject.streams[i].channel.status + '</div>' +
              '<div class="playerName">' + dataObject.streams[i].channel.display_name + '</div>' +
            '</div>' +
          '</div>' +
        '</section>'
    }
    console.log(addHTML);
    
    document.getElementById('js-main').innerHTML = addHTML;
  }
}
