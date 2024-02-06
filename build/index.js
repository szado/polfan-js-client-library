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
  "Layer": () => (/* reexport */ Layer),
  "ObservableIndexedCollection": () => (/* reexport */ ObservableIndexedCollection),
  "ObservableIndexedObjectCollection": () => (/* reexport */ ObservableIndexedObjectCollection),
  "PermissionDefinition": () => (/* reexport */ PermissionDefinition),
  "Permissions": () => (/* reexport */ Permissions),
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
;// CONCATENATED MODULE: ./src/state-tracker/AsyncUtils.ts
function AsyncUtils_typeof(obj) { "@babel/helpers - typeof"; return AsyncUtils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, AsyncUtils_typeof(obj); }
function AsyncUtils_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, AsyncUtils_toPropertyKey(descriptor.key), descriptor); } }
function AsyncUtils_createClass(Constructor, protoProps, staticProps) { if (protoProps) AsyncUtils_defineProperties(Constructor.prototype, protoProps); if (staticProps) AsyncUtils_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function AsyncUtils_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function AsyncUtils_defineProperty(obj, key, value) { key = AsyncUtils_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function AsyncUtils_toPropertyKey(arg) { var key = AsyncUtils_toPrimitive(arg, "string"); return AsyncUtils_typeof(key) === "symbol" ? key : String(key); }
function AsyncUtils_toPrimitive(input, hint) { if (AsyncUtils_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (AsyncUtils_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var DeferredTask = /*#__PURE__*/AsyncUtils_createClass(function DeferredTask() {
  var _this = this;
  AsyncUtils_classCallCheck(this, DeferredTask);
  AsyncUtils_defineProperty(this, "promise", void 0);
  AsyncUtils_defineProperty(this, "resolve", void 0);
  this.promise = new Promise(function (resolve) {
    return _this.resolve = resolve;
  });
});
var PromiseRegistry = /*#__PURE__*/function () {
  function PromiseRegistry() {
    AsyncUtils_classCallCheck(this, PromiseRegistry);
    AsyncUtils_defineProperty(this, "promises", new IndexedCollection());
  }
  AsyncUtils_createClass(PromiseRegistry, [{
    key: "register",
    value: function register(promise, key) {
      this.promises.set([key, promise]);
    }
  }, {
    key: "registerByFunction",
    value: function registerByFunction(fn, key) {
      this.register(fn(), key);
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.promises.get(key);
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.promises.has(key);
    }
  }, {
    key: "notExist",
    value: function notExist(key) {
      return !this.has(key);
    }
  }, {
    key: "forget",
    value: function forget() {
      var _this$promises;
      (_this$promises = this.promises)["delete"].apply(_this$promises, arguments);
    }
  }]);
  return PromiseRegistry;
}();
;// CONCATENATED MODULE: ./src/state-tracker/MessagesManager.ts
function MessagesManager_typeof(obj) { "@babel/helpers - typeof"; return MessagesManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, MessagesManager_typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { MessagesManager_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function MessagesManager_toConsumableArray(arr) { return MessagesManager_arrayWithoutHoles(arr) || MessagesManager_iterableToArray(arr) || MessagesManager_unsupportedIterableToArray(arr) || MessagesManager_nonIterableSpread(); }
function MessagesManager_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function MessagesManager_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return MessagesManager_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return MessagesManager_arrayLikeToArray(o, minLen); }
function MessagesManager_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function MessagesManager_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return MessagesManager_arrayLikeToArray(arr); }
function MessagesManager_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == MessagesManager_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function MessagesManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function MessagesManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, MessagesManager_toPropertyKey(descriptor.key), descriptor); } }
function MessagesManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) MessagesManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) MessagesManager_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function MessagesManager_defineProperty(obj, key, value) { key = MessagesManager_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function MessagesManager_toPropertyKey(arg) { var key = MessagesManager_toPrimitive(arg, "string"); return MessagesManager_typeof(key) === "symbol" ? key : String(key); }
function MessagesManager_toPrimitive(input, hint) { if (MessagesManager_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (MessagesManager_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var getCombinedId = function getCombinedId() {
  for (var _len = arguments.length, ids = new Array(_len), _key = 0; _key < _len; _key++) {
    ids[_key] = arguments[_key];
  }
  return ids.join('_');
};
var MessagesManager = /*#__PURE__*/function () {
  // Temporary not lazy loaded; server must implement GetTopicMessages command.

  function MessagesManager(tracker) {
    var _this = this;
    MessagesManager_classCallCheck(this, MessagesManager);
    this.tracker = tracker;
    MessagesManager_defineProperty(this, "list", new IndexedCollection());
    MessagesManager_defineProperty(this, "acks", new IndexedCollection());
    this.tracker.client.on('NewMessage', function (ev) {
      return _this.handleNewMessage(ev);
    });
    this.tracker.client.on('AckReports', function (ev) {
      return _this.handleAckReports(ev);
    });
  }

  /**
   * Get collection of the messages written in topic.
   */
  MessagesManager_createClass(MessagesManager, [{
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(roomId, topicId) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.list.get(getCombinedId(roomId, topicId)));
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function get(_x, _x2) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Cache ack reports for all joined rooms in a space and fetch them in bulk if necessary.
     * Then you can get the reports using getRoomAckReports().
     * @see getRoomAckReports
     */
  }, {
    key: "cacheSpaceAckReports",
    value: function () {
      var _cacheSpaceAckReports = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(spaceId) {
        var _this2 = this;
        var roomIds, missingRoomIds, result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.tracker.spaces.get();
              case 2:
                if (_context2.sent.has(spaceId)) {
                  _context2.next = 4;
                  break;
                }
                throw "You are not in space ".concat(spaceId);
              case 4:
                _context2.next = 6;
                return this.tracker.rooms.get();
              case 6:
                roomIds = _context2.sent.findBy('spaceId', spaceId).map(function (room) {
                  return room.id;
                });
                missingRoomIds = roomIds.filter(function (roomId) {
                  return !_this2.acks.has(roomId);
                });
                if (!missingRoomIds.length) {
                  _context2.next = 15;
                  break;
                }
                _context2.next = 11;
                return this.tracker.client.send('GetAckReports', {
                  spaceId: spaceId
                });
              case 11:
                result = _context2.sent;
                if (!result.error) {
                  _context2.next = 14;
                  break;
                }
                throw result.error;
              case 14:
                missingRoomIds.forEach(function (roomId) {
                  var reports = result.data.reports.filter(function (report) {
                    return report.roomId === roomId;
                  });
                  _this2.acks.set([roomId, new ObservableIndexedObjectCollection('topicId', reports)]);
                });
              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function cacheSpaceAckReports(_x3) {
        return _cacheSpaceAckReports.apply(this, arguments);
      }
      return cacheSpaceAckReports;
    }()
    /**
     * Get ack reports for the given room. Undefined if you are not in the room.
     * @param roomId
     */
  }, {
    key: "getRoomAckReports",
    value: function () {
      var _getRoomAckReports = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(roomId) {
        var room, result;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.tracker.rooms.get();
              case 2:
                room = _context3.sent.get(roomId);
                if (room) {
                  _context3.next = 5;
                  break;
                }
                return _context3.abrupt("return", undefined);
              case 5:
                if (this.acks.has(roomId)) {
                  _context3.next = 12;
                  break;
                }
                _context3.next = 8;
                return this.tracker.client.send('GetAckReports', {
                  roomId: roomId
                });
              case 8:
                result = _context3.sent;
                if (!result.error) {
                  _context3.next = 11;
                  break;
                }
                throw result.error;
              case 11:
                this.acks.set([roomId, new ObservableIndexedObjectCollection('topicId', result.data.reports)]);
              case 12:
                return _context3.abrupt("return", this.acks.get(roomId));
              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function getRoomAckReports(_x4) {
        return _getRoomAckReports.apply(this, arguments);
      }
      return getRoomAckReports;
    }()
    /**
     * For internal use. If you want to delete the message, execute a proper command on client object.
     * @internal
     */
  }, {
    key: "_deleteByTopicIds",
    value: function _deleteByTopicIds(roomId) {
      var _this$list, _this$acks$get;
      for (var _len2 = arguments.length, topicIds = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        topicIds[_key2 - 1] = arguments[_key2];
      }
      (_this$list = this.list)["delete"].apply(_this$list, MessagesManager_toConsumableArray(topicIds.map(function (topicId) {
        return getCombinedId(roomId, topicId);
      })));
      (_this$acks$get = this.acks.get(roomId)) === null || _this$acks$get === void 0 ? void 0 : _this$acks$get["delete"].apply(_this$acks$get, topicIds);
    }

    /**
     * For internal use. If you want to add new topic, execute a proper command on client object.
     * @internal
     */
  }, {
    key: "_handleNewTopics",
    value: function _handleNewTopics(roomId) {
      var _this$list2;
      for (var _len3 = arguments.length, topics = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        topics[_key3 - 1] = arguments[_key3];
      }
      (_this$list2 = this.list).set.apply(_this$list2, MessagesManager_toConsumableArray(topics.map(function (topic) {
        return [getCombinedId(roomId, topic.id), new ObservableIndexedObjectCollection('id')];
      })));
      this.createAckReportsForNewTopics(roomId, topics);
    }
  }, {
    key: "handleNewMessage",
    value: function handleNewMessage(ev) {
      this.list.get(getCombinedId(ev.roomId, ev.topicId)).set(ev.message);
      this.updateLocallyAckReportOnNewMessage(ev);
    }
  }, {
    key: "handleAckReports",
    value: function handleAckReports(ev) {
      var _this3 = this;
      ev.reports.forEach(function (report) {
        var ackReports = _this3.acks.get(report.roomId);
        if (ackReports) {
          ackReports.set(report);
        }
      });
    }
  }, {
    key: "createAckReportsForNewTopics",
    value: function createAckReportsForNewTopics(roomId, topics) {
      var ackReports = this.acks.get(roomId);
      if (!ackReports) {
        // If we don't follow ack reports for this room, skip
        return;
      }
      var newReports = topics.map(function (topic) {
        return {
          roomId: roomId,
          topicId: topic.id,
          lastAckMessageId: null,
          missed: 0,
          missedMoreThan: null
        };
      });
      ackReports.set.apply(ackReports, MessagesManager_toConsumableArray(newReports));
    }
  }, {
    key: "updateLocallyAckReportOnNewMessage",
    value: function updateLocallyAckReportOnNewMessage(ev) {
      var _this$tracker$me;
      var ackReports = this.acks.get(ev.roomId);
      if (!ackReports) {
        // If we don't follow ack reports for this room, skip
        return;
      }
      var isMe = ev.message.author.id === ((_this$tracker$me = this.tracker.me) === null || _this$tracker$me === void 0 ? void 0 : _this$tracker$me.id);
      var currentAckReport = ackReports.get(ev.topicId);
      var update;
      if (isMe) {
        // Reset missed messages count if new message is authored by me
        update = {
          missed: 0,
          missedMoreThan: null,
          lastAckMessageId: ev.message.id
        };
      } else {
        // ...add 1 otherwise
        update = {
          missed: currentAckReport.missed === null ? null : currentAckReport.missed + 1,
          missedMoreThan: currentAckReport.missedMoreThan === null ? null : currentAckReport.missedMoreThan
        };
      }
      ackReports.set(_objectSpread(_objectSpread({}, currentAckReport), update));
    }
  }]);
  return MessagesManager;
}();
;// CONCATENATED MODULE: ./src/state-tracker/RoomsManager.ts
function RoomsManager_typeof(obj) { "@babel/helpers - typeof"; return RoomsManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, RoomsManager_typeof(obj); }
function RoomsManager_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function RoomsManager_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? RoomsManager_ownKeys(Object(source), !0).forEach(function (key) { RoomsManager_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : RoomsManager_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function RoomsManager_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = RoomsManager_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function RoomsManager_toConsumableArray(arr) { return RoomsManager_arrayWithoutHoles(arr) || RoomsManager_iterableToArray(arr) || RoomsManager_unsupportedIterableToArray(arr) || RoomsManager_nonIterableSpread(); }
function RoomsManager_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function RoomsManager_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return RoomsManager_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return RoomsManager_arrayLikeToArray(o, minLen); }
function RoomsManager_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function RoomsManager_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return RoomsManager_arrayLikeToArray(arr); }
function RoomsManager_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function RoomsManager_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ RoomsManager_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == RoomsManager_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function RoomsManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function RoomsManager_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { RoomsManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { RoomsManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function RoomsManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function RoomsManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, RoomsManager_toPropertyKey(descriptor.key), descriptor); } }
function RoomsManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) RoomsManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) RoomsManager_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function RoomsManager_defineProperty(obj, key, value) { key = RoomsManager_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function RoomsManager_toPropertyKey(arg) { var key = RoomsManager_toPrimitive(arg, "string"); return RoomsManager_typeof(key) === "symbol" ? key : String(key); }
function RoomsManager_toPrimitive(input, hint) { if (RoomsManager_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (RoomsManager_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var RoomsManager = /*#__PURE__*/function () {
  function RoomsManager(tracker) {
    var _this = this;
    RoomsManager_classCallCheck(this, RoomsManager);
    this.tracker = tracker;
    RoomsManager_defineProperty(this, "messages", void 0);
    RoomsManager_defineProperty(this, "list", new ObservableIndexedObjectCollection('id'));
    RoomsManager_defineProperty(this, "topics", new IndexedCollection());
    RoomsManager_defineProperty(this, "members", new IndexedCollection());
    RoomsManager_defineProperty(this, "deferredSession", new DeferredTask());
    RoomsManager_defineProperty(this, "membersPromises", new PromiseRegistry());
    this.messages = new MessagesManager(tracker);
    this.tracker.client.on('NewTopic', function (ev) {
      return _this.handleNewTopic(ev);
    });
    this.tracker.client.on('TopicDeleted', function (ev) {
      return _this.handleTopicDeleted(ev);
    });
    this.tracker.client.on('RoomJoined', function (ev) {
      return _this.handleRoomJoined(ev);
    });
    this.tracker.client.on('RoomLeft', function (ev) {
      return _this.handleRoomLeft(ev);
    });
    this.tracker.client.on('RoomUpdated', function (ev) {
      return _this.handleRoomUpdated(ev);
    });
    this.tracker.client.on('RoomDeleted', function (ev) {
      return _this.handleRoomDeleted(ev);
    });
    this.tracker.client.on('RoomMemberJoined', function (ev) {
      return _this.handleRoomMemberJoined(ev);
    });
    this.tracker.client.on('RoomMemberLeft', function (ev) {
      return _this.handleRoomMemberLeft(ev);
    });
    this.tracker.client.on('RoomMembers', function (ev) {
      return _this.handleRoomMembers(ev);
    });
    this.tracker.client.on('RoomMemberUpdated', function (ev) {
      return _this.handleRoomMemberUpdated(ev);
    });
    this.tracker.client.on('SpaceMemberLeft', function (ev) {
      return _this.handleSpaceMemberLeft(ev);
    });
    this.tracker.client.on('SpaceMemberUpdated', function (ev) {
      return _this.handleSpaceMemberUpdated(ev);
    });
    this.tracker.client.on('SpaceDeleted', function (ev) {
      return _this.handleSpaceDeleted(ev);
    });
    this.tracker.client.on('SpaceLeft', function (ev) {
      return _this.handleSpaceDeleted(ev);
    });
    this.tracker.client.on('UserUpdated', function (ev) {
      return _this.handleUserUpdated(ev);
    });
    this.tracker.client.on('Session', function (ev) {
      return _this.handleSession(ev);
    });
  }

  /**
   * Get collection of room members.
   */
  RoomsManager_createClass(RoomsManager, [{
    key: "getMembers",
    value: function () {
      var _getMembers = RoomsManager_asyncToGenerator( /*#__PURE__*/RoomsManager_regeneratorRuntime().mark(function _callee2(roomId) {
        var _this2 = this;
        return RoomsManager_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.membersPromises.notExist(roomId)) {
                  this.membersPromises.registerByFunction( /*#__PURE__*/RoomsManager_asyncToGenerator( /*#__PURE__*/RoomsManager_regeneratorRuntime().mark(function _callee() {
                    var result;
                    return RoomsManager_regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _this2.tracker.client.send('GetRoomMembers', {
                              id: roomId
                            });
                          case 2:
                            result = _context.sent;
                            if (!result.error) {
                              _context.next = 5;
                              break;
                            }
                            throw result.error;
                          case 5:
                            _this2.handleRoomMembers(result.data);
                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  })), roomId);
                }
                _context2.next = 3;
                return this.membersPromises.get(roomId);
              case 3:
                return _context2.abrupt("return", this.members.get(roomId));
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function getMembers(_x) {
        return _getMembers.apply(this, arguments);
      }
      return getMembers;
    }()
    /**
     * Get a room member representing the current user.
     */
  }, {
    key: "getMe",
    value: function () {
      var _getMe = RoomsManager_asyncToGenerator( /*#__PURE__*/RoomsManager_regeneratorRuntime().mark(function _callee3(roomId) {
        var userId, members;
        return RoomsManager_regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.tracker.getMe();
              case 2:
                userId = _context3.sent.id;
                if (this.list.has(roomId)) {
                  _context3.next = 5;
                  break;
                }
                return _context3.abrupt("return", undefined);
              case 5:
                _context3.next = 7;
                return this.getMembers(roomId);
              case 7:
                members = _context3.sent;
                return _context3.abrupt("return", members.items.find(function (member) {
                  var _member$user$id, _member$user;
                  return ((_member$user$id = (_member$user = member.user) === null || _member$user === void 0 ? void 0 : _member$user.id) !== null && _member$user$id !== void 0 ? _member$user$id : member.spaceMember.user.id) === userId;
                }));
              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function getMe(_x2) {
        return _getMe.apply(this, arguments);
      }
      return getMe;
    }()
    /**
     * Get collection of all the rooms you are in.
     */
  }, {
    key: "get",
    value: function () {
      var _get = RoomsManager_asyncToGenerator( /*#__PURE__*/RoomsManager_regeneratorRuntime().mark(function _callee4() {
        return RoomsManager_regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.deferredSession.promise;
              case 2:
                return _context4.abrupt("return", this.list);
              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function get() {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Get collection of room topics.
     */
  }, {
    key: "getTopics",
    value: function () {
      var _getTopics = RoomsManager_asyncToGenerator( /*#__PURE__*/RoomsManager_regeneratorRuntime().mark(function _callee5(roomId) {
        return RoomsManager_regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.deferredSession.promise;
              case 2:
                return _context5.abrupt("return", this.topics.get(roomId));
              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function getTopics(_x3) {
        return _getTopics.apply(this, arguments);
      }
      return getTopics;
    }()
  }, {
    key: "deleteRoom",
    value: function deleteRoom() {
      var _this$list, _this$members, _this$membersPromises, _this$topics;
      for (var _len = arguments.length, roomIds = new Array(_len), _key = 0; _key < _len; _key++) {
        roomIds[_key] = arguments[_key];
      }
      (_this$list = this.list)["delete"].apply(_this$list, roomIds);
      (_this$members = this.members)["delete"].apply(_this$members, roomIds);
      (_this$membersPromises = this.membersPromises).forget.apply(_this$membersPromises, roomIds);
      for (var _i = 0, _roomIds = roomIds; _i < _roomIds.length; _i++) {
        var _this$topics$get$map, _this$topics$get, _this$messages;
        var roomId = _roomIds[_i];
        var topicIds = (_this$topics$get$map = (_this$topics$get = this.topics.get(roomId)) === null || _this$topics$get === void 0 ? void 0 : _this$topics$get.map(function (topic) {
          return topic.id;
        })) !== null && _this$topics$get$map !== void 0 ? _this$topics$get$map : [];
        (_this$messages = this.messages)._deleteByTopicIds.apply(_this$messages, [roomId].concat(RoomsManager_toConsumableArray(topicIds)));
      }
      (_this$topics = this.topics)["delete"].apply(_this$topics, roomIds);
    }
  }, {
    key: "deleteRoomsBySpaceId",
    value: function deleteRoomsBySpaceId(spaceId) {
      this.deleteRoom.apply(this, RoomsManager_toConsumableArray(this.list.findBy('spaceId', spaceId).map(function (room) {
        return room.id;
      })));
    }
  }, {
    key: "handleSpaceMemberUpdated",
    value: function handleSpaceMemberUpdated(ev) {
      // Update members of rooms related to this space
      var _iterator = RoomsManager_createForOfIteratorHelper(this.list.findBy('spaceId', ev.spaceId).items),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var room = _step.value;
          var roomMembers = this.members.get(room.id);
          if (!roomMembers || !roomMembers.has(ev.userId)) {
            // Skip update if member list for this room is not loaded
            // or user is not in room
            continue;
          }
          var roomMember = roomMembers.get(ev.userId);
          var user = roomMember.spaceMember.user;

          // Update space member but first fill user object (it's null in event object)
          roomMember.spaceMember = RoomsManager_objectSpread(RoomsManager_objectSpread({}, ev.member), {}, {
            user: user
          });
          roomMembers.set(roomMember);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "handleSpaceMemberLeft",
    value: function handleSpaceMemberLeft(ev) {
      var _this3 = this;
      this.list.findBy('spaceId', ev.spaceId).items.forEach(function (room) {
        var _this3$members$get;
        return (_this3$members$get = _this3.members.get(room.id)) === null || _this3$members$get === void 0 ? void 0 : _this3$members$get["delete"](ev.userId);
      });
    }
  }, {
    key: "handleRoomMemberUpdated",
    value: function handleRoomMemberUpdated(ev) {
      var _member$spaceMember$u, _member$spaceMember;
      if (!this.members.has(ev.roomId)) {
        // We do not track member list for this room.
        return;
      }
      var members = this.members.get(ev.roomId);
      var member = members.get(ev.userId);
      var newMember = ev.member;
      var user = (_member$spaceMember$u = (_member$spaceMember = member.spaceMember) === null || _member$spaceMember === void 0 ? void 0 : _member$spaceMember.user) !== null && _member$spaceMember$u !== void 0 ? _member$spaceMember$u : member.user;
      if (newMember.spaceMember) {
        newMember.spaceMember.user = user;
      } else {
        newMember.user = user;
      }
      members.set(newMember);
    }
  }, {
    key: "handleSpaceDeleted",
    value: function handleSpaceDeleted(ev) {
      this.deleteRoomsBySpaceId(ev.id);
    }
  }, {
    key: "handleTopicDeleted",
    value: function handleTopicDeleted(ev) {
      var collection = this.topics.get(ev.roomId);
      collection["delete"](ev.id);
      this.list.get(ev.roomId).topics = collection.items;
    }
  }, {
    key: "handleNewTopic",
    value: function handleNewTopic(ev) {
      this.addJoinedRoomTopics(ev.roomId, ev.topic);
      this.list.get(ev.roomId).topics.push(ev.topic);
    }
  }, {
    key: "addJoinedRoomTopics",
    value: function addJoinedRoomTopics(roomId) {
      var _this$messages2;
      for (var _len2 = arguments.length, topics = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        topics[_key2 - 1] = arguments[_key2];
      }
      if (this.topics.has(roomId)) {
        var _this$topics$get2;
        (_this$topics$get2 = this.topics.get(roomId)).set.apply(_this$topics$get2, topics);
      } else {
        this.topics.set([roomId, new ObservableIndexedObjectCollection('id', topics)]);
      }
      (_this$messages2 = this.messages)._handleNewTopics.apply(_this$messages2, [roomId].concat(topics));
    }
  }, {
    key: "handleRoomJoined",
    value: function handleRoomJoined(ev) {
      this.addJoinedRooms(ev.room);
    }
  }, {
    key: "handleRoomUpdated",
    value: function handleRoomUpdated(ev) {
      this.list.set(RoomsManager_objectSpread(RoomsManager_objectSpread({}, this.list.get(ev.room.id)), {}, {
        name: ev.room.name,
        description: ev.room.description
      }));
    }
  }, {
    key: "handleRoomDeleted",
    value: function handleRoomDeleted(ev) {
      this.deleteRoom(ev.id);
    }
  }, {
    key: "addJoinedRooms",
    value: function addJoinedRooms() {
      var _this$list2;
      for (var _len3 = arguments.length, rooms = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        rooms[_key3] = arguments[_key3];
      }
      for (var _i2 = 0, _rooms = rooms; _i2 < _rooms.length; _i2++) {
        var room = _rooms[_i2];
        this.addJoinedRoomTopics.apply(this, [room.id].concat(RoomsManager_toConsumableArray(room.topics)));
      }
      (_this$list2 = this.list).set.apply(_this$list2, rooms);
    }
  }, {
    key: "handleRoomLeft",
    value: function handleRoomLeft(ev) {
      this.deleteRoom(ev.id);
    }
  }, {
    key: "handleRoomMemberJoined",
    value: function handleRoomMemberJoined(ev) {
      if (this.members.has(ev.roomId)) {
        this.members.get(ev.roomId).set(ev.member);
      }
    }
  }, {
    key: "handleRoomMemberLeft",
    value: function handleRoomMemberLeft(ev) {
      if (this.members.has(ev.roomId)) {
        this.members.get(ev.roomId)["delete"](ev.userId);
      }
    }
  }, {
    key: "handleRoomMembers",
    value: function handleRoomMembers(ev) {
      if (!this.members.has(ev.id)) {
        this.members.set([ev.id, new ObservableIndexedObjectCollection(function (member) {
          var _member$user$id2, _member$user2;
          return (_member$user$id2 = (_member$user2 = member.user) === null || _member$user2 === void 0 ? void 0 : _member$user2.id) !== null && _member$user$id2 !== void 0 ? _member$user$id2 : member.spaceMember.user.id;
        }, ev.members)]);
      }
    }
  }, {
    key: "handleSession",
    value: function handleSession(ev) {
      this.list.deleteAll();
      this.topics.deleteAll();
      this.members.deleteAll();
      this.addJoinedRooms.apply(this, RoomsManager_toConsumableArray(ev.state.rooms));
      this.deferredSession.resolve();
    }
  }, {
    key: "handleUserUpdated",
    value: function handleUserUpdated(ev) {
      this.members.items.forEach(function (members) {
        var member = members.get(ev.user.id);
        if (!member) {
          // Skip room; updated user is not here
          return;
        }
        var newMember = RoomsManager_objectSpread({}, member);
        if (member.user) {
          newMember.user = ev.user;
        } else {
          newMember.spaceMember.user = ev.user;
        }
        members.set(newMember);
      });
    }
  }]);
  return RoomsManager;
}();
;// CONCATENATED MODULE: ./src/state-tracker/functions.ts
function reorderRolesOnPriorityUpdate(allRoles, oldRole, updatedRole) {
  // If the priority has changed, adjust the rest of roles
  var increased = updatedRole.priority - oldRole.priority > 0;
  var decreased = !increased;
  var changedRoles = [];
  allRoles.forEach(function (role) {
    if (role.id === updatedRole.id) {
      // Skip the updated role
      return;
    }
    if (increased && oldRole.priority <= role.priority) {
      role.priority--;
      changedRoles.push(role);
    }
    if (decreased && updatedRole.priority <= role.priority) {
      role.priority++;
      changedRoles.push(role);
    }
  });
  return changedRoles;
}
;// CONCATENATED MODULE: ./src/state-tracker/SpacesManager.ts
function SpacesManager_typeof(obj) { "@babel/helpers - typeof"; return SpacesManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, SpacesManager_typeof(obj); }
function SpacesManager_toConsumableArray(arr) { return SpacesManager_arrayWithoutHoles(arr) || SpacesManager_iterableToArray(arr) || SpacesManager_unsupportedIterableToArray(arr) || SpacesManager_nonIterableSpread(); }
function SpacesManager_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function SpacesManager_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return SpacesManager_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return SpacesManager_arrayLikeToArray(o, minLen); }
function SpacesManager_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function SpacesManager_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return SpacesManager_arrayLikeToArray(arr); }
function SpacesManager_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function SpacesManager_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function SpacesManager_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? SpacesManager_ownKeys(Object(source), !0).forEach(function (key) { SpacesManager_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : SpacesManager_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function SpacesManager_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ SpacesManager_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == SpacesManager_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function SpacesManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function SpacesManager_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { SpacesManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { SpacesManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function SpacesManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function SpacesManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, SpacesManager_toPropertyKey(descriptor.key), descriptor); } }
function SpacesManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) SpacesManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) SpacesManager_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function SpacesManager_defineProperty(obj, key, value) { key = SpacesManager_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function SpacesManager_toPropertyKey(arg) { var key = SpacesManager_toPrimitive(arg, "string"); return SpacesManager_typeof(key) === "symbol" ? key : String(key); }
function SpacesManager_toPrimitive(input, hint) { if (SpacesManager_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (SpacesManager_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var SpacesManager = /*#__PURE__*/function () {
  function SpacesManager(tracker) {
    var _this = this;
    SpacesManager_classCallCheck(this, SpacesManager);
    this.tracker = tracker;
    SpacesManager_defineProperty(this, "list", new ObservableIndexedObjectCollection('id'));
    SpacesManager_defineProperty(this, "roles", new IndexedCollection());
    SpacesManager_defineProperty(this, "rooms", new IndexedCollection());
    SpacesManager_defineProperty(this, "members", new IndexedCollection());
    SpacesManager_defineProperty(this, "deferredSession", new DeferredTask());
    SpacesManager_defineProperty(this, "roomsPromises", new PromiseRegistry());
    SpacesManager_defineProperty(this, "membersPromises", new PromiseRegistry());
    this.tracker.client.on('NewRoom', function (ev) {
      return _this.handleNewRoom(ev);
    });
    this.tracker.client.on('RoomDeleted', function (ev) {
      return _this.handleRoomDeleted(ev);
    });
    this.tracker.client.on('RoomUpdated', function (ev) {
      return _this.handleRoomUpdated(ev);
    });
    this.tracker.client.on('SpaceDeleted', function (ev) {
      return _this.handleSpaceDeleted(ev);
    });
    this.tracker.client.on('SpaceUpdated', function (ev) {
      return _this.handleSpaceUpdated(ev);
    });
    this.tracker.client.on('SpaceJoined', function (ev) {
      return _this.handleSpaceJoined(ev);
    });
    this.tracker.client.on('SpaceLeft', function (ev) {
      return _this.handleSpaceDeleted(ev);
    });
    this.tracker.client.on('SpaceMemberJoined', function (ev) {
      return _this.handleSpaceMemberJoined(ev);
    });
    this.tracker.client.on('SpaceMemberLeft', function (ev) {
      return _this.handleSpaceMemberLeft(ev);
    });
    this.tracker.client.on('SpaceMembers', function (ev) {
      return _this.handleSpaceMembers(ev);
    });
    this.tracker.client.on('SpaceRooms', function (ev) {
      return _this.handleSpaceRooms(ev);
    });
    this.tracker.client.on('SpaceMemberUpdated', function (ev) {
      return _this.handleSpaceMemberUpdated(ev);
    });
    this.tracker.client.on('UserUpdated', function (ev) {
      return _this.handleUserUpdated(ev);
    });
    this.tracker.client.on('NewRole', function (ev) {
      return _this.handleNewRole(ev);
    });
    this.tracker.client.on('RoleDeleted', function (ev) {
      return _this.handleRoleDeleted(ev);
    });
    this.tracker.client.on('RoleUpdated', function (ev) {
      return _this.handleRoleUpdated(ev);
    });
    this.tracker.client.on('Session', function (ev) {
      return _this.handleSession(ev);
    });
  }

  /**
   * Get collection of all the spaces you are in.
   */
  SpacesManager_createClass(SpacesManager, [{
    key: "get",
    value: function () {
      var _get = SpacesManager_asyncToGenerator( /*#__PURE__*/SpacesManager_regeneratorRuntime().mark(function _callee() {
        return SpacesManager_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.deferredSession.promise;
              case 2:
                return _context.abrupt("return", this.list);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function get() {
        return _get.apply(this, arguments);
      }
      return get;
    }()
    /**
     * Get collection of space roles.
     */
  }, {
    key: "getRoles",
    value: function () {
      var _getRoles = SpacesManager_asyncToGenerator( /*#__PURE__*/SpacesManager_regeneratorRuntime().mark(function _callee2(spaceId) {
        return SpacesManager_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.deferredSession.promise;
              case 2:
                return _context2.abrupt("return", this.roles.get(spaceId));
              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function getRoles(_x) {
        return _getRoles.apply(this, arguments);
      }
      return getRoles;
    }()
    /**
     * Get collection of the all available rooms inside given space.
     */
  }, {
    key: "getRooms",
    value: function () {
      var _getRooms = SpacesManager_asyncToGenerator( /*#__PURE__*/SpacesManager_regeneratorRuntime().mark(function _callee4(spaceId) {
        var _this2 = this;
        return SpacesManager_regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.roomsPromises.notExist(spaceId)) {
                  this.roomsPromises.registerByFunction( /*#__PURE__*/SpacesManager_asyncToGenerator( /*#__PURE__*/SpacesManager_regeneratorRuntime().mark(function _callee3() {
                    var result;
                    return SpacesManager_regeneratorRuntime().wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this2.tracker.client.send('GetSpaceRooms', {
                              id: spaceId
                            });
                          case 2:
                            result = _context3.sent;
                            if (!result.error) {
                              _context3.next = 5;
                              break;
                            }
                            throw result.error;
                          case 5:
                            _this2.handleSpaceRooms(result.data);
                          case 6:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  })), spaceId);
                }
                _context4.next = 3;
                return this.roomsPromises.get(spaceId);
              case 3:
                return _context4.abrupt("return", this.rooms.get(spaceId));
              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function getRooms(_x2) {
        return _getRooms.apply(this, arguments);
      }
      return getRooms;
    }()
    /**
     * Get collection of space members.
     */
  }, {
    key: "getMembers",
    value: function () {
      var _getMembers = SpacesManager_asyncToGenerator( /*#__PURE__*/SpacesManager_regeneratorRuntime().mark(function _callee6(spaceId) {
        var _this3 = this;
        return SpacesManager_regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.membersPromises.notExist(spaceId)) {
                  this.membersPromises.registerByFunction( /*#__PURE__*/SpacesManager_asyncToGenerator( /*#__PURE__*/SpacesManager_regeneratorRuntime().mark(function _callee5() {
                    var result;
                    return SpacesManager_regeneratorRuntime().wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return _this3.tracker.client.send('GetSpaceMembers', {
                              id: spaceId
                            });
                          case 2:
                            result = _context5.sent;
                            if (!result.error) {
                              _context5.next = 5;
                              break;
                            }
                            throw result.error;
                          case 5:
                            _this3.handleSpaceMembers(result.data);
                          case 6:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  })), spaceId);
                }
                _context6.next = 3;
                return this.membersPromises.get(spaceId);
              case 3:
                return _context6.abrupt("return", this.members.get(spaceId));
              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function getMembers(_x3) {
        return _getMembers.apply(this, arguments);
      }
      return getMembers;
    }()
    /**
     * Get a space member representing the current user.
     */
  }, {
    key: "getMe",
    value: function () {
      var _getMe = SpacesManager_asyncToGenerator( /*#__PURE__*/SpacesManager_regeneratorRuntime().mark(function _callee7(spaceId) {
        var userId, members;
        return SpacesManager_regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.tracker.getMe();
              case 2:
                userId = _context7.sent.id;
                if (this.list.has(spaceId)) {
                  _context7.next = 5;
                  break;
                }
                return _context7.abrupt("return", undefined);
              case 5:
                _context7.next = 7;
                return this.getMembers(spaceId);
              case 7:
                members = _context7.sent;
                return _context7.abrupt("return", members.items.find(function (member) {
                  return member.user.id === userId;
                }));
              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function getMe(_x4) {
        return _getMe.apply(this, arguments);
      }
      return getMe;
    }()
  }, {
    key: "handleNewRole",
    value: function handleNewRole(ev) {
      var collection = this.roles.get(ev.spaceId);
      collection.set(ev.role);
      this.list.get(ev.spaceId).roles = collection.items;
    }
  }, {
    key: "handleNewRoom",
    value: function handleNewRoom(ev) {
      var _this$rooms$get;
      (_this$rooms$get = this.rooms.get(ev.spaceId)) === null || _this$rooms$get === void 0 ? void 0 : _this$rooms$get.set(ev.summary);
    }
  }, {
    key: "handleRoomUpdated",
    value: function handleRoomUpdated(ev) {
      if (ev.room.spaceId && this.rooms.has(ev.room.spaceId)) {
        var rooms = this.rooms.get(ev.room.spaceId);
        rooms.set(SpacesManager_objectSpread(SpacesManager_objectSpread({}, rooms.get(ev.room.id)), {}, {
          name: ev.room.name,
          description: ev.room.description
        }));
      }
    }
  }, {
    key: "handleRoomDeleted",
    value: function handleRoomDeleted(ev) {
      if (ev.spaceId && this.rooms.has(ev.spaceId)) {
        this.rooms.get(ev.spaceId)["delete"](ev.id);
      }
    }
  }, {
    key: "handleRoleDeleted",
    value: function handleRoleDeleted(ev) {
      var collection = this.roles.get(ev.spaceId);
      collection["delete"](ev.id);
      this.list.get(ev.spaceId).roles = collection.items;
    }
  }, {
    key: "handleSpaceUpdated",
    value: function handleSpaceUpdated(ev) {
      this.list.set(SpacesManager_objectSpread(SpacesManager_objectSpread({}, this.list.get(ev.space.id)), {}, {
        name: ev.space.name
      }));
    }
  }, {
    key: "handleSpaceDeleted",
    value: function handleSpaceDeleted(ev) {
      this.roles["delete"](ev.id);
      this.members["delete"](ev.id);
      this.membersPromises.forget(ev.id);
      this.rooms["delete"](ev.id);
      this.roomsPromises.forget(ev.id);
      this.list["delete"](ev.id);
    }
  }, {
    key: "handleSpaceJoined",
    value: function handleSpaceJoined(ev) {
      this.addJoinedSpaces(ev.space);
    }
  }, {
    key: "addJoinedSpaces",
    value: function addJoinedSpaces() {
      var _this$roles, _this$list;
      for (var _len = arguments.length, spaces = new Array(_len), _key = 0; _key < _len; _key++) {
        spaces[_key] = arguments[_key];
      }
      (_this$roles = this.roles).set.apply(_this$roles, SpacesManager_toConsumableArray(spaces.map(function (space) {
        return [space.id, new ObservableIndexedObjectCollection('id', space.roles)];
      })));
      (_this$list = this.list).set.apply(_this$list, spaces);
    }
  }, {
    key: "handleSpaceMemberJoined",
    value: function handleSpaceMemberJoined(ev) {
      if (this.members.has(ev.spaceId)) {
        this.members.get(ev.spaceId).set(ev.member);
      }
    }
  }, {
    key: "handleSpaceMemberLeft",
    value: function handleSpaceMemberLeft(ev) {
      if (this.members.has(ev.spaceId)) {
        this.members.get(ev.spaceId)["delete"](ev.userId);
      }
    }
  }, {
    key: "handleSpaceMembers",
    value: function handleSpaceMembers(ev) {
      if (!this.members.has(ev.id)) {
        this.members.set([ev.id, new ObservableIndexedObjectCollection(function (member) {
          return member === null || member === void 0 ? void 0 : member.user.id;
        }, ev.members)]);
      }
    }
  }, {
    key: "handleSpaceRooms",
    value: function handleSpaceRooms(ev) {
      if (!this.rooms.has(ev.id)) {
        this.rooms.set([ev.id, new ObservableIndexedObjectCollection('id', ev.summaries)]);
      }
    }
  }, {
    key: "handleSpaceMemberUpdated",
    value: function handleSpaceMemberUpdated(ev) {
      if (this.members.has(ev.spaceId)) {
        var members = this.members.get(ev.spaceId);
        var member = members.get(ev.userId);
        members.set(SpacesManager_objectSpread(SpacesManager_objectSpread({}, ev.member), {}, {
          user: member.user
        }));
      }
    }
  }, {
    key: "handleRoleUpdated",
    value: function handleRoleUpdated(ev) {
      var _this$roles$get;
      var roles = this.roles.get(ev.spaceId);
      var oldRole = roles.get(ev.role.id);
      var newRole = ev.role;
      var rolesToUpdate = [newRole];
      if (oldRole.priority !== newRole.priority) {
        rolesToUpdate.push.apply(rolesToUpdate, SpacesManager_toConsumableArray(reorderRolesOnPriorityUpdate(roles.items, oldRole, newRole)));
      }
      (_this$roles$get = this.roles.get(ev.spaceId)).set.apply(_this$roles$get, rolesToUpdate);
    }
  }, {
    key: "handleSession",
    value: function handleSession(ev) {
      this.list.deleteAll();
      this.roles.deleteAll();
      this.rooms.deleteAll();
      this.members.deleteAll();
      this.addJoinedSpaces.apply(this, SpacesManager_toConsumableArray(ev.state.spaces));
      this.deferredSession.resolve();
    }
  }, {
    key: "handleUserUpdated",
    value: function handleUserUpdated(ev) {
      this.members.items.forEach(function (members) {
        var member = members.get(ev.user.id);
        if (!member) {
          // Skip space; updated user is not here
          return;
        }
        members.set(SpacesManager_objectSpread(SpacesManager_objectSpread({}, member), {}, {
          user: ev.user
        }));
      });
    }
  }]);
  return SpacesManager;
}();
;// CONCATENATED MODULE: ./src/Permissions.ts
function Permissions_typeof(obj) { "@babel/helpers - typeof"; return Permissions_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Permissions_typeof(obj); }
function Permissions_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, Permissions_toPropertyKey(descriptor.key), descriptor); } }
function Permissions_createClass(Constructor, protoProps, staticProps) { if (protoProps) Permissions_defineProperties(Constructor.prototype, protoProps); if (staticProps) Permissions_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function Permissions_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Permissions_defineProperty(obj, key, value) { key = Permissions_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function Permissions_toPropertyKey(arg) { var key = Permissions_toPrimitive(arg, "string"); return Permissions_typeof(key) === "symbol" ? key : String(key); }
function Permissions_toPrimitive(input, hint) { if (Permissions_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Permissions_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Layer;
(function (Layer) {
  Layer[Layer["Global"] = 0] = "Global";
  Layer[Layer["Space"] = 1] = "Space";
  Layer[Layer["Room"] = 2] = "Room";
  Layer[Layer["Topic"] = 3] = "Topic";
})(Layer || (Layer = {}));
var PermissionDefinition = /*#__PURE__*/Permissions_createClass(function PermissionDefinition() {
  Permissions_classCallCheck(this, PermissionDefinition);
  Permissions_defineProperty(this, "value", void 0);
  Permissions_defineProperty(this, "maxLayer", void 0);
});
var Permissions = /*#__PURE__*/function () {
  function Permissions() {
    Permissions_classCallCheck(this, Permissions);
  }
  Permissions_createClass(Permissions, null, [{
    key: "getNames",
    value: function getNames() {
      return Object.keys(this.list);
    }
  }, {
    key: "getByName",
    value: function getByName(name) {
      return this.list[name];
    }
  }, {
    key: "canBeDefinedOnLayer",
    value: function canBeDefinedOnLayer(permissionName, layer) {
      var def = this.getByName(permissionName);
      if (!def) {
        throw new Error("Invalid permission name: ".concat(permissionName));
      }
      return layer <= this.getByName(permissionName).maxLayer && permissionName !== 'Root';
    }
  }]);
  return Permissions;
}();
Permissions_defineProperty(Permissions, "list", {
  Root: {
    value: 1 << 0,
    maxLayer: Layer.Space
  },
  CreateSpace: {
    value: 1 << 1,
    maxLayer: Layer.Global
  },
  ManageSpace: {
    value: 1 << 2,
    maxLayer: Layer.Space
  },
  ManageRole: {
    value: 1 << 3,
    maxLayer: Layer.Space
  },
  ManageRoom: {
    value: 1 << 4,
    maxLayer: Layer.Room
  },
  ManageTopic: {
    value: 1 << 5,
    maxLayer: Layer.Topic
  },
  ManageSpaceMember: {
    value: 1 << 6,
    maxLayer: Layer.Space
  },
  ManageRoomMember: {
    value: 1 << 7,
    maxLayer: Layer.Room
  },
  CreateMessage: {
    value: 1 << 8,
    maxLayer: Layer.Topic
  },
  ManagePermission: {
    value: 1 << 9,
    maxLayer: Layer.Topic
  }
});
;// CONCATENATED MODULE: ./src/state-tracker/PermissionsManager.ts
function PermissionsManager_typeof(obj) { "@babel/helpers - typeof"; return PermissionsManager_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, PermissionsManager_typeof(obj); }
function PermissionsManager_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = PermissionsManager_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function PermissionsManager_toConsumableArray(arr) { return PermissionsManager_arrayWithoutHoles(arr) || PermissionsManager_iterableToArray(arr) || PermissionsManager_unsupportedIterableToArray(arr) || PermissionsManager_nonIterableSpread(); }
function PermissionsManager_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function PermissionsManager_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function PermissionsManager_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return PermissionsManager_arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || PermissionsManager_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function PermissionsManager_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return PermissionsManager_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return PermissionsManager_arrayLikeToArray(o, minLen); }
function PermissionsManager_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function PermissionsManager_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ PermissionsManager_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == PermissionsManager_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function PermissionsManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function PermissionsManager_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { PermissionsManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { PermissionsManager_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function PermissionsManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function PermissionsManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, PermissionsManager_toPropertyKey(descriptor.key), descriptor); } }
function PermissionsManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) PermissionsManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) PermissionsManager_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function PermissionsManager_get() { if (typeof Reflect !== "undefined" && Reflect.get) { PermissionsManager_get = Reflect.get.bind(); } else { PermissionsManager_get = function _get(target, property, receiver) { var base = PermissionsManager_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return PermissionsManager_get.apply(this, arguments); }
function PermissionsManager_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = PermissionsManager_getPrototypeOf(object); if (object === null) break; } return object; }
function PermissionsManager_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) PermissionsManager_setPrototypeOf(subClass, superClass); }
function PermissionsManager_setPrototypeOf(o, p) { PermissionsManager_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return PermissionsManager_setPrototypeOf(o, p); }
function PermissionsManager_createSuper(Derived) { var hasNativeReflectConstruct = PermissionsManager_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = PermissionsManager_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = PermissionsManager_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return PermissionsManager_possibleConstructorReturn(this, result); }; }
function PermissionsManager_possibleConstructorReturn(self, call) { if (call && (PermissionsManager_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return PermissionsManager_assertThisInitialized(self); }
function PermissionsManager_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function PermissionsManager_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function PermissionsManager_getPrototypeOf(o) { PermissionsManager_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return PermissionsManager_getPrototypeOf(o); }
function PermissionsManager_defineProperty(obj, key, value) { key = PermissionsManager_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function PermissionsManager_toPropertyKey(arg) { var key = PermissionsManager_toPrimitive(arg, "string"); return PermissionsManager_typeof(key) === "symbol" ? key : String(key); }
function PermissionsManager_toPrimitive(input, hint) { if (PermissionsManager_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (PermissionsManager_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var getOvId = function getOvId(layer, layerId, target, targetId) {
  return layer + (layerId !== null && layerId !== void 0 ? layerId : '') + (target !== null && target !== void 0 ? target : '') + (targetId !== null && targetId !== void 0 ? targetId : '');
};
var getOvIdByObject = function getOvIdByObject(overwrites) {
  return getOvId(overwrites.layer, overwrites.layerId, overwrites.target, overwrites.targetId);
};
var PermissionsManager = /*#__PURE__*/function (_EventTarget) {
  PermissionsManager_inherits(PermissionsManager, _EventTarget);
  var _super = PermissionsManager_createSuper(PermissionsManager);
  function PermissionsManager(tracker) {
    var _this;
    PermissionsManager_classCallCheck(this, PermissionsManager);
    _this = _super.call(this);
    _this.tracker = tracker;
    PermissionsManager_defineProperty(PermissionsManager_assertThisInitialized(_this), "overwrites", new IndexedCollection());
    PermissionsManager_defineProperty(PermissionsManager_assertThisInitialized(_this), "overwritesPromises", new PromiseRegistry());
    _this.tracker.client.on('PermissionOverwrites', function (ev) {
      return _this.handlePermissionOverwrites(ev);
    });
    _this.tracker.client.on('PermissionOverwritesUpdated', function (ev) {
      return _this.handlePermissionOverwrites(ev);
    });
    _this.tracker.client.on('SpaceDeleted', function (ev) {
      return _this.handleSpaceDeleted(ev);
    });
    _this.tracker.client.on('SpaceLeft', function (ev) {
      return _this.handleSpaceDeleted(ev);
    });
    _this.tracker.client.on('RoomDeleted', function (ev) {
      return _this.handleRoomDeleted(ev);
    });
    _this.tracker.client.on('RoomLeft', function (ev) {
      return _this.handleRoomDeleted(ev);
    });
    _this.tracker.client.on('TopicDeleted', function (ev) {
      return _this.handleTopicDeleted(ev);
    });
    _this.tracker.client.on('RoleDeleted', function (ev) {
      return _this.handleRoleDeleted(ev);
    });
    _this.tracker.client.on('SpaceMemberUpdated', function (ev) {
      return _this.handleSpaceMemberUpdated(ev);
    });
    _this.tracker.client.on('RoomMemberUpdated', function (ev) {
      return _this.handleRoomMemberUpdated(ev);
    });
    return _this;
  }
  PermissionsManager_createClass(PermissionsManager, [{
    key: "getOverwrites",
    value: function () {
      var _getOverwrites = PermissionsManager_asyncToGenerator( /*#__PURE__*/PermissionsManager_regeneratorRuntime().mark(function _callee2(layer, layerId, target, targetId) {
        var _this2 = this;
        var id;
        return PermissionsManager_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = getOvId(layer, layerId, target, targetId);
                if (this.overwritesPromises.notExist(id)) {
                  this.overwritesPromises.registerByFunction( /*#__PURE__*/PermissionsManager_asyncToGenerator( /*#__PURE__*/PermissionsManager_regeneratorRuntime().mark(function _callee() {
                    var result;
                    return PermissionsManager_regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _this2.tracker.client.send('GetPermissionOverwrites', {
                              layer: layer,
                              layerId: layerId,
                              target: target,
                              targetId: targetId
                            });
                          case 2:
                            result = _context.sent;
                            if (!result.error) {
                              _context.next = 5;
                              break;
                            }
                            throw result.error;
                          case 5:
                            _this2.handlePermissionOverwrites(result.data);
                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  })), id);
                }
                _context2.next = 4;
                return this.overwritesPromises.get(id);
              case 4:
                return _context2.abrupt("return", this.overwrites.get(id));
              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function getOverwrites(_x, _x2, _x3, _x4) {
        return _getOverwrites.apply(this, arguments);
      }
      return getOverwrites;
    }()
  }, {
    key: "on",
    value: function on(eventName, handler) {
      return PermissionsManager_get(PermissionsManager_getPrototypeOf(PermissionsManager.prototype), "on", this).call(this, eventName, handler);
    }
  }, {
    key: "check",
    value: function () {
      var _check = PermissionsManager_asyncToGenerator( /*#__PURE__*/PermissionsManager_regeneratorRuntime().mark(function _callee3(permissionNames, spaceId, roomId, topicId) {
        var ownedPermissions, missing;
        return PermissionsManager_regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.calculatePermissions(spaceId, roomId, topicId);
              case 2:
                ownedPermissions = _context3.sent;
                missing = [];
                permissionNames.forEach(function (name) {
                  if (~ownedPermissions & Permissions.getByName(name).value) {
                    missing.push(name);
                  }
                });
                return _context3.abrupt("return", {
                  ok: missing.length === 0,
                  missing: missing
                });
              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function check(_x5, _x6, _x7, _x8) {
        return _check.apply(this, arguments);
      }
      return check;
    }()
  }, {
    key: "calculatePermissions",
    value: function () {
      var _calculatePermissions = PermissionsManager_asyncToGenerator( /*#__PURE__*/PermissionsManager_regeneratorRuntime().mark(function _callee4(spaceId, roomId, topicId) {
        var _spaceMember$roles, _roomMember$roles;
        var userId, _yield$this$fetchMemb, _yield$this$fetchMemb2, spaceMember, roomMember, userRoles, _yield$Promise$all, _yield$Promise$all2, spaces, rooms, topics, promises;
        return PermissionsManager_regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(topicId && !roomId || roomId && !spaceId)) {
                  _context4.next = 2;
                  break;
                }
                throw new Error('Corrupted arguments hierarchy');
              case 2:
                _context4.next = 4;
                return this.tracker.getMe();
              case 4:
                userId = _context4.sent.id;
                _context4.next = 7;
                return this.fetchMembersOrFail(spaceId, roomId);
              case 7:
                _yield$this$fetchMemb = _context4.sent;
                _yield$this$fetchMemb2 = _slicedToArray(_yield$this$fetchMemb, 2);
                spaceMember = _yield$this$fetchMemb2[0];
                roomMember = _yield$this$fetchMemb2[1];
                userRoles = [].concat(PermissionsManager_toConsumableArray((_spaceMember$roles = spaceMember === null || spaceMember === void 0 ? void 0 : spaceMember.roles) !== null && _spaceMember$roles !== void 0 ? _spaceMember$roles : []), PermissionsManager_toConsumableArray((_roomMember$roles = roomMember === null || roomMember === void 0 ? void 0 : roomMember.roles) !== null && _roomMember$roles !== void 0 ? _roomMember$roles : []));
                _context4.next = 14;
                return Promise.all([this.tracker.spaces.get(), this.tracker.rooms.get(), roomId ? this.tracker.rooms.getTopics(roomId) : null]);
              case 14:
                _yield$Promise$all = _context4.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
                spaces = _yield$Promise$all2[0];
                rooms = _yield$Promise$all2[1];
                topics = _yield$Promise$all2[2];
                promises = [
                // Global user overwrites
                this.getOverwrites('Global', null, 'User', userId).then(function (v) {
                  return v.overwrites;
                })];
                if (spaceId && spaces.has(spaceId)) {
                  promises.push(this.collectRoleOverwrites(spaceId, 'Space', spaceId, userRoles));
                  promises.push(this.getOverwrites('Space', spaceId, 'User', userId).then(function (v) {
                    return v.overwrites;
                  }));
                }
                if (roomId && rooms.has(roomId)) {
                  if (userRoles.length) {
                    promises.push(this.collectRoleOverwrites(spaceId, 'Room', roomId, userRoles));
                  }
                  promises.push(this.getOverwrites('Room', roomId, 'User', userId).then(function (v) {
                    return v.overwrites;
                  }));
                }
                if (topicId && topics && topics.has(topicId)) {
                  if (userRoles.length) {
                    promises.push(this.collectRoleOverwrites(spaceId, 'Topic', topicId, userRoles));
                  }
                  promises.push(this.getOverwrites('Topic', topicId, 'User', userId).then(function (v) {
                    return v.overwrites;
                  }));
                }
                _context4.t0 = this;
                _context4.next = 26;
                return Promise.all(promises);
              case 26:
                _context4.t1 = _context4.sent;
                return _context4.abrupt("return", _context4.t0.resolveOverwritesHierarchy.call(_context4.t0, _context4.t1));
              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function calculatePermissions(_x9, _x10, _x11) {
        return _calculatePermissions.apply(this, arguments);
      }
      return calculatePermissions;
    }()
  }, {
    key: "handlePermissionOverwrites",
    value: function handlePermissionOverwrites(ev) {
      this.overwrites.set([getOvIdByObject(ev), ev]);
      this.emit('change');
    }
  }, {
    key: "handleSpaceDeleted",
    value: function handleSpaceDeleted(ev) {
      var _this$overwritesPromi;
      var ids = this.deleteOverwritesByIdPrefix(getOvId('Space', ev.id));
      (_this$overwritesPromi = this.overwritesPromises).forget.apply(_this$overwritesPromi, PermissionsManager_toConsumableArray(ids));
    }
  }, {
    key: "handleRoomDeleted",
    value: function handleRoomDeleted(ev) {
      var _this$overwritesPromi2;
      var ids = this.deleteOverwritesByIdPrefix(getOvId('Room', ev.id));
      (_this$overwritesPromi2 = this.overwritesPromises).forget.apply(_this$overwritesPromi2, PermissionsManager_toConsumableArray(ids));
    }
  }, {
    key: "handleTopicDeleted",
    value: function handleTopicDeleted(ev) {
      var _this$overwritesPromi3;
      var ids = this.deleteOverwritesByIdPrefix(getOvId('Topic', ev.id));
      (_this$overwritesPromi3 = this.overwritesPromises).forget.apply(_this$overwritesPromi3, PermissionsManager_toConsumableArray(ids));
    }
  }, {
    key: "handleRoleDeleted",
    value: function handleRoleDeleted(ev) {
      var _this$overwritesPromi4;
      var ids = this.deleteOverwritesByIdPrefix(getOvId('Space', ev.spaceId, 'Role', ev.id));
      (_this$overwritesPromi4 = this.overwritesPromises).forget.apply(_this$overwritesPromi4, PermissionsManager_toConsumableArray(ids));
    }
  }, {
    key: "handleSpaceMemberUpdated",
    value: function handleSpaceMemberUpdated(ev) {
      var _this$tracker$me;
      if (ev.userId === ((_this$tracker$me = this.tracker.me) === null || _this$tracker$me === void 0 ? void 0 : _this$tracker$me.id)) {
        // User roles in space could potentially have changed
        this.emit('change');
      }
    }
  }, {
    key: "handleRoomMemberUpdated",
    value: function handleRoomMemberUpdated(ev) {
      var _this$tracker$me2;
      if (ev.userId === ((_this$tracker$me2 = this.tracker.me) === null || _this$tracker$me2 === void 0 ? void 0 : _this$tracker$me2.id)) {
        // User roles in room could potentially have changed
        this.emit('change');
      }
    }

    /**
     * @return Matched and deleted ids
     */
  }, {
    key: "deleteOverwritesByIdPrefix",
    value: function deleteOverwritesByIdPrefix(prefix) {
      var _this3 = this;
      var ids = [];
      this.overwrites.items.forEach(function (overwrites) {
        var id = getOvIdByObject(overwrites);
        if (id.startsWith(prefix)) {
          ids.push(id);
          _this3.overwrites["delete"](id);
        }
      });
      return ids;
    }
  }, {
    key: "collectRoleOverwrites",
    value: function () {
      var _collectRoleOverwrites = PermissionsManager_asyncToGenerator( /*#__PURE__*/PermissionsManager_regeneratorRuntime().mark(function _callee5(spaceId, layer, layerId, userRoles) {
        var _this4 = this;
        var roleOverwrites;
        return PermissionsManager_regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Promise.all(userRoles.map(function (roleId) {
                  return _this4.getOverwrites(layer, layerId, 'Role', roleId);
                }));
              case 2:
                roleOverwrites = _context5.sent;
                return _context5.abrupt("return", this.resolveOverwritesFromRolesByOrder(spaceId, roleOverwrites));
              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function collectRoleOverwrites(_x12, _x13, _x14, _x15) {
        return _collectRoleOverwrites.apply(this, arguments);
      }
      return collectRoleOverwrites;
    }()
  }, {
    key: "resolveOverwritesFromRolesByOrder",
    value: function () {
      var _resolveOverwritesFromRolesByOrder = PermissionsManager_asyncToGenerator( /*#__PURE__*/PermissionsManager_regeneratorRuntime().mark(function _callee6(spaceId, overwrites) {
        var allows, denies, roles, sortedOverwrites, permissionsLength;
        return PermissionsManager_regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                allows = 0, denies = 0;
                _context6.next = 3;
                return this.tracker.spaces.getRoles(spaceId);
              case 3:
                roles = _context6.sent;
                sortedOverwrites = overwrites.sort(function (a, b) {
                  return roles.get(a.targetId).priority - roles.get(b.targetId).priority;
                }); // Max length of bit word
                permissionsLength = overwrites.reduce(function (previousValue, currentValue) {
                  var _currentValue$overwri, _currentValue$overwri2, _currentValue$overwri3, _currentValue$overwri4;
                  return Math.max(previousValue, (_currentValue$overwri = (_currentValue$overwri2 = currentValue.overwrites.allow) === null || _currentValue$overwri2 === void 0 ? void 0 : _currentValue$overwri2.toString(2).length) !== null && _currentValue$overwri !== void 0 ? _currentValue$overwri : 0, (_currentValue$overwri3 = (_currentValue$overwri4 = currentValue.overwrites.deny) === null || _currentValue$overwri4 === void 0 ? void 0 : _currentValue$overwri4.toString(2).length) !== null && _currentValue$overwri3 !== void 0 ? _currentValue$overwri3 : 0);
                }, 0);
                sortedOverwrites.forEach(function (overwriteEvent) {
                  var _overwrites$deny$toSt, _overwrites$deny, _overwrites$allow$toS, _overwrites$allow;
                  var overwrites = overwriteEvent.overwrites;
                  var revDecDenies = (_overwrites$deny$toSt = (_overwrites$deny = overwrites.deny) === null || _overwrites$deny === void 0 ? void 0 : _overwrites$deny.toString(2).split('').reverse().join('')) !== null && _overwrites$deny$toSt !== void 0 ? _overwrites$deny$toSt : '';
                  var revDecAllows = (_overwrites$allow$toS = (_overwrites$allow = overwrites.allow) === null || _overwrites$allow === void 0 ? void 0 : _overwrites$allow.toString(2).split('').reverse().join('')) !== null && _overwrites$allow$toS !== void 0 ? _overwrites$allow$toS : '';
                  for (var i = 0; i < permissionsLength; i++) {
                    var _revDecDenies$i, _revDecAllows$i;
                    var deny = parseInt((_revDecDenies$i = revDecDenies[i]) !== null && _revDecDenies$i !== void 0 ? _revDecDenies$i : '0');
                    var allow = parseInt((_revDecAllows$i = revDecAllows[i]) !== null && _revDecAllows$i !== void 0 ? _revDecAllows$i : '0');
                    if (deny) {
                      denies |= 1 << i;
                    }
                    if (allow) {
                      allows |= 1 << i;
                    }
                  }
                });
                return _context6.abrupt("return", {
                  allow: allows,
                  deny: denies
                });
              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function resolveOverwritesFromRolesByOrder(_x16, _x17) {
        return _resolveOverwritesFromRolesByOrder.apply(this, arguments);
      }
      return resolveOverwritesFromRolesByOrder;
    }()
  }, {
    key: "resolveOverwritesHierarchy",
    value: function resolveOverwritesHierarchy(permissionOverwritesValues) {
      var result = 0;
      var _iterator = PermissionsManager_createForOfIteratorHelper(permissionOverwritesValues),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var value = _step.value;
          if (value.allow & Permissions.getByName('Root').value) {
            return this.getRootAccessValue();
          }
          result = result & ~value.deny | value.allow;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return result;
    }
  }, {
    key: "getRootAccessValue",
    value: function getRootAccessValue() {
      var result = 0;
      var _iterator2 = PermissionsManager_createForOfIteratorHelper(Permissions.getNames()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var name = _step2.value;
          result |= Permissions.getByName(name).value;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return result;
    }
  }, {
    key: "fetchMembersOrFail",
    value: function () {
      var _fetchMembersOrFail = PermissionsManager_asyncToGenerator( /*#__PURE__*/PermissionsManager_regeneratorRuntime().mark(function _callee7(spaceId, roomId) {
        var results, spaceFail, roomFail, layer;
        return PermissionsManager_regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return Promise.all([spaceId ? this.tracker.spaces.getMe(spaceId) : null, roomId ? this.tracker.rooms.getMe(roomId) : null]);
              case 2:
                results = _context7.sent;
                spaceFail = spaceId && !results[0];
                roomFail = roomId && !results[1];
                if (!(spaceFail || roomFail)) {
                  _context7.next = 8;
                  break;
                }
                layer = spaceFail ? "space (".concat(spaceId, ")") : "room ".concat(roomId);
                throw new Error("Attempting to calculate permissions for a ".concat(layer, " that the user does not belong to"));
              case 8:
                return _context7.abrupt("return", results);
              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function fetchMembersOrFail(_x18, _x19) {
        return _fetchMembersOrFail.apply(this, arguments);
      }
      return fetchMembersOrFail;
    }()
  }]);
  return PermissionsManager;
}(EventTarget);
;// CONCATENATED MODULE: ./src/state-tracker/ChatStateTracker.ts
function ChatStateTracker_typeof(obj) { "@babel/helpers - typeof"; return ChatStateTracker_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, ChatStateTracker_typeof(obj); }
function ChatStateTracker_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ ChatStateTracker_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == ChatStateTracker_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function ChatStateTracker_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function ChatStateTracker_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { ChatStateTracker_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { ChatStateTracker_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ChatStateTracker_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function ChatStateTracker_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, ChatStateTracker_toPropertyKey(descriptor.key), descriptor); } }
function ChatStateTracker_createClass(Constructor, protoProps, staticProps) { if (protoProps) ChatStateTracker_defineProperties(Constructor.prototype, protoProps); if (staticProps) ChatStateTracker_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function ChatStateTracker_defineProperty(obj, key, value) { key = ChatStateTracker_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function ChatStateTracker_toPropertyKey(arg) { var key = ChatStateTracker_toPrimitive(arg, "string"); return ChatStateTracker_typeof(key) === "symbol" ? key : String(key); }
function ChatStateTracker_toPrimitive(input, hint) { if (ChatStateTracker_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (ChatStateTracker_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var ChatStateTracker = /*#__PURE__*/function () {
  /**
   * State of the rooms you are in.
   */

  /**
   * State of the spaces you are in.
   */

  /**
   * State of your permissions.
   */

  function ChatStateTracker(client) {
    var _this = this;
    ChatStateTracker_classCallCheck(this, ChatStateTracker);
    this.client = client;
    ChatStateTracker_defineProperty(this, "rooms", new RoomsManager(this));
    ChatStateTracker_defineProperty(this, "spaces", new SpacesManager(this));
    ChatStateTracker_defineProperty(this, "permissions", new PermissionsManager(this));
    ChatStateTracker_defineProperty(this, "_me", null);
    ChatStateTracker_defineProperty(this, "deferredSession", new DeferredTask());
    this.client.on('Session', function (ev) {
      return _this.handleSession(ev);
    });
  }
  ChatStateTracker_createClass(ChatStateTracker, [{
    key: "me",
    get: function get() {
      return this._me;
    }
  }, {
    key: "getMe",
    value: function () {
      var _getMe = ChatStateTracker_asyncToGenerator( /*#__PURE__*/ChatStateTracker_regeneratorRuntime().mark(function _callee() {
        return ChatStateTracker_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.deferredSession.promise;
              case 2:
                return _context.abrupt("return", this._me);
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
    key: "handleSession",
    value: function handleSession(ev) {
      this._me = ev.user;
      this.deferredSession.resolve();
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
        var _result$headers$get;
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
                if (!((_result$headers$get = result.headers.get('content-type')) !== null && _result$headers$get !== void 0 && _result$headers$get.includes('json'))) {
                  _context.next = 17;
                  break;
                }
                _context.next = 14;
                return result.json();
              case 14:
                _context.t2 = _context.sent;
                _context.next = 20;
                break;
              case 17:
                _context.next = 19;
                return result.text();
              case 19:
                _context.t2 = _context.sent;
              case 20:
                _context.t3 = _context.t2;
                return _context.abrupt("return", {
                  ok: _context.t0,
                  status: _context.t1,
                  data: _context.t3
                });
              case 22:
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