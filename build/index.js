(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PServ"] = factory();
	else
		root["PServ"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "AuthClient": () => (/* reexport */ AuthClient),
  "IndexedCollection": () => (/* reexport */ IndexedCollection),
  "IndexedObjectCollection": () => (/* reexport */ IndexedObjectCollection),
  "ObservableIndexedCollection": () => (/* reexport */ ObservableIndexedCollection),
  "ObservableIndexedObjectCollection": () => (/* reexport */ ObservableIndexedObjectCollection),
  "WebApiChatClient": () => (/* reexport */ WebApiChatClient),
  "WebSocketChatClient": () => (/* reexport */ WebSocketChatClient)
});

;// CONCATENATED MODULE: ./src/EventTarget.ts
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var EventTarget = /*#__PURE__*/function () {
  function EventTarget() {
    _classCallCheck(this, EventTarget);
    _defineProperty(this, "events", new Map());
    _defineProperty(this, "onceEvents", new Map());
  }
  _createClass(EventTarget, [{
    key: "on",
    value: function on(eventName, handler) {
      this.addHandler(this.events, eventName, handler);
      return this;
    }
  }, {
    key: "once",
    value: function once(eventName, handler) {
      this.addHandler(this.onceEvents, eventName, handler);
      return this;
    }
  }, {
    key: "off",
    value: function off(eventName, handler) {
      var _this$events$get;
      var index = (_this$events$get = this.events.get(eventName)) === null || _this$events$get === void 0 ? void 0 : _this$events$get.indexOf(handler);
      if (!index || index < 0) {
        return this;
      }
      this.events.get(eventName).splice(index, 1);
    }
  }, {
    key: "emit",
    value: function emit(eventName, event) {
      this.callHandlers(this.events, eventName, event);
      this.callHandlers(this.onceEvents, eventName, event);
      this.onceEvents["delete"](eventName);
      return this;
    }
  }, {
    key: "addHandler",
    value: function addHandler(map, eventName, handler) {
      var _map$get;
      var handlers = (_map$get = map.get(eventName)) !== null && _map$get !== void 0 ? _map$get : [];
      handlers.push(handler);
      map.set(eventName, handlers);
    }
  }, {
    key: "callHandlers",
    value: function callHandlers(map, eventName, event) {
      var _map$get2;
      (_map$get2 = map.get(eventName)) === null || _map$get2 === void 0 ? void 0 : _map$get2.forEach(function (callback) {
        return callback(event);
      });
    }
  }]);
  return EventTarget;
}();
;// CONCATENATED MODULE: ./src/AbstractChatClient.ts
function AbstractChatClient_typeof(obj) { "@babel/helpers - typeof"; return AbstractChatClient_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, AbstractChatClient_typeof(obj); }
function AbstractChatClient_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function AbstractChatClient_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, AbstractChatClient_toPropertyKey(descriptor.key), descriptor); } }
function AbstractChatClient_createClass(Constructor, protoProps, staticProps) { if (protoProps) AbstractChatClient_defineProperties(Constructor.prototype, protoProps); if (staticProps) AbstractChatClient_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (AbstractChatClient_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function AbstractChatClient_defineProperty(obj, key, value) { key = AbstractChatClient_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function AbstractChatClient_toPropertyKey(arg) { var key = AbstractChatClient_toPrimitive(arg, "string"); return AbstractChatClient_typeof(key) === "symbol" ? key : String(key); }
function AbstractChatClient_toPrimitive(input, hint) { if (AbstractChatClient_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (AbstractChatClient_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var AbstractChatClient = /*#__PURE__*/function (_EventTarget) {
  _inherits(AbstractChatClient, _EventTarget);
  var _super = _createSuper(AbstractChatClient);
  function AbstractChatClient() {
    var _this;
    AbstractChatClient_classCallCheck(this, AbstractChatClient);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    AbstractChatClient_defineProperty(_assertThisInitialized(_this), "awaitingResponse", new Map());
    AbstractChatClient_defineProperty(_assertThisInitialized(_this), "sentCounter", 0);
    return _this;
  }
  AbstractChatClient_createClass(AbstractChatClient, [{
    key: "on",
    value: function on(eventName, handler) {
      return _get(_getPrototypeOf(AbstractChatClient.prototype), "on", this).call(this, eventName, handler);
    }
  }, {
    key: "once",
    value: function once(eventName, handler) {
      return _get(_getPrototypeOf(AbstractChatClient.prototype), "once", this).call(this, eventName, handler);
    }
  }, {
    key: "createEnvelope",
    value: function createEnvelope(type, data) {
      return {
        type: type,
        data: data,
        ref: (++this.sentCounter).toString()
      };
    }
  }, {
    key: "createPromiseFromCommandEnvelope",
    value: function createPromiseFromCommandEnvelope(envelope) {
      var _this2 = this;
      return new Promise(function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return _this2.awaitingResponse.set(envelope.ref, args);
      });
    }
  }, {
    key: "handleIncomingEnvelope",
    value: function handleIncomingEnvelope(envelope) {
      if (!this.awaitingResponse.has(envelope.ref)) {
        return;
      }
      var isError = envelope.type === 'Error';
      this.awaitingResponse.get(envelope.ref)[0]({
        data: isError ? null : envelope.data,
        error: isError ? envelope.data : null
      });
      this.awaitingResponse["delete"](envelope.ref);
    }
  }, {
    key: "handleEnvelopeSendError",
    value: function handleEnvelopeSendError(envelope, error) {
      if (!this.awaitingResponse.has(envelope.ref)) {
        return;
      }
      this.awaitingResponse.get(envelope.ref)[0](error);
      this.awaitingResponse["delete"](envelope.ref);
    }
  }]);
  return AbstractChatClient;
}(EventTarget);
;// CONCATENATED MODULE: ./src/IndexedObjectCollection.ts
function IndexedObjectCollection_typeof(obj) { "@babel/helpers - typeof"; return IndexedObjectCollection_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, IndexedObjectCollection_typeof(obj); }
function IndexedObjectCollection_get() { if (typeof Reflect !== "undefined" && Reflect.get) { IndexedObjectCollection_get = Reflect.get.bind(); } else { IndexedObjectCollection_get = function _get(target, property, receiver) { var base = IndexedObjectCollection_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return IndexedObjectCollection_get.apply(this, arguments); }
function IndexedObjectCollection_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = IndexedObjectCollection_getPrototypeOf(object); if (object === null) break; } return object; }
function IndexedObjectCollection_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) IndexedObjectCollection_setPrototypeOf(subClass, superClass); }
function IndexedObjectCollection_setPrototypeOf(o, p) { IndexedObjectCollection_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return IndexedObjectCollection_setPrototypeOf(o, p); }
function IndexedObjectCollection_createSuper(Derived) { var hasNativeReflectConstruct = IndexedObjectCollection_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = IndexedObjectCollection_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = IndexedObjectCollection_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return IndexedObjectCollection_possibleConstructorReturn(this, result); }; }
function IndexedObjectCollection_possibleConstructorReturn(self, call) { if (call && (IndexedObjectCollection_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return IndexedObjectCollection_assertThisInitialized(self); }
function IndexedObjectCollection_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function IndexedObjectCollection_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function IndexedObjectCollection_getPrototypeOf(o) { IndexedObjectCollection_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return IndexedObjectCollection_getPrototypeOf(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function IndexedObjectCollection_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function IndexedObjectCollection_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, IndexedObjectCollection_toPropertyKey(descriptor.key), descriptor); } }
function IndexedObjectCollection_createClass(Constructor, protoProps, staticProps) { if (protoProps) IndexedObjectCollection_defineProperties(Constructor.prototype, protoProps); if (staticProps) IndexedObjectCollection_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function IndexedObjectCollection_defineProperty(obj, key, value) { key = IndexedObjectCollection_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function IndexedObjectCollection_toPropertyKey(arg) { var key = IndexedObjectCollection_toPrimitive(arg, "string"); return IndexedObjectCollection_typeof(key) === "symbol" ? key : String(key); }
function IndexedObjectCollection_toPrimitive(input, hint) { if (IndexedObjectCollection_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (IndexedObjectCollection_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var IndexedCollection = /*#__PURE__*/function () {
  function IndexedCollection() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    IndexedObjectCollection_classCallCheck(this, IndexedCollection);
    IndexedObjectCollection_defineProperty(this, "_items", new Map());
    this.set.apply(this, _toConsumableArray(items));
  }
  IndexedObjectCollection_createClass(IndexedCollection, [{
    key: "items",
    get: function get() {
      return this._items;
    }
  }, {
    key: "length",
    get: function get() {
      return this._items.size;
    }
  }, {
    key: "set",
    value: function set() {
      for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }
      for (var _i = 0, _items = items; _i < _items.length; _i++) {
        var _item = _items[_i];
        this._items.set(_item[0], _item[1]);
      }
    }
  }, {
    key: "get",
    value: function get(id) {
      return this.items.get(id);
    }
  }, {
    key: "has",
    value: function has(id) {
      return this.items.has(id);
    }
  }, {
    key: "delete",
    value: function _delete() {
      for (var _len2 = arguments.length, ids = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        ids[_key2] = arguments[_key2];
      }
      for (var _i2 = 0, _ids = ids; _i2 < _ids.length; _i2++) {
        var _id = _ids[_i2];
        this.items["delete"](_id);
      }
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      this.items.clear();
    }
  }, {
    key: "findBy",
    value: function findBy(field, valueToFind) {
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var result = new IndexedCollection();
      var item;
      while (!(item = this.items.entries().next().value).done) {
        if (limit && result.length === limit) {
          break;
        }
        if (item[1][field] === valueToFind) {
          result.set(item);
        }
      }
      return result;
    }
  }, {
    key: "map",
    value: function map(callback) {
      return Array.from(this.items.entries()).map(function (entry) {
        return callback(entry[1], entry[0]);
      });
    }
  }]);
  return IndexedCollection;
}();
var IndexedObjectCollection = /*#__PURE__*/function () {
  function IndexedObjectCollection(id) {
    var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    IndexedObjectCollection_classCallCheck(this, IndexedObjectCollection);
    this.id = id;
    IndexedObjectCollection_defineProperty(this, "_items", void 0);
    this._items = new IndexedCollection();
    this.set.apply(this, _toConsumableArray(items));
  }
  IndexedObjectCollection_createClass(IndexedObjectCollection, [{
    key: "items",
    get: function get() {
      return Array.from(this._items.items.values());
    }
  }, {
    key: "length",
    get: function get() {
      return this._items.length;
    }
  }, {
    key: "set",
    value: function set() {
      var _this$_items,
        _this = this;
      for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        items[_key3] = arguments[_key3];
      }
      (_this$_items = this._items).set.apply(_this$_items, _toConsumableArray(items.map(function (item) {
        return [_this.getId(item), item];
      })));
    }
  }, {
    key: "get",
    value: function get(id) {
      return this._items.get(id);
    }
  }, {
    key: "getAt",
    value: function getAt(index) {
      return this.items[index];
    }
  }, {
    key: "has",
    value: function has(id) {
      return this._items.has(id);
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this$_items2;
      (_this$_items2 = this._items)["delete"].apply(_this$_items2, arguments);
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      this._items.deleteAll();
    }
  }, {
    key: "findBy",
    value: function findBy(field, valueToFind) {
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var result = new IndexedObjectCollection(this.id);
      var _iterator = _createForOfIteratorHelper(this.items),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _value = _step.value;
          if (limit && result.length === limit) {
            break;
          }
          if (_value[field] === valueToFind) {
            result.set(_value);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return result;
    }
  }, {
    key: "map",
    value: function map(callback) {
      return this.items.map(callback);
    }
  }, {
    key: "getId",
    value: function getId(item) {
      return typeof this.id === 'function' ? this.id(item) : item[this.id];
    }
  }]);
  return IndexedObjectCollection;
}();
var ObservableIndexedCollection = /*#__PURE__*/function (_IndexedCollection) {
  IndexedObjectCollection_inherits(ObservableIndexedCollection, _IndexedCollection);
  var _super = IndexedObjectCollection_createSuper(ObservableIndexedCollection);
  function ObservableIndexedCollection() {
    var _this3;
    var _this2;
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    IndexedObjectCollection_classCallCheck(this, ObservableIndexedCollection);
    _this2 = _super.call(this);
    IndexedObjectCollection_defineProperty(IndexedObjectCollection_assertThisInitialized(_this2), "eventTarget", void 0);
    _this2.eventTarget = new EventTarget();
    (_this3 = _this2).set.apply(_this3, _toConsumableArray(items));
    return _this2;
  }
  IndexedObjectCollection_createClass(ObservableIndexedCollection, [{
    key: "set",
    value: function set() {
      for (var _len4 = arguments.length, items = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        items[_key4] = arguments[_key4];
      }
      if (items.length) {
        var _get2;
        (_get2 = IndexedObjectCollection_get(IndexedObjectCollection_getPrototypeOf(ObservableIndexedCollection.prototype), "set", this)).call.apply(_get2, [this].concat(items));
        this.eventTarget.emit('change', {
          setItems: items.map(function (item) {
            return item[0];
          })
        });
      }
    }
  }, {
    key: "delete",
    value: function _delete() {
      for (var _len5 = arguments.length, ids = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        ids[_key5] = arguments[_key5];
      }
      if (ids.length) {
        var _get3;
        (_get3 = IndexedObjectCollection_get(IndexedObjectCollection_getPrototypeOf(ObservableIndexedCollection.prototype), "delete", this)).call.apply(_get3, [this].concat(ids));
        this.eventTarget.emit('change', {
          deletedItems: ids
        });
      }
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      if (this.length) {
        var ids = this._items.keys();
        IndexedObjectCollection_get(IndexedObjectCollection_getPrototypeOf(ObservableIndexedCollection.prototype), "deleteAll", this).call(this);
        this.eventTarget.emit('change', {
          deletedItems: Array.from(ids)
        });
      }
    }
  }, {
    key: "on",
    value: function on(eventName, handler) {
      this.eventTarget.on(eventName, handler);
      return this;
    }
  }, {
    key: "once",
    value: function once(eventName, handler) {
      this.eventTarget.once(eventName, handler);
      return this;
    }
  }, {
    key: "off",
    value: function off(eventName, handler) {
      this.eventTarget.off(eventName, handler);
      return this;
    }
  }]);
  return ObservableIndexedCollection;
}(IndexedCollection);
var ObservableIndexedObjectCollection = /*#__PURE__*/function (_IndexedObjectCollect) {
  IndexedObjectCollection_inherits(ObservableIndexedObjectCollection, _IndexedObjectCollect);
  var _super2 = IndexedObjectCollection_createSuper(ObservableIndexedObjectCollection);
  function ObservableIndexedObjectCollection(id) {
    var _this5;
    var _this4;
    var items = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    IndexedObjectCollection_classCallCheck(this, ObservableIndexedObjectCollection);
    _this4 = _super2.call(this, id);
    _this4.id = id;
    IndexedObjectCollection_defineProperty(IndexedObjectCollection_assertThisInitialized(_this4), "eventTarget", void 0);
    _this4.eventTarget = new EventTarget();
    (_this5 = _this4).set.apply(_this5, _toConsumableArray(items));
    return _this4;
  }
  IndexedObjectCollection_createClass(ObservableIndexedObjectCollection, [{
    key: "set",
    value: function set() {
      var _this6 = this;
      for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        items[_key6] = arguments[_key6];
      }
      if (items.length) {
        var _get4;
        (_get4 = IndexedObjectCollection_get(IndexedObjectCollection_getPrototypeOf(ObservableIndexedObjectCollection.prototype), "set", this)).call.apply(_get4, [this].concat(items));
        this.eventTarget.emit('change', {
          setItems: items.map(function (item) {
            return _this6.getId(item);
          })
        });
      }
    }
  }, {
    key: "delete",
    value: function _delete() {
      for (var _len7 = arguments.length, ids = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        ids[_key7] = arguments[_key7];
      }
      if (ids.length) {
        var _get5;
        (_get5 = IndexedObjectCollection_get(IndexedObjectCollection_getPrototypeOf(ObservableIndexedObjectCollection.prototype), "delete", this)).call.apply(_get5, [this].concat(ids));
        this.eventTarget.emit('change', {
          deletedItems: ids
        });
      }
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      if (this.length) {
        var ids = this._items.items.keys();
        IndexedObjectCollection_get(IndexedObjectCollection_getPrototypeOf(ObservableIndexedObjectCollection.prototype), "deleteAll", this).call(this);
        this.eventTarget.emit('change', {
          deletedItems: Array.from(ids)
        });
      }
    }
  }, {
    key: "on",
    value: function on(eventName, handler) {
      this.eventTarget.on(eventName, handler);
      return this;
    }
  }, {
    key: "once",
    value: function once(eventName, handler) {
      this.eventTarget.once(eventName, handler);
      return this;
    }
  }, {
    key: "off",
    value: function off(eventName, handler) {
      this.eventTarget.off(eventName, handler);
      return this;
    }
  }]);
  return ObservableIndexedObjectCollection;
}(IndexedObjectCollection);
;// CONCATENATED MODULE: ./src/ChatStateTracker.ts
function ChatStateTracker_typeof(obj) { "@babel/helpers - typeof"; return ChatStateTracker_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, ChatStateTracker_typeof(obj); }
function ChatStateTracker_toConsumableArray(arr) { return ChatStateTracker_arrayWithoutHoles(arr) || ChatStateTracker_iterableToArray(arr) || ChatStateTracker_unsupportedIterableToArray(arr) || ChatStateTracker_nonIterableSpread(); }
function ChatStateTracker_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function ChatStateTracker_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return ChatStateTracker_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ChatStateTracker_arrayLikeToArray(o, minLen); }
function ChatStateTracker_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function ChatStateTracker_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return ChatStateTracker_arrayLikeToArray(arr); }
function ChatStateTracker_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == ChatStateTracker_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ChatStateTracker_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function ChatStateTracker_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, ChatStateTracker_toPropertyKey(descriptor.key), descriptor); } }
function ChatStateTracker_createClass(Constructor, protoProps, staticProps) { if (protoProps) ChatStateTracker_defineProperties(Constructor.prototype, protoProps); if (staticProps) ChatStateTracker_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function ChatStateTracker_defineProperty(obj, key, value) { key = ChatStateTracker_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function ChatStateTracker_toPropertyKey(arg) { var key = ChatStateTracker_toPrimitive(arg, "string"); return ChatStateTracker_typeof(key) === "symbol" ? key : String(key); }
function ChatStateTracker_toPrimitive(input, hint) { if (ChatStateTracker_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (ChatStateTracker_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var ChatStateTracker = /*#__PURE__*/function () {
  // Temporary not lazy loaded; server must implement GetTopicMessages command.

  // lazy loaded collections

  function ChatStateTracker(client) {
    ChatStateTracker_classCallCheck(this, ChatStateTracker);
    this.client = client;
    ChatStateTracker_defineProperty(this, "joinedSpaces", new ObservableIndexedObjectCollection('id'));
    ChatStateTracker_defineProperty(this, "joinedRooms", new ObservableIndexedObjectCollection('id'));
    ChatStateTracker_defineProperty(this, "spacesRoles", new IndexedCollection());
    ChatStateTracker_defineProperty(this, "roomsTopics", new IndexedCollection());
    ChatStateTracker_defineProperty(this, "topicsMessages", new IndexedCollection());
    ChatStateTracker_defineProperty(this, "spacesRooms", new IndexedCollection());
    ChatStateTracker_defineProperty(this, "spacesMembers", new IndexedCollection());
    ChatStateTracker_defineProperty(this, "roomsMembers", new IndexedCollection());
    ChatStateTracker_defineProperty(this, "deferredGetters", new IndexedCollection());
    ChatStateTracker_defineProperty(this, "reconnecting", false);
    ChatStateTracker_defineProperty(this, "me", null);
    this.createDeferredGetter('session');
    this.bind();
  }
  ChatStateTracker_createClass(ChatStateTracker, [{
    key: "getMe",
    value: function () {
      var _getMe = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.deferredGetterReadiness('session');
              case 2:
                return _context.abrupt("return", this.me);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function getMe() {
        return _getMe.apply(this, arguments);
      }
      return getMe;
    }()
  }, {
    key: "getJoinedSpaces",
    value: function () {
      var _getJoinedSpaces = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.deferredGetterReadiness('session');
              case 2:
                return _context2.abrupt("return", this.joinedSpaces);
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function getJoinedSpaces() {
        return _getJoinedSpaces.apply(this, arguments);
      }
      return getJoinedSpaces;
    }()
  }, {
    key: "getJoinedRooms",
    value: function () {
      var _getJoinedRooms = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.deferredGetterReadiness('session');
              case 2:
                return _context3.abrupt("return", this.joinedRooms);
              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function getJoinedRooms() {
        return _getJoinedRooms.apply(this, arguments);
      }
      return getJoinedRooms;
    }()
  }, {
    key: "getSpaceRoles",
    value: function () {
      var _getSpaceRoles = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(spaceId) {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.deferredGetterReadiness('session');
              case 2:
                return _context4.abrupt("return", this.spacesRoles.get(spaceId));
              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function getSpaceRoles(_x) {
        return _getSpaceRoles.apply(this, arguments);
      }
      return getSpaceRoles;
    }()
  }, {
    key: "getRoomTopics",
    value: function () {
      var _getRoomTopics = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(roomId) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.deferredGetterReadiness('session');
              case 2:
                return _context5.abrupt("return", this.roomsTopics.get(roomId));
              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function getRoomTopics(_x2) {
        return _getRoomTopics.apply(this, arguments);
      }
      return getRoomTopics;
    }()
  }, {
    key: "getTopicMessages",
    value: function () {
      var _getTopicMessages = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(topicId) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this.topicsMessages.get(topicId));
              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function getTopicMessages(_x3) {
        return _getTopicMessages.apply(this, arguments);
      }
      return getTopicMessages;
    }()
  }, {
    key: "getSpaceRooms",
    value: function () {
      var _getSpaceRooms = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(spaceId) {
        var deferredGetterName;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                deferredGetterName = "spaces-rooms-".concat(spaceId);
                if (!this.spacesRooms.has(spaceId) && !this.deferredGetters.has(deferredGetterName)) {
                  this.createDeferredGetter(deferredGetterName);
                  this.client.send('GetSpaceRooms', {
                    id: spaceId
                  });
                }
                _context7.next = 4;
                return this.deferredGetterReadiness(deferredGetterName);
              case 4:
                return _context7.abrupt("return", this.spacesRooms.get(spaceId));
              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function getSpaceRooms(_x4) {
        return _getSpaceRooms.apply(this, arguments);
      }
      return getSpaceRooms;
    }()
  }, {
    key: "getSpaceMembers",
    value: function () {
      var _getSpaceMembers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(spaceId) {
        var deferredGetterName;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                deferredGetterName = "spaces-members-".concat(spaceId);
                if (!this.spacesMembers.has(spaceId) && !this.deferredGetters.has(deferredGetterName)) {
                  this.createDeferredGetter(deferredGetterName);
                  this.client.send('GetSpaceMembers', {
                    id: spaceId
                  });
                }
                _context8.next = 4;
                return this.deferredGetterReadiness(deferredGetterName);
              case 4:
                return _context8.abrupt("return", this.spacesMembers.get(spaceId));
              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function getSpaceMembers(_x5) {
        return _getSpaceMembers.apply(this, arguments);
      }
      return getSpaceMembers;
    }()
  }, {
    key: "getRoomMembers",
    value: function () {
      var _getRoomMembers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(roomId) {
        var deferredGetterName;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                deferredGetterName = "rooms-members-".concat(roomId);
                if (!this.roomsMembers.has(roomId) && !this.deferredGetters.has(deferredGetterName)) {
                  this.createDeferredGetter(deferredGetterName);
                  this.client.send('GetRoomMembers', {
                    id: roomId
                  });
                }
                _context9.next = 4;
                return this.deferredGetterReadiness(deferredGetterName);
              case 4:
                return _context9.abrupt("return", this.roomsMembers.get(roomId));
              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function getRoomMembers(_x6) {
        return _getRoomMembers.apply(this, arguments);
      }
      return getRoomMembers;
    }()
  }, {
    key: "deferredGetterReadiness",
    value: function () {
      var _deferredGetterReadiness = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(name) {
        var _this$deferredGetters;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!this.deferredGetters.has(name)) {
                  _context10.next = 3;
                  break;
                }
                _context10.next = 3;
                return (_this$deferredGetters = this.deferredGetters.get(name)) === null || _this$deferredGetters === void 0 ? void 0 : _this$deferredGetters.promise;
              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function deferredGetterReadiness(_x7) {
        return _deferredGetterReadiness.apply(this, arguments);
      }
      return deferredGetterReadiness;
    }()
  }, {
    key: "bind",
    value: function bind() {
      var _this = this;
      this.client.on(this.client.Event.disconnect, function (ev) {
        return _this.handleDisconnect(ev);
      });
      this.client.on('NewMessage', function (ev) {
        return _this.handleNewMessage(ev);
      });
      this.client.on('NewRole', function (ev) {
        return _this.handleNewRole(ev);
      });
      this.client.on('NewRoom', function (ev) {
        return _this.handleNewRoom(ev);
      });
      this.client.on('NewTopic', function (ev) {
        return _this.handleNewTopic(ev);
      });
      this.client.on('RoleDeleted', function (ev) {
        return _this.handleRoleDeleted(ev);
      });
      this.client.on('RoomDeleted', function (ev) {
        return _this.handleRoomDeleted(ev);
      });
      this.client.on('RoomJoined', function (ev) {
        return _this.handleRoomJoined(ev);
      });
      this.client.on('RoomLeft', function (ev) {
        return _this.handleRoomLeft(ev);
      });
      this.client.on('RoomMemberJoined', function (ev) {
        return _this.handleRoomMemberJoined(ev);
      });
      this.client.on('RoomMemberLeft', function (ev) {
        return _this.handleRoomMemberLeft(ev);
      });
      this.client.on('RoomMembers', function (ev) {
        return _this.handleRoomMembers(ev);
      });
      this.client.on('Session', function (ev) {
        return _this.handleSession(ev);
      });
      this.client.on('SpaceDeleted', function (ev) {
        return _this.handleSpaceDeleted(ev);
      });
      this.client.on('SpaceJoined', function (ev) {
        return _this.handleSpaceJoined(ev);
      });
      this.client.on('SpaceLeft', function (ev) {
        return _this.handleSpaceLeft(ev);
      });
      this.client.on('SpaceMemberJoined', function (ev) {
        return _this.handleSpaceMemberJoined(ev);
      });
      this.client.on('SpaceMemberLeft', function (ev) {
        return _this.handleSpaceMemberLeft(ev);
      });
      this.client.on('SpaceMembers', function (ev) {
        return _this.handleSpaceMembers(ev);
      });
      this.client.on('SpaceRooms', function (ev) {
        return _this.handleSpaceRooms(ev);
      });
      this.client.on('SpaceMemberUpdate', function (ev) {
        return _this.handleSpaceMemberUpdate(ev);
      });
      this.client.on('TopicDeleted', function (ev) {
        return _this.handleTopicDeleted(ev);
      });
    }
  }, {
    key: "createDeferredGetter",
    value: function createDeferredGetter(name) {
      if (this.deferredGetters.has(name)) {
        return;
      }
      var deferred = {
        promise: undefined,
        resolver: undefined
      };
      deferred.promise = new Promise(function (resolve) {
        return deferred.resolver = resolve;
      });
      this.deferredGetters.set([name, deferred]);
    }
  }, {
    key: "handleDisconnect",
    value: function handleDisconnect(reconnect) {
      if (reconnect) {
        this.reconnecting = true;
        return;
      }
    }
  }, {
    key: "handleNewMessage",
    value: function handleNewMessage(ev) {
      this.topicsMessages.get(ev.topicId).set(ev.message);
    }
  }, {
    key: "handleNewRole",
    value: function handleNewRole(ev) {
      var collection = this.spacesRoles.get(ev.spaceId);
      collection.set(ev.role);
      this.joinedSpaces.get(ev.spaceId).roles = collection.items;
    }
  }, {
    key: "handleNewRoom",
    value: function handleNewRoom(ev) {
      var _this$spacesRooms$get;
      (_this$spacesRooms$get = this.spacesRooms.get(ev.spaceId)) === null || _this$spacesRooms$get === void 0 ? void 0 : _this$spacesRooms$get.set(ev.summary);
    }
  }, {
    key: "handleNewTopic",
    value: function handleNewTopic(ev) {
      this.addJoinedRoomTopics(ev.roomId, ev.topic);
      this.joinedRooms.get(ev.roomId).topics.push(ev.topic);
    }
  }, {
    key: "addJoinedRoomTopics",
    value: function addJoinedRoomTopics(roomId) {
      var _this$topicsMessages;
      for (var _len = arguments.length, topics = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        topics[_key - 1] = arguments[_key];
      }
      if (this.roomsTopics.has(roomId)) {
        var _this$roomsTopics$get;
        (_this$roomsTopics$get = this.roomsTopics.get(roomId)).set.apply(_this$roomsTopics$get, topics);
      } else {
        this.roomsTopics.set([roomId, new ObservableIndexedObjectCollection('id', topics)]);
      }
      (_this$topicsMessages = this.topicsMessages).set.apply(_this$topicsMessages, ChatStateTracker_toConsumableArray(topics.map(function (topic) {
        return [topic.id, new ObservableIndexedObjectCollection('id')];
      })));
    }
  }, {
    key: "handleRoleDeleted",
    value: function handleRoleDeleted(ev) {
      var collection = this.spacesRoles.get(ev.spaceId);
      collection["delete"](ev.id);
      this.joinedSpaces.get(ev.spaceId).roles = collection.items;
    }
  }, {
    key: "handleRoomDeleted",
    value: function handleRoomDeleted(ev) {
      if (ev.spaceId) {
        this.spacesRooms.get(ev.spaceId)["delete"](ev.id);
      }
      this.deleteJoinedRooms(ev.id);
    }
  }, {
    key: "handleRoomJoined",
    value: function handleRoomJoined(ev) {
      this.addJoinedRooms(ev.room);
    }
  }, {
    key: "addJoinedRooms",
    value: function addJoinedRooms() {
      var _this$joinedRooms;
      for (var _len2 = arguments.length, rooms = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        rooms[_key2] = arguments[_key2];
      }
      for (var _i = 0, _rooms = rooms; _i < _rooms.length; _i++) {
        var room = _rooms[_i];
        this.addJoinedRoomTopics.apply(this, [room.id].concat(ChatStateTracker_toConsumableArray(room.topics)));
      }
      (_this$joinedRooms = this.joinedRooms).set.apply(_this$joinedRooms, rooms);
    }
  }, {
    key: "handleRoomLeft",
    value: function handleRoomLeft(ev) {
      this.deleteJoinedRooms(ev.id);
    }
  }, {
    key: "deleteJoinedRooms",
    value: function deleteJoinedRooms() {
      var _this$joinedRooms2, _this$roomsMembers, _this$topicsMessages2, _this$roomsTopics;
      for (var _len3 = arguments.length, roomIds = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        roomIds[_key3] = arguments[_key3];
      }
      (_this$joinedRooms2 = this.joinedRooms)["delete"].apply(_this$joinedRooms2, roomIds);
      (_this$roomsMembers = this.roomsMembers)["delete"].apply(_this$roomsMembers, roomIds);
      var topicIds = [];
      for (var _i2 = 0, _roomIds = roomIds; _i2 < _roomIds.length; _i2++) {
        var _this$roomsTopics$get2, _this$roomsTopics$get3;
        var roomId = _roomIds[_i2];
        topicIds.push.apply(topicIds, ChatStateTracker_toConsumableArray((_this$roomsTopics$get2 = (_this$roomsTopics$get3 = this.roomsTopics.get(roomId)) === null || _this$roomsTopics$get3 === void 0 ? void 0 : _this$roomsTopics$get3.map(function (topic) {
          return topic.id;
        })) !== null && _this$roomsTopics$get2 !== void 0 ? _this$roomsTopics$get2 : []));
      }
      (_this$topicsMessages2 = this.topicsMessages)["delete"].apply(_this$topicsMessages2, topicIds);
      (_this$roomsTopics = this.roomsTopics)["delete"].apply(_this$roomsTopics, roomIds);
    }
  }, {
    key: "handleRoomMemberJoined",
    value: function handleRoomMemberJoined(ev) {
      if (this.roomsMembers.has(ev.roomId)) {
        this.roomsMembers.get(ev.roomId).set(ev.member);
      }
    }
  }, {
    key: "handleRoomMemberLeft",
    value: function handleRoomMemberLeft(ev) {
      if (this.roomsMembers.has(ev.roomId)) {
        this.roomsMembers.get(ev.roomId)["delete"](ev.userId);
      }
    }
  }, {
    key: "handleRoomMembers",
    value: function handleRoomMembers(ev) {
      if (!this.roomsMembers.has(ev.id)) {
        var _this$deferredGetters2;
        this.roomsMembers.set([ev.id, new ObservableIndexedObjectCollection(function (member) {
          var _member$user$id, _member$user;
          return (_member$user$id = (_member$user = member.user) === null || _member$user === void 0 ? void 0 : _member$user.id) !== null && _member$user$id !== void 0 ? _member$user$id : member.spaceMember.user.id;
        }, ev.members)]);
        (_this$deferredGetters2 = this.deferredGetters.get("rooms-members-".concat(ev.id))) === null || _this$deferredGetters2 === void 0 ? void 0 : _this$deferredGetters2.resolver();
      }
    }
  }, {
    key: "handleSession",
    value: function handleSession(ev) {
      var _this$deferredGetters3;
      if (this.me && !this.reconnecting) {
        return;
      }
      this.me = ev.user;
      this.reconnecting = false;
      this.joinedRooms.deleteAll();
      this.roomsTopics.deleteAll();
      this.roomsMembers.deleteAll();
      this.joinedSpaces.deleteAll();
      this.spacesRoles.deleteAll();
      this.spacesRooms.deleteAll();
      this.spacesMembers.deleteAll();
      this.addJoinedRooms.apply(this, ChatStateTracker_toConsumableArray(ev.state.rooms));
      this.addJoinedSpaces.apply(this, ChatStateTracker_toConsumableArray(ev.state.spaces));
      (_this$deferredGetters3 = this.deferredGetters.get('session')) === null || _this$deferredGetters3 === void 0 ? void 0 : _this$deferredGetters3.resolver();
    }
  }, {
    key: "handleSpaceDeleted",
    value: function handleSpaceDeleted(ev) {
      this.deleteJoinedRooms.apply(this, ChatStateTracker_toConsumableArray(this.joinedRooms.findBy('spaceId', ev.id).map(function (room) {
        return room.id;
      })));
      this.spacesRoles["delete"](ev.id);
      this.spacesMembers["delete"](ev.id);
      this.spacesRooms["delete"](ev.id);
      this.joinedSpaces["delete"](ev.id);
    }
  }, {
    key: "handleSpaceJoined",
    value: function handleSpaceJoined(ev) {
      this.addJoinedSpaces(ev.space);
    }
  }, {
    key: "addJoinedSpaces",
    value: function addJoinedSpaces() {
      var _this$spacesRoles, _this$joinedSpaces;
      for (var _len4 = arguments.length, spaces = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        spaces[_key4] = arguments[_key4];
      }
      (_this$spacesRoles = this.spacesRoles).set.apply(_this$spacesRoles, ChatStateTracker_toConsumableArray(spaces.map(function (space) {
        return [space.id, new ObservableIndexedObjectCollection('id', space.roles)];
      })));
      (_this$joinedSpaces = this.joinedSpaces).set.apply(_this$joinedSpaces, spaces);
    }
  }, {
    key: "handleSpaceLeft",
    value: function handleSpaceLeft(ev) {
      this.handleSpaceDeleted(ev);
    }
  }, {
    key: "handleSpaceMemberJoined",
    value: function handleSpaceMemberJoined(ev) {
      if (this.spacesMembers.has(ev.spaceId)) {
        this.spacesMembers.get(ev.spaceId).set(ev.member);
      }
    }
  }, {
    key: "handleSpaceMemberLeft",
    value: function handleSpaceMemberLeft(ev) {
      if (this.spacesMembers.has(ev.spaceId)) {
        this.spacesMembers.get(ev.spaceId)["delete"](ev.userId);
      }
    }
  }, {
    key: "handleSpaceMembers",
    value: function handleSpaceMembers(ev) {
      if (!this.spacesMembers.has(ev.id)) {
        var _this$deferredGetters4;
        this.spacesMembers.set([ev.id, new ObservableIndexedObjectCollection(function (member) {
          return member === null || member === void 0 ? void 0 : member.user.id;
        }, ev.members)]);
        (_this$deferredGetters4 = this.deferredGetters.get("spaces-members-".concat(ev.id))) === null || _this$deferredGetters4 === void 0 ? void 0 : _this$deferredGetters4.resolver();
      }
    }
  }, {
    key: "handleSpaceRooms",
    value: function handleSpaceRooms(ev) {
      if (!this.spacesRooms.has(ev.id)) {
        var _this$deferredGetters5;
        this.spacesRooms.set([ev.id, new ObservableIndexedObjectCollection('id', ev.summaries)]);
        (_this$deferredGetters5 = this.deferredGetters.get("spaces-rooms-".concat(ev.id))) === null || _this$deferredGetters5 === void 0 ? void 0 : _this$deferredGetters5.resolver();
      }
    }
  }, {
    key: "handleSpaceMemberUpdate",
    value: function handleSpaceMemberUpdate(ev) {
      if (this.spacesMembers.has(ev.spaceId)) {
        this.spacesMembers.get(ev.spaceId).set(ev.member);
      }
    }
  }, {
    key: "handleTopicDeleted",
    value: function handleTopicDeleted(ev) {
      var collection = this.roomsTopics.get(ev.roomId);
      collection["delete"](ev.id);
      this.joinedRooms.get(ev.roomId).topics = collection.items;
    }
  }]);
  return ChatStateTracker;
}();
;// CONCATENATED MODULE: ./src/WebSocketChatClient.ts
function WebSocketChatClient_typeof(obj) { "@babel/helpers - typeof"; return WebSocketChatClient_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, WebSocketChatClient_typeof(obj); }
function WebSocketChatClient_toConsumableArray(arr) { return WebSocketChatClient_arrayWithoutHoles(arr) || WebSocketChatClient_iterableToArray(arr) || WebSocketChatClient_unsupportedIterableToArray(arr) || WebSocketChatClient_nonIterableSpread(); }
function WebSocketChatClient_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function WebSocketChatClient_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return WebSocketChatClient_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return WebSocketChatClient_arrayLikeToArray(o, minLen); }
function WebSocketChatClient_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function WebSocketChatClient_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return WebSocketChatClient_arrayLikeToArray(arr); }
function WebSocketChatClient_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function WebSocketChatClient_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ WebSocketChatClient_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == WebSocketChatClient_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function WebSocketChatClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function WebSocketChatClient_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { WebSocketChatClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { WebSocketChatClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function WebSocketChatClient_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function WebSocketChatClient_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, WebSocketChatClient_toPropertyKey(descriptor.key), descriptor); } }
function WebSocketChatClient_createClass(Constructor, protoProps, staticProps) { if (protoProps) WebSocketChatClient_defineProperties(Constructor.prototype, protoProps); if (staticProps) WebSocketChatClient_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function WebSocketChatClient_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) WebSocketChatClient_setPrototypeOf(subClass, superClass); }
function WebSocketChatClient_setPrototypeOf(o, p) { WebSocketChatClient_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return WebSocketChatClient_setPrototypeOf(o, p); }
function WebSocketChatClient_createSuper(Derived) { var hasNativeReflectConstruct = WebSocketChatClient_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = WebSocketChatClient_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = WebSocketChatClient_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return WebSocketChatClient_possibleConstructorReturn(this, result); }; }
function WebSocketChatClient_possibleConstructorReturn(self, call) { if (call && (WebSocketChatClient_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return WebSocketChatClient_assertThisInitialized(self); }
function WebSocketChatClient_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function WebSocketChatClient_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function WebSocketChatClient_getPrototypeOf(o) { WebSocketChatClient_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return WebSocketChatClient_getPrototypeOf(o); }
function WebSocketChatClient_defineProperty(obj, key, value) { key = WebSocketChatClient_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function WebSocketChatClient_toPropertyKey(arg) { var key = WebSocketChatClient_toPrimitive(arg, "string"); return WebSocketChatClient_typeof(key) === "symbol" ? key : String(key); }
function WebSocketChatClient_toPrimitive(input, hint) { if (WebSocketChatClient_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (WebSocketChatClient_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var WebSocketChatClientEvent;
(function (WebSocketChatClientEvent) {
  WebSocketChatClientEvent["connect"] = "connect";
  WebSocketChatClientEvent["disconnect"] = "disconnect";
  WebSocketChatClientEvent["message"] = "message";
  WebSocketChatClientEvent["error"] = "error";
})(WebSocketChatClientEvent || (WebSocketChatClientEvent = {}));
var WebSocketChatClient = /*#__PURE__*/function (_AbstractChatClient) {
  WebSocketChatClient_inherits(WebSocketChatClient, _AbstractChatClient);
  var _super = WebSocketChatClient_createSuper(WebSocketChatClient);
  function WebSocketChatClient(options) {
    var _this$options$stateTr;
    var _this;
    WebSocketChatClient_classCallCheck(this, WebSocketChatClient);
    _this = _super.call(this);
    _this.options = options;
    WebSocketChatClient_defineProperty(WebSocketChatClient_assertThisInitialized(_this), "Event", WebSocketChatClientEvent);
    WebSocketChatClient_defineProperty(WebSocketChatClient_assertThisInitialized(_this), "state", void 0);
    WebSocketChatClient_defineProperty(WebSocketChatClient_assertThisInitialized(_this), "ws", null);
    WebSocketChatClient_defineProperty(WebSocketChatClient_assertThisInitialized(_this), "sendQueue", []);
    WebSocketChatClient_defineProperty(WebSocketChatClient_assertThisInitialized(_this), "connectingTimeoutId", void 0);
    WebSocketChatClient_defineProperty(WebSocketChatClient_assertThisInitialized(_this), "authenticated", void 0);
    WebSocketChatClient_defineProperty(WebSocketChatClient_assertThisInitialized(_this), "authenticatedResolvers", void 0);
    if (!_this.options.token && !_this.options.temporaryNick) {
      throw new Error('Token or temporary nick is required');
    }
    if ((_this$options$stateTr = _this.options.stateTracking) !== null && _this$options$stateTr !== void 0 ? _this$options$stateTr : true) {
      _this.state = new ChatStateTracker(WebSocketChatClient_assertThisInitialized(_this));
    }
    return _this;
  }
  WebSocketChatClient_createClass(WebSocketChatClient, [{
    key: "connect",
    value: function () {
      var _connect = WebSocketChatClient_asyncToGenerator( /*#__PURE__*/WebSocketChatClient_regeneratorRuntime().mark(function _callee() {
        var _this2 = this,
          _this$options$connect;
        var authString;
        return WebSocketChatClient_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                authString = this.options.token ? "token=".concat(this.options.token) : "nick=".concat(this.options.temporaryNick);
                this.ws = new WebSocket("".concat(this.options.url, "?").concat(authString));
                this.ws.onclose = function (ev) {
                  return _this2.onClose(ev);
                };
                this.ws.onmessage = function (ev) {
                  return _this2.onMessage(ev);
                };
                this.connectingTimeoutId = setTimeout(function () {
                  return _this2.triggerConnectionTimeout();
                }, (_this$options$connect = this.options.connectingTimeoutMs) !== null && _this$options$connect !== void 0 ? _this$options$connect : 10000);
                this.authenticated = false;
                return _context.abrupt("return", new Promise(function () {
                  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                  }
                  return _this2.authenticatedResolvers = args;
                }));
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
  }, {
    key: "disconnect",
    value: function disconnect() {
      var _this$ws;
      this.sendQueue = [];
      (_this$ws = this.ws) === null || _this$ws === void 0 ? void 0 : _this$ws.close();
      this.ws = null;
    }
  }, {
    key: "send",
    value: function () {
      var _send = WebSocketChatClient_asyncToGenerator( /*#__PURE__*/WebSocketChatClient_regeneratorRuntime().mark(function _callee2(commandType, commandData) {
        var envelope;
        return WebSocketChatClient_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.ws || [this.ws.CLOSED, this.ws.CLOSING].includes(this.ws.readyState))) {
                  _context2.next = 2;
                  break;
                }
                throw new Error('Cannot send; close or closing connection state');
              case 2:
                if (!(this.ws.readyState === this.ws.CONNECTING || !this.authenticated)) {
                  _context2.next = 5;
                  break;
                }
                this.sendQueue.push([commandType, commandData]);
                return _context2.abrupt("return");
              case 5:
                if (!(this.ws.readyState !== this.ws.OPEN)) {
                  _context2.next = 7;
                  break;
                }
                throw new Error("Invalid websocket state=".concat(this.ws.readyState));
              case 7:
                envelope = this.createEnvelope(commandType, commandData);
                this.ws.send(JSON.stringify(envelope));
                return _context2.abrupt("return", this.createPromiseFromCommandEnvelope(envelope));
              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function send(_x, _x2) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "onMessage",
    value: function onMessage(event) {
      var envelope = JSON.parse(event.data);
      this.handleIncomingEnvelope(envelope);
      this.emit(envelope.type, envelope.data);
      this.emit(this.Event.message, envelope);

      // Login successfully
      if (!this.authenticated) {
        var isAuthenticated = envelope.type !== 'Error';
        this.authenticated = isAuthenticated;
        if (isAuthenticated) {
          this.authenticatedResolvers[0]();
          this.emit(this.Event.connect);
          this.sendFromQueue();
        } else {
          this.authenticatedResolvers[1](envelope.data);
        }
      }
    }
  }, {
    key: "onClose",
    value: function onClose(event) {
      clearTimeout(this.connectingTimeoutId);
      var reconnect = event.code !== 1000; // Connection was closed because of error
      if (reconnect) {
        this.connect();
      }
      this.emit(this.Event.disconnect, reconnect);
    }
  }, {
    key: "sendFromQueue",
    value: function sendFromQueue() {
      var _this3 = this;
      // Send awaiting data to server
      var lastDelay = 0;
      var _loop = function _loop(dataIndex) {
        var _this3$options$awaitQ;
        var data = _this3.sendQueue[dataIndex];
        setTimeout(function () {
          return _this3.send.apply(_this3, WebSocketChatClient_toConsumableArray(data));
        }, lastDelay);
        lastDelay += (_this3$options$awaitQ = _this3.options.awaitQueueSendDelayMs) !== null && _this3$options$awaitQ !== void 0 ? _this3$options$awaitQ : 500;
      };
      for (var dataIndex in this.sendQueue) {
        _loop(dataIndex);
      }
      this.sendQueue = [];
      clearTimeout(this.connectingTimeoutId);
    }
  }, {
    key: "triggerConnectionTimeout",
    value: function triggerConnectionTimeout() {
      this.disconnect();
      this.emit(this.Event.error, new Error('Connection timeout'));
    }
  }]);
  return WebSocketChatClient;
}(AbstractChatClient);
;// CONCATENATED MODULE: ./src/WebApiChatClient.ts
function WebApiChatClient_typeof(obj) { "@babel/helpers - typeof"; return WebApiChatClient_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, WebApiChatClient_typeof(obj); }
function WebApiChatClient_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ WebApiChatClient_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == WebApiChatClient_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function WebApiChatClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function WebApiChatClient_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { WebApiChatClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { WebApiChatClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function WebApiChatClient_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function WebApiChatClient_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, WebApiChatClient_toPropertyKey(descriptor.key), descriptor); } }
function WebApiChatClient_createClass(Constructor, protoProps, staticProps) { if (protoProps) WebApiChatClient_defineProperties(Constructor.prototype, protoProps); if (staticProps) WebApiChatClient_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function WebApiChatClient_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) WebApiChatClient_setPrototypeOf(subClass, superClass); }
function WebApiChatClient_setPrototypeOf(o, p) { WebApiChatClient_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return WebApiChatClient_setPrototypeOf(o, p); }
function WebApiChatClient_createSuper(Derived) { var hasNativeReflectConstruct = WebApiChatClient_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = WebApiChatClient_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = WebApiChatClient_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return WebApiChatClient_possibleConstructorReturn(this, result); }; }
function WebApiChatClient_possibleConstructorReturn(self, call) { if (call && (WebApiChatClient_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return WebApiChatClient_assertThisInitialized(self); }
function WebApiChatClient_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function WebApiChatClient_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function WebApiChatClient_getPrototypeOf(o) { WebApiChatClient_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return WebApiChatClient_getPrototypeOf(o); }
function WebApiChatClient_defineProperty(obj, key, value) { key = WebApiChatClient_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function WebApiChatClient_toPropertyKey(arg) { var key = WebApiChatClient_toPrimitive(arg, "string"); return WebApiChatClient_typeof(key) === "symbol" ? key : String(key); }
function WebApiChatClient_toPrimitive(input, hint) { if (WebApiChatClient_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (WebApiChatClient_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var WebApiChatClientEvent;
(function (WebApiChatClientEvent) {
  WebApiChatClientEvent["message"] = "message";
  WebApiChatClientEvent["error"] = "error";
  WebApiChatClientEvent["destroy"] = "destroy";
})(WebApiChatClientEvent || (WebApiChatClientEvent = {}));
var WebApiChatClient = /*#__PURE__*/function (_AbstractChatClient) {
  WebApiChatClient_inherits(WebApiChatClient, _AbstractChatClient);
  var _super = WebApiChatClient_createSuper(WebApiChatClient);
  function WebApiChatClient(options) {
    var _this;
    WebApiChatClient_classCallCheck(this, WebApiChatClient);
    _this = _super.call(this);
    _this.options = options;
    WebApiChatClient_defineProperty(WebApiChatClient_assertThisInitialized(_this), "Event", WebApiChatClientEvent);
    WebApiChatClient_defineProperty(WebApiChatClient_assertThisInitialized(_this), "sendStack", void 0);
    if (!_this.options.token && !_this.options.temporaryNick) {
      throw new Error('Token or temporary nick is required');
    }
    return _this;
  }
  WebApiChatClient_createClass(WebApiChatClient, [{
    key: "send",
    value: function () {
      var _send = WebApiChatClient_asyncToGenerator( /*#__PURE__*/WebApiChatClient_regeneratorRuntime().mark(function _callee(commandType, commandData) {
        var envelope;
        return WebApiChatClient_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                envelope = this.createEnvelope(commandType, commandData);
                this.sendStack.push({
                  data: envelope,
                  attempts: 0,
                  lastTimeoutId: null
                });
                this.makeApiCall(this.sendStack.length - 1);
                return _context.abrupt("return", this.createPromiseFromCommandEnvelope(envelope));
              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function send(_x, _x2) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;
      // Cancel all awaiting requests
      this.sendStack.forEach(function (item) {
        if (item.lastTimeoutId) {
          clearTimeout(item.lastTimeoutId);
        }
        _this2.awaitingResponse["delete"](item.data.ref);
      });
      this.sendStack = [];
      this.emit(this.Event.destroy, false);
    }
  }, {
    key: "onMessage",
    value: function () {
      var _onMessage = WebApiChatClient_asyncToGenerator( /*#__PURE__*/WebApiChatClient_regeneratorRuntime().mark(function _callee2(reqId, response) {
        var envelope;
        return WebApiChatClient_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.sendStack.splice(reqId, 1);
                _context2.next = 3;
                return response.json();
              case 3:
                envelope = _context2.sent;
                this.handleIncomingEnvelope(envelope);
                this.emit(envelope.type, envelope.data);
                this.emit(this.Event.message, envelope);
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function onMessage(_x3, _x4) {
        return _onMessage.apply(this, arguments);
      }
      return onMessage;
    }()
  }, {
    key: "onError",
    value: function onError(reqId, body) {
      var _this$options$attempt,
        _this3 = this,
        _this$options$attempt2;
      if (this.sendStack[reqId].attempts >= ((_this$options$attempt = this.options.attemptsToSend) !== null && _this$options$attempt !== void 0 ? _this$options$attempt : 10)) {
        this.sendStack.splice(reqId, 1);
        this.handleEnvelopeSendError(this.sendStack[reqId].data, new Error("Cannot send ".concat(body, "; aborting after reaching the maximum connection errors")));
        return;
      }
      this.sendStack[reqId].lastTimeoutId = setTimeout(function () {
        return _this3.makeApiCall(reqId);
      }, (_this$options$attempt2 = this.options.attemptDelayMs) !== null && _this$options$attempt2 !== void 0 ? _this$options$attempt2 : 3000);
    }
  }, {
    key: "makeApiCall",
    value: function makeApiCall(reqId) {
      var _this4 = this;
      this.sendStack[reqId].attempts++;
      var bodyJson = JSON.stringify(this.sendStack[reqId].data);
      var headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      };
      if (this.options.token) {
        headers.Authorization = "Bearer ".concat(this.options.token);
      } else if (this.options.temporaryNick) {
        headers.Authorization = "Temp ".concat(this.options.temporaryNick);
      }
      fetch(this.options.url, {
        headers: headers,
        body: bodyJson,
        method: 'POST'
      }).then(function (response) {
        return _this4.onMessage(reqId, response);
      })["catch"](function () {
        return _this4.onError(reqId, bodyJson);
      });
    }
  }]);
  return WebApiChatClient;
}(AbstractChatClient);
;// CONCATENATED MODULE: ./src/AbstractRestClient.ts
function AbstractRestClient_typeof(obj) { "@babel/helpers - typeof"; return AbstractRestClient_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, AbstractRestClient_typeof(obj); }
function AbstractRestClient_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ AbstractRestClient_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == AbstractRestClient_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function AbstractRestClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function AbstractRestClient_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { AbstractRestClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { AbstractRestClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function AbstractRestClient_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function AbstractRestClient_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, AbstractRestClient_toPropertyKey(descriptor.key), descriptor); } }
function AbstractRestClient_createClass(Constructor, protoProps, staticProps) { if (protoProps) AbstractRestClient_defineProperties(Constructor.prototype, protoProps); if (staticProps) AbstractRestClient_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function AbstractRestClient_defineProperty(obj, key, value) { key = AbstractRestClient_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function AbstractRestClient_toPropertyKey(arg) { var key = AbstractRestClient_toPrimitive(arg, "string"); return AbstractRestClient_typeof(key) === "symbol" ? key : String(key); }
function AbstractRestClient_toPrimitive(input, hint) { if (AbstractRestClient_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (AbstractRestClient_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var AbstractRestClient = /*#__PURE__*/function () {
  function AbstractRestClient(options) {
    AbstractRestClient_classCallCheck(this, AbstractRestClient);
    this.options = options;
    AbstractRestClient_defineProperty(this, "defaultUrl", void 0);
  }
  AbstractRestClient_createClass(AbstractRestClient, [{
    key: "send",
    value: function () {
      var _send = AbstractRestClient_asyncToGenerator( /*#__PURE__*/AbstractRestClient_regeneratorRuntime().mark(function _callee(method, uri) {
        var data,
          headers,
          url,
          body,
          result,
          _args = arguments;
        return AbstractRestClient_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _args.length > 2 && _args[2] !== undefined ? _args[2] : undefined;
                headers = {
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
                };
                if (this.options.token) {
                  headers.Authorization = "Bearer ".concat(this.options.token);
                }
                url = this.getUrl(uri);
                body = undefined;
                if (data) {
                  if (['GET', 'DELETE'].includes(method)) {
                    url += new URLSearchParams(data).toString();
                  } else {
                    body = JSON.stringify(data);
                  }
                }
                _context.next = 8;
                return fetch(url, {
                  method: method,
                  body: body,
                  headers: headers
                });
              case 8:
                result = _context.sent;
                _context.t0 = result.ok;
                _context.t1 = result.status;
                _context.next = 13;
                return result.json();
              case 13:
                _context.t2 = _context.sent;
                return _context.abrupt("return", {
                  ok: _context.t0,
                  status: _context.t1,
                  data: _context.t2
                });
              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function send(_x, _x2) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "getUrl",
    value: function getUrl(uri) {
      var _this$options$url;
      return this.removeEndingSlash((_this$options$url = this.options.url) !== null && _this$options$url !== void 0 ? _this$options$url : this.defaultUrl) + '/' + this.removeStartingSlash(uri);
    }
  }, {
    key: "removeStartingSlash",
    value: function removeStartingSlash(text) {
      return text.replace(/^\/+/, '');
    }
  }, {
    key: "removeEndingSlash",
    value: function removeEndingSlash(text) {
      return text.replace(/\/+$/, '');
    }
  }]);
  return AbstractRestClient;
}();
;// CONCATENATED MODULE: ./src/AuthClient.ts
function AuthClient_typeof(obj) { "@babel/helpers - typeof"; return AuthClient_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, AuthClient_typeof(obj); }
function AuthClient_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ AuthClient_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == AuthClient_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function AuthClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function AuthClient_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { AuthClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { AuthClient_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function AuthClient_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function AuthClient_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, AuthClient_toPropertyKey(descriptor.key), descriptor); } }
function AuthClient_createClass(Constructor, protoProps, staticProps) { if (protoProps) AuthClient_defineProperties(Constructor.prototype, protoProps); if (staticProps) AuthClient_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function AuthClient_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) AuthClient_setPrototypeOf(subClass, superClass); }
function AuthClient_setPrototypeOf(o, p) { AuthClient_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return AuthClient_setPrototypeOf(o, p); }
function AuthClient_createSuper(Derived) { var hasNativeReflectConstruct = AuthClient_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = AuthClient_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = AuthClient_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return AuthClient_possibleConstructorReturn(this, result); }; }
function AuthClient_possibleConstructorReturn(self, call) { if (call && (AuthClient_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return AuthClient_assertThisInitialized(self); }
function AuthClient_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function AuthClient_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function AuthClient_getPrototypeOf(o) { AuthClient_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return AuthClient_getPrototypeOf(o); }
function AuthClient_defineProperty(obj, key, value) { key = AuthClient_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function AuthClient_toPropertyKey(arg) { var key = AuthClient_toPrimitive(arg, "string"); return AuthClient_typeof(key) === "symbol" ? key : String(key); }
function AuthClient_toPrimitive(input, hint) { if (AuthClient_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (AuthClient_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var AuthClient = /*#__PURE__*/function (_AbstractRestClient) {
  AuthClient_inherits(AuthClient, _AbstractRestClient);
  var _super = AuthClient_createSuper(AuthClient);
  function AuthClient() {
    var _this;
    AuthClient_classCallCheck(this, AuthClient);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    AuthClient_defineProperty(AuthClient_assertThisInitialized(_this), "defaultUrl", 'https://polfan.pl/webservice/api');
    return _this;
  }
  AuthClient_createClass(AuthClient, [{
    key: "deleteToken",
    value: function () {
      var _deleteToken = AuthClient_asyncToGenerator( /*#__PURE__*/AuthClient_regeneratorRuntime().mark(function _callee(token) {
        var response;
        return AuthClient_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.send('DELETE', "auth/tokens/".concat(token));
              case 2:
                response = _context.sent;
                if (response.ok) {
                  _context.next = 5;
                  break;
                }
                throw new Error("Cannot delete access token: ".concat(response.data.errors[0]));
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function deleteToken(_x) {
        return _deleteToken.apply(this, arguments);
      }
      return deleteToken;
    }()
  }, {
    key: "getMe",
    value: function () {
      var _getMe = AuthClient_asyncToGenerator( /*#__PURE__*/AuthClient_regeneratorRuntime().mark(function _callee2() {
        var response;
        return AuthClient_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.send('GET', 'auth/me');
              case 2:
                response = _context2.sent;
                if (!response.ok) {
                  _context2.next = 6;
                  break;
                }
                response.data.id = response.data.id.toString();
                return _context2.abrupt("return", response.data);
              case 6:
                throw new Error("Cannot get current user account: ".concat(response.data.errors[0]));
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function getMe() {
        return _getMe.apply(this, arguments);
      }
      return getMe;
    }()
  }], [{
    key: "createToken",
    value: function () {
      var _createToken = AuthClient_asyncToGenerator( /*#__PURE__*/AuthClient_regeneratorRuntime().mark(function _callee3(login, password) {
        var clientName,
          response,
          _args3 = arguments;
        return AuthClient_regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                clientName = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 'pserv-js-client';
                _context3.next = 3;
                return new AuthClient({
                  token: null
                }).send('POST', 'auth/tokens', {
                  login: login,
                  password: password,
                  client_name: clientName
                });
              case 3:
                response = _context3.sent;
                if (!response.ok) {
                  _context3.next = 6;
                  break;
                }
                return _context3.abrupt("return", response.data);
              case 6:
                throw new Error("Cannot create user token: ".concat(response.data.errors[0]));
              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      function createToken(_x2, _x3) {
        return _createToken.apply(this, arguments);
      }
      return createToken;
    }()
  }]);
  return AuthClient;
}(AbstractRestClient);
;// CONCATENATED MODULE: ./src/index.ts





/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map