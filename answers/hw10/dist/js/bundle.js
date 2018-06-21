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

"use strict";


var I18N = {
  'en': __webpack_require__(1),
  'zh-tw': __webpack_require__(2)
};

var clientId = 'gty48ewtge90oxfobw7z2zfu45yf94';
var game = 'League%20of%20Legends';
var limit = 20;
var urlToTwitch = 'https://api.twitch.tv/kraken/streams/?';
var offset = 0;
var language = '';
var isLoading = false;

getDataFromTwitch(); // first time update HTML.
window.addEventListener('scroll', runWhenScroll); // infinite scroll
document.getElementById('js-zh-tw').addEventListener('click', function () {
  changeLang('zh-tw');
});
document.getElementById('js-en').addEventListener('click', function () {
  changeLang('en');
});

function changeLang(langName) {
  // change TITLE lang
  document.getElementById('js-h1').innerHTML = I18N[langName].TITLE;
  console.log(I18N[langName].TITLE);

  // urlTOTwitch attributes
  language = langName;
  offset = 0;

  // activeButton css
  var elements = document.getElementsByTagName('a');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var aLink = _step.value;

      aLink.classList.remove('activeButton');
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  document.getElementById('js-' + langName).classList.add('activeButton');

  // clean old streams and get new steams in specific language
  document.getElementById('js-main').innerHTML = '';
  getDataFromTwitch();
}

function setAPIURL() {
  urlToTwitch += 'game=' + game;
  urlToTwitch += '&limit=' + limit;
  urlToTwitch += '&client_id=' + clientId;
  urlToTwitch += '&offset=' + offset;
  urlToTwitch += '&language=' + language;
}

function getDataFromTwitch() {
  var xhr = new window.XMLHttpRequest();
  xhr.onreadystatechange = updateHTML; // callback function

  isLoading = true;
  setAPIURL();
  xhr.open('GET', urlToTwitch, true);
  xhr.send();
}

function updateHTML() {
  if (this.readyState === 4 && this.status === 200) {
    var dataObject = JSON.parse(this.responseText);

    var addHTML = '';
    for (var i = 0; i < dataObject.streams.length; i++) {
      addHTML += '<section class="aPreview">' + '<div class="videoPreview">' + '<img onload="this.style.opacity = 1" src="' + dataObject.streams[i].preview.medium + '" alt="" >' + '</div>' + '<div class="playerDescription">' + '<div class="playerLogo">' + '<img onload="this.style.opacity = 1" src="' + dataObject.streams[i].channel.logo + '" alt="">' + '</div>' + '<div class="channelIntro">' + '<div class="channelName">' + dataObject.streams[i].channel.status + '</div>' + '<div class="playerName">' + dataObject.streams[i].channel.display_name + '</div>' + '</div>' + '</div>' + '</section>';
    }

    // append html string into DOM
    var div = document.createElement('div');
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
  // console.log('document.documentElement.scrollTop ' + document.documentElement.scrollTop); // 滾動高度
  // console.log('window.innerHeight ' + window.innerHeight); // 目前視窗高度
  // console.log('document.body.offsetHeight ' + document.body.offsetHeight); // 整個 body 高度

  if (!isLoading) {
    if (scrollHeight > bodyHeight - windowHeight - 200) {
      // almost scroll down
      getDataFromTwitch();
    }
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  TITLE: 'The streams in English'
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  TITLE: '用中文直播的頻道'
};

/***/ })
/******/ ]);