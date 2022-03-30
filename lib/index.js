"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolfanServer = void 0;
const Client_1 = require("./Client");
const WebApiConnection_1 = require("./WebApiConnection");
const MessageInterface_1 = require("./MessageInterface");
const Token_1 = require("./Token");
exports.PolfanServer = {
    MessageType: MessageInterface_1.MessageType,
    client: {
        Client: Client_1.Client,
        connection: {
            WebApiConnection: WebApiConnection_1.WebApiConnection
        }
    },
    auth: {
        getToken: Token_1.getToken
    }
};
