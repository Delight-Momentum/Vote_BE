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
  var Count = /*#__PURE__*/function (_Model) {
    function Count() {
      (0, _classCallCheck2["default"])(this, Count);
      return _callSuper(this, Count, arguments);
    }
    (0, _inherits2["default"])(Count, _Model);
    return (0, _createClass2["default"])(Count, null, [{
      key: "associate",
      value: function associate(models) {}
    }]);
  }(Model);
  Count.init({
    vote_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    content_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize: sequelize,
    modelName: "Count"
  });
  return Count;
};