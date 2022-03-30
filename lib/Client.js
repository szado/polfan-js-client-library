"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const MessageInterface_1 = require("./MessageInterface");
const ObservableInterface_1 = require("./ObservableInterface");
const uuid_1 = require("uuid");
class Client extends ObservableInterface_1.EventTarget {
    constructor(connection) {
        super();
        this.connection = connection;
        this.awaitingResponse = new Map();
        this.connection.on('message', this.onMessage);
    }
    /**
     * Send command to server with given data.
     * Returns Promise which resolves to the event data returned by server in response to command.
     * Rejects with data from the Error event or with connection error.
     */
    call(command, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.getMessage(command, data);
            this.connection.send(message);
            return new Promise((...args) => this.awaitingResponse.set(message.meta.ref, args));
        });
    }
    getMessage(command, data) {
        return {
            meta: {
                type: command,
                ref: (0, uuid_1.v4)()
            },
            data: data
        };
    }
    onMessage(payload) {
        var _a;
        const message = JSON.parse(payload);
        // Resolve promise if exists
        const [resolve, reject] = (_a = this.awaitingResponse.get(message.meta.ref)) !== null && _a !== void 0 ? _a : [];
        if (resolve && reject) {
            if (message.meta.type === MessageInterface_1.MessageType.Error) {
                reject(message.data);
            }
            else {
                resolve(message.data);
            }
            this.awaitingResponse.delete(message.meta.ref);
        }
        // Emit event
        this.emit(message.meta.type, message);
    }
}
exports.Client = Client;
