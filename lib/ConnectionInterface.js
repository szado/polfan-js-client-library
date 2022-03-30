"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionEvent = exports.ConnectionState = void 0;
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["pending"] = 0] = "pending";
    ConnectionState[ConnectionState["ready"] = 1] = "ready";
    ConnectionState[ConnectionState["disconnected"] = 2] = "disconnected";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
var ConnectionEvent;
(function (ConnectionEvent) {
    ConnectionEvent["message"] = "message";
    ConnectionEvent["connect"] = "connect";
    ConnectionEvent["disconnect"] = "disconnect";
})(ConnectionEvent = exports.ConnectionEvent || (exports.ConnectionEvent = {}));
