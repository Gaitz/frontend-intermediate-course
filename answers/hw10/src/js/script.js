'use strict';

let I18N = {
  'en': require('./lang-en.js'),
  'zh-tw': require('./lang-zh-tw.js')
};

let clientId = 'gty48ewtge90oxfobw7z2zfu45yf94';
let game = 'League%20of%20Legends';
let limit = 20;
let urlToTwitch = 'https://api.twitch.tv/kraken/streams/?';
let offset = 0;
let language = '';
let isLoading = false;

getDataFromTwitch(); // first time update HTML.
window.addEventListener('scroll', runWhenScroll); // infinite scroll
document.getElementById('js-zh-tw').addEventListener('click', function () { changeLang('zh-tw'); });
document.getElementById('js-en').addEventListener('click', function () { changeLang('en'); });

function changeLang (langName) {
  // change TITLE lang
  document.getElementById('js-h1').innerHTML = I18N[langName].TITLE;
  console.log(I18N[langName].TITLE);

  // urlTOTwitch attributes
  language = langName;
  offset = 0;

  // activeButton css
  let elements = document.getElementsByTagName('a');
  for (let aLink of elements) {
    aLink.classList.remove('activeButton');
  }
  document.getElementById(`js-${langName}`).classList.add('activeButton');

  // clean old streams and get new steams in specific language
  document.getElementById('js-main').innerHTML = '';
  getDataFromTwitch();
}

function setAPIURL () {
  urlToTwitch += 'game=' + game;
  urlToTwitch += '&limit=' + limit;
  urlToTwitch += '&client_id=' + clientId;
  urlToTwitch += '&offset=' + offset;
  urlToTwitch += '&language=' + language;
}

function getDataFromTwitch () {
  let xhr = new window.XMLHttpRequest();
  xhr.onreadystatechange = updateHTML; // callback function

  isLoading = true;
  setAPIURL();
  xhr.open('GET', urlToTwitch, true);
  xhr.send();
}

function updateHTML () {
  if (this.readyState === 4 && this.status === 200) {
    let dataObject = JSON.parse(this.responseText);

    let addHTML = '';
    for (let i = 0; i < dataObject.streams.length; i++) {
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

    // append html string into DOM
    const div = document.createElement('div');
    document.getElementById('js-main').appendChild(div);
    div.outerHTML = addHTML;

    // next loading offset
    offset += limit;

    isLoading = false;
  }
}

function runWhenScroll () {
  let scrollHeight = document.documentElement.scrollTop; // 滾動高度
  let windowHeight = window.innerHeight; // 目前視窗高度
  let bodyHeight = document.body.offsetHeight; // 整個 body 高度

  if (!isLoading) {
    window.alert(`scrollHeight: ${scrollHeight} \nwindowHeight: ${windowHeight} \nbodyHeight: ${bodyHeight}`);
    if (scrollHeight > (bodyHeight - windowHeight - windowHeight)) { // 拉到還有最後一個視窗大小時
      getDataFromTwitch();
    }
  }
}
