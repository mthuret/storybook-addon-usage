"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Usage = Usage;

var _storybookAddons = require("@kadira/storybook-addons");

var _storybookAddons2 = _interopRequireDefault(_storybookAddons);

var _2 = require("./");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Usage(fn) {
  var story = fn();
  var first = "<" + story.type.name + " ";
  _lodash2.default.toPairs(story.props).forEach(function (p) {
    var value = void 0;
    if (typeof p[1] === 'function') {
      value = p[1].name ? "{" + p[1].name + "}" : '{anonymous}';
    } else if (typeof p[1] === 'string') {
      value = "" + JSON.stringify(p[1]);
    } else if (_lodash2.default.isObject(p[1]) && !_lodash2.default.isArray(p[1])) {
      value = "{" + objToString(p[1]) + "}";
    } else {
      value = "{" + JSON.stringify(p[1]) + "}";
    }
    first += " " + p[0] + "=" + value + "\n";
  });
  first += " />";
  var channel = _storybookAddons2.default.getChannel();
  channel.emit(_2.EVENT_ID, { storybook: first });
  return fn();
}

function objToString(obj) {

  var str = '{';
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var value = void 0;
      if (_lodash2.default.isObject(obj[p]) && !_lodash2.default.isArray(obj[p])) {
        value = objToString(obj[p]);
      } else {
        value = JSON.stringify(obj[p]);
      }
      str += p + ': ' + value;
    }
  }
  str += '}';
  return str;
}