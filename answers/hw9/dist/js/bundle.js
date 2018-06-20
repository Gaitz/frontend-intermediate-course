/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let I18N = {
  'en' : __webpack_require__(1),
  'zh-tw' : __webpack_require__(2)
};

let clientId = "gty48ewtge90oxfobw7z2zfu45yf94";
let game = "League%20of%20Legends";
let limit = 20;
let urlToTwitch = "https://api.twitch.tv/kraken/streams/?";
let offset = 0;
let language = "";
let isLoading = false;

getDataFromTwitch(); // first time update HTML.
window.addEventListener('scroll', runWhenScroll ); // infinite scroll
document.getElementById('js-zh-tw').addEventListener("click", function() { changeLang("zh-tw") });
document.getElementById('js-en').addEventListener("click", function() { changeLang("en") });

function changeLang (langName) {
  // change TITLE lang
  document.getElementById("js-h1").innerHTML = I18N[langName].TITLE;
  console.log(I18N[langName].TITLE);

  // urlTOTwitch attributes
  language = langName;
  offset = 0;

  // activeButton css
  let elements = document.getElementsByTagName('a');
  for (aLink of elements){
    aLink.classList.remove("activeButton");
  }
  document.getElementById(`js-${langName}`).classList.add("activeButton");

  // clean old streams and get new steams in specific language
  document.getElementById('js-main').innerHTML = "";
  getDataFromTwitch();
}

function setAPIURL(){
  urlToTwitch += "game=" + game;
  urlToTwitch += "&limit=" + limit;
  urlToTwitch += "&client_id=" + clientId;
  urlToTwitch += "&offset=" + offset;
  urlToTwitch += "&language=" + language;
}

function getDataFromTwitch() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = updateHTML; // callback function

  isLoading = true;
  setAPIURL();
  xhr.open("GET", urlToTwitch, true);
  xhr.send();
}

function updateHTML() {

  if(this.readyState === 4 && this.status === 200) {
    let dataObject = JSON.parse(this.responseText);

    let addHTML = '';
    for(let i = 0; i < dataObject.streams.length; i++){
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

function runWhenScroll() {
  let scrollHeight = document.documentElement.scrollTop;
  let windowHeight = window.innerHeight;
  let bodyHeight = document.body.offsetHeight;
  //console.log('document.documentElement.scrollTop ' + document.documentElement.scrollTop); // 滾動高度
  //console.log('window.innerHeight ' + window.innerHeight); // 目前視窗高度
  //console.log('document.body.offsetHeight ' + document.body.offsetHeight); // 整個 body 高度

  if(!isLoading) {
    if(scrollHeight > bodyHeight - windowHeight - 200){ // almost scroll down
      getDataFromTwitch();
    }
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  TITLE: "The streams in English"
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
  TITLE: "用中文直播的頻道"
};

/***/ })
/******/ ]);