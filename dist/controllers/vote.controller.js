"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var db = require("../models");
var Vote = db.Vote,
  Content = db.Content,
  Count = db.Count;
var getVote = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, vote, contents, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.next = 3;
          return Vote.findOne({
            where: {
              id: id
            }
          });
        case 3:
          vote = _context.sent;
          _context.next = 6;
          return Content.findAll({
            where: {
              vote_id: id
            },
            attributes: ["id", "vote_id", "content", "createdAt", "updatedAt"]
          });
        case 6:
          contents = _context.sent;
          result = _objectSpread(_objectSpread({}, vote.dataValues), {}, {
            contents: contents
          });
          if (!vote) {
            _context.next = 11;
            break;
          }
          res.send(result);
          return _context.abrupt("return");
        case 11:
          res.status(404).send({
            message: "투표가 존재하지 않습니다."
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getVote(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var createVote = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var newVote, vote, contents;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          newVote = req.body;
          _context2.next = 3;
          return Vote.create(newVote);
        case 3:
          vote = _context2.sent;
          _context2.next = 6;
          return Content.bulkCreate(newVote.contents.map(function (content) {
            return {
              content: content,
              vote_id: vote.id
            };
          }));
        case 6:
          contents = _context2.sent;
          if (!vote) {
            _context2.next = 10;
            break;
          }
          res.send(_objectSpread(_objectSpread({}, vote.dataValues), {}, {
            contents: contents
          }));
          return _context2.abrupt("return");
        case 10:
          res.status(404).send({
            message: "투표 생성 실패~"
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function createVote(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var editVote = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, newInfo, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          newInfo = req.body;
          _context3.next = 4;
          return Vote.update(newInfo, {
            where: {
              id: id
            }
          });
        case 4:
          result = _context3.sent;
          if (!result[0]) {
            _context3.next = 8;
            break;
          }
          res.send({
            message: "".concat(result[0], "\uAC1C\uC758 \uD589\uC774 \uC601\uD5A5\uBC1B\uC558\uC2B5\uB2C8\uB2E4.")
          });
          return _context3.abrupt("return");
        case 8:
          res.status(404).send({
            message: "수정실패~"
          });
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function editVote(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var doVote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$params, voteId, contentId, doVote;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$params = req.params, voteId = _req$params.voteId, contentId = _req$params.contentId;
          _context4.next = 3;
          return Count.create({
            vote_id: voteId,
            content_id: contentId
          });
        case 3:
          doVote = _context4.sent;
          if (!doVote) {
            _context4.next = 7;
            break;
          }
          res.send({
            message: "투표가 완료되었습니다."
          });
          return _context4.abrupt("return");
        case 7:
          res.status(404).send({
            message: "투표 실패~"
          });
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function doVote(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteVote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, deletedCount;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return Vote.destroy({
            where: {
              id: id
            }
          });
        case 3:
          deletedCount = _context5.sent;
          if (!deletedCount) {
            _context5.next = 7;
            break;
          }
          res.send({
            message: "".concat(deletedCount, "\uAC1C \uC0AD\uC81C \uB418\uC5C8\uC2B5\uB2C8\uB2E4.")
          });
          return _context5.abrupt("return");
        case 7:
          res.status(404).send({
            message: "삭제할 수 없습니다."
          });
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function deleteVote(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
module.exports = {
  getVote: getVote,
  createVote: createVote,
  editVote: editVote,
  doVote: doVote,
  deleteVote: deleteVote
};