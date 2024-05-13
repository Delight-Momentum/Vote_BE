"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var _require = require("sequelize"),
  Model = _require.Model;
module.exports = function (sequelize, DataTypes) {
  var Vote = /*#__PURE__*/function (_Model) {
    function Vote() {
      (0, _classCallCheck2["default"])(this, Vote);
      return _callSuper(this, Vote, arguments);
    }
    (0, _inherits2["default"])(Vote, _Model);
    return (0, _createClass2["default"])(Vote, null, [{
      key: "associate",
      value: function associate(models) {}
    }]);
  }(Model);
  Vote.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    period_start: {
      allowNull: false,
      type: DataTypes.DATE
    },
    period_end: {
      allowNull: false,
      type: DataTypes.DATE
    },
    method: {
      allowNull: false,
      type: DataTypes.STRING
    },
    participants_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    host_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize: sequelize,
    modelName: "Vote"
  });
  return Vote;
};