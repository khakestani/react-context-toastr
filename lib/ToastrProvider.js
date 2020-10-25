"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ToastrBox = _interopRequireDefault(require("./ToastrBox"));

var _ToastrConfirm = _interopRequireDefault(require("./ToastrConfirm"));

var actions = _interopRequireWildcard(require("./actions"));

var _toastrEmitter = require("./toastrEmitter");

var _utils = require("./utils");

var _constants = require("./constants");

var _reducer = _interopRequireWildcard(require("./reducer"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var StateProvider = /*#__PURE__*/_react["default"].createContext();

var DispatchProvider = /*#__PURE__*/_react["default"].createContext();

var ContextToastr = function ContextToastr(props) {
  var displayName = 'ToastrProvider';
  var add = props.add,
      showConfirm = props.showConfirm,
      clean = props.clean,
      removeByType = props.removeByType,
      remove = props.remove;
  var dispatch = (0, _react.useContext)(DispatchProvider);
  var toastrFired = {};
  var toastrPositions = ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'];
  (0, _utils.updateConfig)(props);

  var addDispatcher = function addDispatcher(payload) {
    dispatch(add(payload));
  };

  var showConfirmDispatcher = function showConfirmDispatcher(payload) {
    dispatch(showConfirm(payload));
  };

  var cleanDispatcher = function cleanDispatcher(payload) {
    dispatch(clean(payload));
  };

  var removeByTypeDispatcher = function removeByTypeDispatcher(payload) {
    dispatch(removeByType(payload));
  };

  var removeDispatcher = function removeDispatcher(payload) {
    dispatch(remove(payload));
  };

  (0, _react.useEffect)(function () {
    _toastrEmitter.EE.on('toastr/confirm', showConfirmDispatcher);

    _toastrEmitter.EE.on('add/toastr', addDispatcher);

    _toastrEmitter.EE.on('clean/toastr', cleanDispatcher);

    _toastrEmitter.EE.on('removeByType/toastr', removeByTypeDispatcher);

    _toastrEmitter.EE.on('remove/toastr', removeDispatcher);

    (function () {
      _toastrEmitter.EE.removeListener('toastr/confirm');

      _toastrEmitter.EE.removeListener('add/toastr');

      _toastrEmitter.EE.removeListener('clean/toastr');

      _toastrEmitter.EE.removeListener('removeByType/toastr');

      _toastrEmitter.EE.removeListener('remove/toastr');

      toastrFired = (_readOnlyError("toastrFired"), {});
    });
  }, []);

  var _addToMemory = function _addToMemory(id) {
    toastrFired[id] = true;
  };

  var _renderToastrForPosition = function _renderToastrForPosition(position) {
    var toastrs = props.toastr.toastrs;

    if (toastrs) {
      return toastrs.filter(function (item) {
        return item.position === position;
      }).map(function (item) {
        var mergedItem = _objectSpread(_objectSpread({}, item), {}, {
          options: _objectSpread({
            progressBar: props.progressBar,
            transitionIn: props.transitionIn,
            transitionOut: props.transitionOut,
            closeOnToastrClick: props.closeOnToastrClick
          }, item.options)
        });

        return /*#__PURE__*/_react["default"].createElement("div", {
          key: item.id
        }, /*#__PURE__*/_react["default"].createElement(_ToastrBox["default"], _extends({
          inMemory: toastrFired,
          addToMemory: function addToMemory() {
            return _addToMemory(item.id);
          },
          item: mergedItem
        }, props)), item.options && item.options.attention && /*#__PURE__*/_react["default"].createElement("div", {
          onClick: function onClick() {
            if (typeof item.options.onAttentionClick === 'function') {
              item.options.onAttentionClick(item.id);
            } else {
              props.remove(item.id);
            }
          },
          className: "toastr-attention"
        }));
      });
    }
  };

  var _renderToastrs = function _renderToastrs() {
    var toastr = props.toastr;
    var width = toastr.toastrs && toastr.toastrs[0] && toastr.toastrs[0].options && toastr.toastrs[0].options.width;
    var style = width ? {
      width: width
    } : {};
    return /*#__PURE__*/_react["default"].createElement("div", null, toastrPositions.map(function (position) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: position,
        className: position,
        style: style
      }, _renderToastrForPosition(position));
    }));
  };

  var className = props.className,
      toastr = props.toastr;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])('context-toastr', className),
    "aria-live": "assertive"
  }, toastr.confirm && /*#__PURE__*/_react["default"].createElement(_ToastrConfirm["default"], _extends({
    confirm: toastr.confirm
  }, props)), _renderToastrs()));
};

ContextToastr.propTypes = {
  toastr: _propTypes["default"].object,
  position: _propTypes["default"].string,
  newestOnTop: _propTypes["default"].bool,
  timeOut: _propTypes["default"].number,
  confirmOptions: _propTypes["default"].object,
  progressBar: _propTypes["default"].bool,
  transitionIn: _propTypes["default"].oneOf(_constants.TRANSITIONS["in"]),
  transitionOut: _propTypes["default"].oneOf(_constants.TRANSITIONS.out),
  preventDuplicates: _propTypes["default"].bool,
  closeOnToastrClick: _propTypes["default"].bool
};
ContextToastr.defaultProps = {
  position: 'top-right',
  newestOnTop: true,
  timeOut: 5000,
  progressBar: false,
  transitionIn: _constants.TRANSITIONS["in"][0],
  transitionOut: _constants.TRANSITIONS.out[0],
  preventDuplicates: false,
  closeOnToastrClick: false,
  confirmOptions: {
    okText: 'ok',
    cancelText: 'cancel'
  }
};

var ToastrProvider = function ToastrProvider(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["children"]);

  var _useReducer = (0, _react.useReducer)(_reducer["default"], _reducer.initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {}, [state]);
  return /*#__PURE__*/_react["default"].createElement(DispatchProvider.Provider, {
    value: dispatch
  }, /*#__PURE__*/_react["default"].createElement(StateProvider.Provider, {
    value: state
  }, /*#__PURE__*/_react["default"].createElement(ContextToastr, _extends({}, rest, actions, {
    toastr: state
  })), children));
};

var _default = ToastrProvider;
exports["default"] = _default;