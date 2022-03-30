"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebApiConnection = void 0;
const ConnectionInterface_1 = require("./ConnectionInterface");
const ObservableInterface_1 = require("./ObservableInterface");
class WebApiConnection extends ObservableInterface_1.EventTarget {
    constructor(config) {
        super();
        this.config = config;
        this.state = ConnectionInterface_1.ConnectionState.ready;
    }
    connect() {
    }
    disconnect() {
    }
    send(data) {
        fetch(this.config.url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.config.token}`,
                ContentType: 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.text())
            .then(this.onMessage);
    }
    onMessage(message) {
        this.emit(ConnectionInterface_1.ConnectionEvent.message, message);
    }
}
exports.WebApiConnection = WebApiConnection;
