"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var db = require("../models");
var Vote = db.Vote,
  Count = db.Count;
var getVoteList = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$query, offset, limit, lists, participantCounts, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, offset = _req$query.offset, limit = _req$query.limit;
          _context2.next = 3;
          return Vote.findAll();
        case 3:
          lists = _context2.sent;
          participantCounts = lists.map( /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(vote) {
              var count;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return Count.findAll({
                      where: {
                        vote_id: vote.id
                      }
                    });
                  case 2:
                    count = _context.sent;
                    return _context.abrupt("return", count.length);
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x3) {
              return _ref2.apply(this, arguments);
            };
          }());
          _context2.next = 7;
          return Promise.all(participantCounts).then(function (counts) {
            return lists.map(function (vote, index) {
              return _objectSpread(_objectSpread({}, vote.dataValues), {}, {
                participantCounts: counts[index]
              });
            });
          });
        case 7:
          result = _context2.sent;
          if (!(offset && limit)) {
            _context2.next = 11;
            break;
          }
          res.send(result.slice(offset - 1, offset - 1 + limit));
          return _context2.abrupt("return");
        case 11:
          res.send(result);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getVoteList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = {
  getVoteList: getVoteList
};