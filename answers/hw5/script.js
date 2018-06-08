var clientId = "gty48ewtge90oxfobw7z2zfu45yf94";
var game = "League%20of%20Legends";
var limit = 20;
var urlToTwitch = "https://api.twitch.tv/kraken/streams/?";
var offset = 0;
var isLoading = false;

getDataFromTwitch(); // first time update HTML.
window.addEventListener('scroll', runWhenScroll ); // infinite scroll

function setAPIURL(){
  urlToTwitch += "game=" + game;
  urlToTwitch += "&limit=" + limit;
  urlToTwitch += "&client_id=" + clientId;
  urlToTwitch += "&offset=" + offset;  
}

function getDataFromTwitch() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = updateHTML; // callback function 
  
  isLoading = true;
  setAPIURL();
  xhr.open("GET", urlToTwitch, true);
  xhr.send();
}

function updateHTML() {
  if(this.readyState === 4 && this.status === 200) {
    var dataObject = JSON.parse(this.responseText);

    var addHTML = '';
    for(var i = 0; i < dataObject.streams.length; i++){
      addHTML += 
        '<section class="aPreview">' + 
          '<div class="videoPreview">' +
            '<img onload="this.style.opacity = 1" src="' + dataObject.streams[i].preview.medium + '" alt="" >' +
          '</div>' +
          '<div class="playerDescription">' +
            '<div class="playerLogo">' + 
              '<img onload="this.style.opacity = 1" src="' + dataObject.streams[i].channel.logo + '" alt="">' +
            '</div>' +
            '<div class="channelIntro">' +
              '<div class="channelName">' + dataObject.streams[i].channel.status + '</div>' +
              '<div class="playerName">' + dataObject.streams[i].channel.display_name + '</div>' +
            '</div>' +
          '</div>' +
        '</section>';
    }  
    
    // add html string into DOM
    const div = document.createElement('div');
    document.getElementById('js-main').appendChild(div);
    div.outerHTML = addHTML;
    
    // next loading offset
    offset += limit;
    
    isLoading = false;
  }
}

function runWhenScroll() {
  var scrollHeight = document.documentElement.scrollTop;
  var windowHeight = window.innerHeight;
  var bodyHeight = document.body.offsetHeight;
  //console.log('document.documentElement.scrollTop ' + document.documentElement.scrollTop); // 滾動高度
  //console.log('window.innerHeight ' + window.innerHeight); // 目前視窗高度
  //console.log('document.body.offsetHeight ' + document.body.offsetHeight); // 整個 body 高度
  
  if(!isLoading) {
    if(scrollHeight > bodyHeight - windowHeight - 200){ // almost scroll down
      getDataFromTwitch();
    }
  }
}