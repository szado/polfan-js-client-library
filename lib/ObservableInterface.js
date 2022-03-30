"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTarget = void 0;
class EventTarget {
    constructor() {
        this.events = new Map();
    }
    on(eventName, handler) {
        var _a;
        const handlers = (_a = this.events.get(eventName)) !== null && _a !== void 0 ? _a : [];
        handlers.push(handler);
        this.events.set(eventName, handlers);
        return this;
    }
    emit(eventName, ...args) {
        var _a;
        (_a = this.events.get(eventName)) === null || _a === void 0 ? void 0 : _a.forEach(callback => callback(...args));
        return this;
    }
}
exports.EventTarget = EventTarget;
