var PServ;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Client.ts":
/*!***********************!*\
  !*** ./src/Client.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Client = void 0;
const ConnectionInterface_1 = __webpack_require__(/*! ./connections/ConnectionInterface */ "./src/connections/ConnectionInterface.ts");
const ObservableInterface_1 = __webpack_require__(/*! ./ObservableInterface */ "./src/ObservableInterface.ts");
const Envelope_1 = __webpack_require__(/*! ./dtos/protocol/Envelope */ "./src/dtos/protocol/Envelope.ts");
const protocol_1 = __webpack_require__(/*! ./protocol */ "./src/protocol.ts");
function guessCommandType(obj) {
    for (const type in protocol_1.commands) {
        if (obj instanceof protocol_1.commands[type]) {
            return type;
        }
    }
    return Object.getPrototypeOf(obj).constructor.name;
}
class Client extends ObservableInterface_1.EventTarget {
    connection;
    commandsCount = 0;
    awaitingResponse = new Map();
    eventsMap;
    constructor(connection) {
        super();
        this.connection = connection;
        this.setCustomEventMap({}); // Set default event map.
        this.connection.on(ConnectionInterface_1.ConnectionEvent.message, payload => this.onMessage(payload));
        this.connection.on(ConnectionInterface_1.ConnectionEvent.disconnect, () => this.onDisconnect());
    }
    /**
     * Send command to server.
     * @param commandPayload Command payload object.
     * @param commandType Command type; if not specified, it will be guessed from the command payload class name.
     * @return Promise which resolves to the event returned by server (including `Error`)
     * in response to command and rejects with connection error.
     */
    async exec(commandPayload, commandType) {
        const message = this.createEnvelope(commandType ?? guessCommandType(commandPayload), commandPayload);
        this.connection.send(message.toJson());
        return new Promise((...args) => this.awaitingResponse.set(message.meta.ref, args));
    }
    /**
     * Set custom DTO classes for events.
     */
    setCustomEventMap(customMap) {
        this.eventsMap = { ...protocol_1.events, ...customMap };
        return this;
    }
    onMessage(payload) {
        const message = JSON.parse(payload);
        const dto = this.createEventByEnvelope(message);
        const [resolve] = this.awaitingResponse.get(message.meta.ref ?? '') ?? [];
        if (resolve) {
            resolve(dto ?? message.data);
            this.awaitingResponse.delete(message.meta.ref);
        }
        this.emit('message', message);
        this.emit(message.meta.type ?? 'unknown', message, dto);
    }
    onDisconnect() {
        this.awaitingResponse.forEach(([resolve, reject], key) => {
            reject('Disconnected');
            this.awaitingResponse.delete(key);
        });
    }
    createEnvelope(commandType, dto) {
        return new Envelope_1.Envelope({
            meta: {
                type: commandType,
                ref: (++this.commandsCount).toString()
            },
            data: dto
        });
    }
    createEventByEnvelope(message) {
        if ((message.meta.type ?? false) && this.eventsMap.hasOwnProperty(message.meta.type)) {
            return new this.eventsMap[message.meta.type](message.data);
        }
        return null;
    }
}
exports.Client = Client;


/***/ }),

/***/ "./src/ObservableInterface.ts":
/*!************************************!*\
  !*** ./src/ObservableInterface.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventTarget = void 0;
class EventTarget {
    events = new Map();
    on(eventName, handler) {
        const handlers = this.events.get(eventName) ?? [];
        handlers.push(handler);
        this.events.set(eventName, handlers);
        return this;
    }
    emit(eventName, ...args) {
        this.events.get(eventName)?.forEach(callback => callback(...args));
        return this;
    }
}
exports.EventTarget = EventTarget;


/***/ }),

/***/ "./src/Token.ts":
/*!**********************!*\
  !*** ./src/Token.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getToken = void 0;
const apiUrl = 'https://polfan.pl/webservice/api/auth/token';
const defaultClientName = 'Polfan JS Library';
async function getToken(login, password, clientName = defaultClientName) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            login, password, client_name: clientName
        })
    });
    return response.json();
}
exports.getToken = getToken;


/***/ }),

/***/ "./src/connections/ConnectionInterface.ts":
/*!************************************************!*\
  !*** ./src/connections/ConnectionInterface.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "./src/connections/WebApiConnection.ts":
/*!*********************************************!*\
  !*** ./src/connections/WebApiConnection.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebApiConnection = void 0;
const ConnectionInterface_1 = __webpack_require__(/*! ./ConnectionInterface */ "./src/connections/ConnectionInterface.ts");
const ObservableInterface_1 = __webpack_require__(/*! ../ObservableInterface */ "./src/ObservableInterface.ts");
class WebApiConnection extends ObservableInterface_1.EventTarget {
    config;
    state = ConnectionInterface_1.ConnectionState.ready;
    constructor(config) {
        super();
        this.config = config;
    }
    connect() {
        this.emit(ConnectionInterface_1.ConnectionEvent.connect);
    }
    disconnect() {
        this.emit(ConnectionInterface_1.ConnectionEvent.disconnect);
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


/***/ }),

/***/ "./src/connections/WebSocketConnection.ts":
/*!************************************************!*\
  !*** ./src/connections/WebSocketConnection.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebSocketConnection = void 0;
const ObservableInterface_1 = __webpack_require__(/*! ../ObservableInterface */ "./src/ObservableInterface.ts");
const ConnectionInterface_1 = __webpack_require__(/*! ./ConnectionInterface */ "./src/connections/ConnectionInterface.ts");
class WebSocketConnection extends ObservableInterface_1.EventTarget {
    config;
    state = ConnectionInterface_1.ConnectionState.disconnected;
    ws = null;
    constructor(config) {
        super();
        this.config = config;
    }
    connect() {
        this.ws = new WebSocket(`${this.config.url}?token=${this.config.token}`);
        this.ws.onopen = () => this.onOpen();
        this.ws.onclose = () => this.onClose();
        this.ws.onerror = () => this.onClose();
        this.ws.onmessage = ev => this.onMessage(ev);
    }
    disconnect() {
        this.ws?.close();
    }
    send(data) {
        this.ws?.send(data);
    }
    onMessage(event) {
        this.emit(ConnectionInterface_1.ConnectionEvent.message, event.data);
    }
    onClose() {
        this.state = ConnectionInterface_1.ConnectionState.disconnected;
        this.emit(ConnectionInterface_1.ConnectionEvent.disconnect);
    }
    onOpen() {
        this.state = ConnectionInterface_1.ConnectionState.ready;
        this.emit(ConnectionInterface_1.ConnectionEvent.connect);
    }
}
exports.WebSocketConnection = WebSocketConnection;


/***/ }),

/***/ "./src/dtos/Dto.ts":
/*!*************************!*\
  !*** ./src/dtos/Dto.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Dto = exports.castArray = exports.cast = void 0;
function cast(data, dto) {
    if (data instanceof dto) {
        return data;
    }
    return new dto(data);
}
exports.cast = cast;
function castArray(data, dto) {
    if (!Array.isArray(data))
        throw new Error(`Passed data is not an array of ${dto.name}`);
    return data.map(item => cast(item, dto));
}
exports.castArray = castArray;
class Dto {
    constructor(...args) {
    }
    toJson(overrideBy = {}) {
        return JSON.stringify(this.toRaw(overrideBy));
    }
    toRaw(overrideBy = {}) {
        const object = {};
        Object.keys(this).forEach(key => {
            if (overrideBy.hasOwnProperty(key)) {
                object[key] = overrideBy[key];
            }
            else if (this[key] instanceof Dto) {
                object[key] = this[key].toRaw();
            }
            else {
                object[key] = this[key];
            }
        });
        return object;
    }
    clone(overrideBy = {}) {
        return new this.constructor(this.toRaw(overrideBy));
    }
    fill(data, overrideBy = {}) {
        Object.assign(this, { ...data, ...overrideBy });
    }
}
exports.Dto = Dto;


/***/ }),

/***/ "./src/dtos/Message.ts":
/*!*****************************!*\
  !*** ./src/dtos/Message.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Message = void 0;
const Dto_1 = __webpack_require__(/*! ./Dto */ "./src/dtos/Dto.ts");
const User_1 = __webpack_require__(/*! ./User */ "./src/dtos/User.ts");
class Message extends Dto_1.Dto {
    id;
    author;
    topicId;
    content;
    constructor(data) {
        super();
        this.fill(data, {
            author: (0, Dto_1.cast)(data.author, User_1.User),
        });
    }
}
exports.Message = Message;


/***/ }),

/***/ "./src/dtos/Permission.ts":
/*!********************************!*\
  !*** ./src/dtos/Permission.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Permission = void 0;
const Dto_1 = __webpack_require__(/*! ./Dto */ "./src/dtos/Dto.ts");
class Permission extends Dto_1.Dto {
    name;
    value;
    skip;
    constructor(data) {
        super(data);
        this.fill(data);
    }
}
exports.Permission = Permission;


/***/ }),

/***/ "./src/dtos/Role.ts":
/*!**************************!*\
  !*** ./src/dtos/Role.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
const Dto_1 = __webpack_require__(/*! ./Dto */ "./src/dtos/Dto.ts");
class Role extends Dto_1.Dto {
    id;
    name;
    color;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.Role = Role;


/***/ }),

/***/ "./src/dtos/Room.ts":
/*!**************************!*\
  !*** ./src/dtos/Room.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Room = void 0;
const Dto_1 = __webpack_require__(/*! ./Dto */ "./src/dtos/Dto.ts");
const Topic_1 = __webpack_require__(/*! ./Topic */ "./src/dtos/Topic.ts");
class Room extends Dto_1.Dto {
    id;
    name;
    topics;
    constructor(data) {
        super();
        this.fill(data, {
            topics: (0, Dto_1.castArray)(data.topics, Topic_1.Topic),
        });
    }
}
exports.Room = Room;


/***/ }),

/***/ "./src/dtos/RoomMember.ts":
/*!********************************!*\
  !*** ./src/dtos/RoomMember.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomMember = void 0;
const Dto_1 = __webpack_require__(/*! ./Dto */ "./src/dtos/Dto.ts");
const User_1 = __webpack_require__(/*! ./User */ "./src/dtos/User.ts");
class RoomMember extends Dto_1.Dto {
    user;
    constructor(data) {
        super();
        this.fill(data, {
            user: (0, Dto_1.cast)(data.user, User_1.User),
        });
    }
}
exports.RoomMember = RoomMember;


/***/ }),

/***/ "./src/dtos/RoomSummary.ts":
/*!*********************************!*\
  !*** ./src/dtos/RoomSummary.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomSummary = void 0;
const Dto_1 = __webpack_require__(/*! ./Dto */ "./src/dtos/Dto.ts");
class RoomSummary extends Dto_1.Dto {
    id;
    name;
    description;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.RoomSummary = RoomSummary;


/***/ }),

/***/ "./src/dtos/Space.ts":
/*!***************************!*\
  !*** ./src/dtos/Space.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Space = void 0;
const Dto_1 = __webpack_require__(/*! ./Dto */ "./src/dtos/Dto.ts");
const Role_1 = __webpack_require__(/*! ./Role */ "./src/dtos/Role.ts");
class Space extends Dto_1.Dto {
    id;
    name;
    roles;
    constructor(data) {
        super();
        this.fill(data, {
            roles: (0, Dto_1.castArray)(data.roles, Role_1.Role)
        });
    }
}
exports.Space = Space;


/***/ }),

/***/ "./src/dtos/SpaceMember.ts":
/*!*********************************!*\
  !*** ./src/dtos/SpaceMember.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpaceMember = void 0;
const Dto_1 = __webpack_require__(/*! ./Dto */ "./src/dtos/Dto.ts");
const User_1 = __webpack_require__(/*! ./User */ "./src/dtos/User.ts");
class SpaceMember extends Dto_1.Dto {
    user;
    roles;
    constructor(data) {
        super();
        this.fill(data, {
            user: (0, Dto_1.castArray)(data.user, User_1.User),
        });
    }
}
exports.SpaceMember = SpaceMember;


/***/ }),

/***/ "./src/dtos/Topic.ts":
/*!***************************!*\
  !*** ./src/dtos/Topic.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Topic = void 0;
const Dto_1 = __webpack_require__(/*! ./Dto */ "./src/dtos/Dto.ts");
class Topic extends Dto_1.Dto {
    id;
    name;
    description;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.Topic = Topic;


/***/ }),

/***/ "./src/dtos/User.ts":
/*!**************************!*\
  !*** ./src/dtos/User.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const Dto_1 = __webpack_require__(/*! ./Dto */ "./src/dtos/Dto.ts");
class User extends Dto_1.Dto {
    id;
    nick;
    avatar;
    flags;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.User = User;


/***/ }),

/***/ "./src/dtos/UserState.ts":
/*!*******************************!*\
  !*** ./src/dtos/UserState.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserState = void 0;
const Space_1 = __webpack_require__(/*! ./Space */ "./src/dtos/Space.ts");
const Room_1 = __webpack_require__(/*! ./Room */ "./src/dtos/Room.ts");
const Dto_1 = __webpack_require__(/*! ./Dto */ "./src/dtos/Dto.ts");
class UserState extends Dto_1.Dto {
    spaces;
    rooms;
    constructor(data) {
        super();
        this.fill(data, {
            spaces: (0, Dto_1.castArray)(data.spaces, Space_1.Space),
            rooms: (0, Dto_1.castArray)(data.rooms, Room_1.Room),
        });
    }
}
exports.UserState = UserState;


/***/ }),

/***/ "./src/dtos/protocol/Envelope.ts":
/*!***************************************!*\
  !*** ./src/dtos/protocol/Envelope.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Envelope = void 0;
const Dto_1 = __webpack_require__(/*! ../Dto */ "./src/dtos/Dto.ts");
const EnvelopeMeta_1 = __webpack_require__(/*! ./EnvelopeMeta */ "./src/dtos/protocol/EnvelopeMeta.ts");
class Envelope extends Dto_1.Dto {
    meta;
    data;
    constructor(data) {
        super();
        this.fill(data, {
            meta: (0, Dto_1.cast)(data.meta, EnvelopeMeta_1.EnvelopeMeta),
        });
    }
}
exports.Envelope = Envelope;


/***/ }),

/***/ "./src/dtos/protocol/EnvelopeMeta.ts":
/*!*******************************************!*\
  !*** ./src/dtos/protocol/EnvelopeMeta.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnvelopeMeta = void 0;
const Dto_1 = __webpack_require__(/*! ../Dto */ "./src/dtos/Dto.ts");
class EnvelopeMeta extends Dto_1.Dto {
    type;
    ref;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.EnvelopeMeta = EnvelopeMeta;


/***/ }),

/***/ "./src/dtos/protocol/commands/AssignRole.ts":
/*!**************************************************!*\
  !*** ./src/dtos/protocol/commands/AssignRole.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssignRole = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class AssignRole extends Dto_1.Dto {
    roleId;
    spaceId;
    userId;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.AssignRole = AssignRole;


/***/ }),

/***/ "./src/dtos/protocol/commands/CreateMessage.ts":
/*!*****************************************************!*\
  !*** ./src/dtos/protocol/commands/CreateMessage.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateMessage = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class CreateMessage extends Dto_1.Dto {
    topicId;
    content;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.CreateMessage = CreateMessage;


/***/ }),

/***/ "./src/dtos/protocol/commands/CreateRole.ts":
/*!**************************************************!*\
  !*** ./src/dtos/protocol/commands/CreateRole.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRole = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class CreateRole extends Dto_1.Dto {
    spaceId;
    name;
    color;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.CreateRole = CreateRole;


/***/ }),

/***/ "./src/dtos/protocol/commands/CreateRoom.ts":
/*!**************************************************!*\
  !*** ./src/dtos/protocol/commands/CreateRoom.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRoom = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class CreateRoom extends Dto_1.Dto {
    spaceId;
    name;
    description;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.CreateRoom = CreateRoom;


/***/ }),

/***/ "./src/dtos/protocol/commands/CreateSpace.ts":
/*!***************************************************!*\
  !*** ./src/dtos/protocol/commands/CreateSpace.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSpace = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class CreateSpace extends Dto_1.Dto {
    name;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.CreateSpace = CreateSpace;


/***/ }),

/***/ "./src/dtos/protocol/commands/CreateTopic.ts":
/*!***************************************************!*\
  !*** ./src/dtos/protocol/commands/CreateTopic.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTopic = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class CreateTopic extends Dto_1.Dto {
    roomId;
    name;
    description;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.CreateTopic = CreateTopic;


/***/ }),

/***/ "./src/dtos/protocol/commands/DeassignRole.ts":
/*!****************************************************!*\
  !*** ./src/dtos/protocol/commands/DeassignRole.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeassignRole = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class DeassignRole extends Dto_1.Dto {
    roleId;
    spaceId;
    userId;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.DeassignRole = DeassignRole;


/***/ }),

/***/ "./src/dtos/protocol/commands/DeleteRole.ts":
/*!**************************************************!*\
  !*** ./src/dtos/protocol/commands/DeleteRole.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteRole = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class DeleteRole extends Dto_1.Dto {
    roleId;
    spaceId;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.DeleteRole = DeleteRole;


/***/ }),

/***/ "./src/dtos/protocol/commands/DeleteRoom.ts":
/*!**************************************************!*\
  !*** ./src/dtos/protocol/commands/DeleteRoom.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteRoom = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class DeleteRoom extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.DeleteRoom = DeleteRoom;


/***/ }),

/***/ "./src/dtos/protocol/commands/DeleteSpace.ts":
/*!***************************************************!*\
  !*** ./src/dtos/protocol/commands/DeleteSpace.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteSpace = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class DeleteSpace extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.DeleteSpace = DeleteSpace;


/***/ }),

/***/ "./src/dtos/protocol/commands/DeleteTopic.ts":
/*!***************************************************!*\
  !*** ./src/dtos/protocol/commands/DeleteTopic.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteTopic = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class DeleteTopic extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.DeleteTopic = DeleteTopic;


/***/ }),

/***/ "./src/dtos/protocol/commands/GetComputedPermissions.ts":
/*!**************************************************************!*\
  !*** ./src/dtos/protocol/commands/GetComputedPermissions.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetComputedPermissions = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class GetComputedPermissions extends Dto_1.Dto {
    names;
    spaceId;
    roomId;
    topicId;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.GetComputedPermissions = GetComputedPermissions;


/***/ }),

/***/ "./src/dtos/protocol/commands/GetRolePermissions.ts":
/*!**********************************************************!*\
  !*** ./src/dtos/protocol/commands/GetRolePermissions.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetRolePermissions = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class GetRolePermissions extends Dto_1.Dto {
    layer;
    layerId;
    roleId;
    names;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.GetRolePermissions = GetRolePermissions;


/***/ }),

/***/ "./src/dtos/protocol/commands/GetRoomMembers.ts":
/*!******************************************************!*\
  !*** ./src/dtos/protocol/commands/GetRoomMembers.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetRoomMembers = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class GetRoomMembers extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.GetRoomMembers = GetRoomMembers;


/***/ }),

/***/ "./src/dtos/protocol/commands/GetSession.ts":
/*!**************************************************!*\
  !*** ./src/dtos/protocol/commands/GetSession.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSession = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class GetSession extends Dto_1.Dto {
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.GetSession = GetSession;


/***/ }),

/***/ "./src/dtos/protocol/commands/GetSpaceMembers.ts":
/*!*******************************************************!*\
  !*** ./src/dtos/protocol/commands/GetSpaceMembers.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSpaceMembers = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class GetSpaceMembers extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.GetSpaceMembers = GetSpaceMembers;


/***/ }),

/***/ "./src/dtos/protocol/commands/GetSpaceRooms.ts":
/*!*****************************************************!*\
  !*** ./src/dtos/protocol/commands/GetSpaceRooms.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetSpaceRooms = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class GetSpaceRooms extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.GetSpaceRooms = GetSpaceRooms;


/***/ }),

/***/ "./src/dtos/protocol/commands/GetUserPermissions.ts":
/*!**********************************************************!*\
  !*** ./src/dtos/protocol/commands/GetUserPermissions.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserPermissions = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class GetUserPermissions extends Dto_1.Dto {
    layer;
    layerId;
    userId;
    names;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.GetUserPermissions = GetUserPermissions;


/***/ }),

/***/ "./src/dtos/protocol/commands/JoinRoom.ts":
/*!************************************************!*\
  !*** ./src/dtos/protocol/commands/JoinRoom.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JoinRoom = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class JoinRoom extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.JoinRoom = JoinRoom;


/***/ }),

/***/ "./src/dtos/protocol/commands/JoinSpace.ts":
/*!*************************************************!*\
  !*** ./src/dtos/protocol/commands/JoinSpace.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JoinSpace = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class JoinSpace extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.JoinSpace = JoinSpace;


/***/ }),

/***/ "./src/dtos/protocol/commands/LeaveRoom.ts":
/*!*************************************************!*\
  !*** ./src/dtos/protocol/commands/LeaveRoom.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeaveRoom = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class LeaveRoom extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.LeaveRoom = LeaveRoom;


/***/ }),

/***/ "./src/dtos/protocol/commands/LeaveSpace.ts":
/*!**************************************************!*\
  !*** ./src/dtos/protocol/commands/LeaveSpace.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LeaveSpace = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class LeaveSpace extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.LeaveSpace = LeaveSpace;


/***/ }),

/***/ "./src/dtos/protocol/commands/SetRolePermissions.ts":
/*!**********************************************************!*\
  !*** ./src/dtos/protocol/commands/SetRolePermissions.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetRolePermissions = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const Permission_1 = __webpack_require__(/*! ../../Permission */ "./src/dtos/Permission.ts");
class SetRolePermissions extends Dto_1.Dto {
    permissions;
    layer;
    layerId;
    roleId;
    constructor(data) {
        super();
        this.fill(data, {
            permissions: (0, Dto_1.castArray)(data.permissions, Permission_1.Permission),
        });
    }
}
exports.SetRolePermissions = SetRolePermissions;


/***/ }),

/***/ "./src/dtos/protocol/commands/SetUserPermissions.ts":
/*!**********************************************************!*\
  !*** ./src/dtos/protocol/commands/SetUserPermissions.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetUserPermissions = void 0;
const Permission_1 = __webpack_require__(/*! ../../Permission */ "./src/dtos/Permission.ts");
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class SetUserPermissions extends Dto_1.Dto {
    permissions;
    layer;
    layerId;
    userId;
    constructor(data) {
        super();
        this.fill(data, {
            permissions: (0, Dto_1.castArray)(data.permissions, Permission_1.Permission),
        });
    }
}
exports.SetUserPermissions = SetUserPermissions;


/***/ }),

/***/ "./src/dtos/protocol/events/Bye.ts":
/*!*****************************************!*\
  !*** ./src/dtos/protocol/events/Bye.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Bye = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class Bye extends Dto_1.Dto {
    reason;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.Bye = Bye;


/***/ }),

/***/ "./src/dtos/protocol/events/Error.ts":
/*!*******************************************!*\
  !*** ./src/dtos/protocol/events/Error.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Error = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class Error extends Dto_1.Dto {
    code;
    message;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.Error = Error;


/***/ }),

/***/ "./src/dtos/protocol/events/NewMessage.ts":
/*!************************************************!*\
  !*** ./src/dtos/protocol/events/NewMessage.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewMessage = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const Message_1 = __webpack_require__(/*! ../../Message */ "./src/dtos/Message.ts");
class NewMessage extends Dto_1.Dto {
    message;
    constructor(data) {
        super();
        this.fill(data, {
            message: (0, Dto_1.cast)(data.message, Message_1.Message),
        });
    }
}
exports.NewMessage = NewMessage;


/***/ }),

/***/ "./src/dtos/protocol/events/NewRole.ts":
/*!*********************************************!*\
  !*** ./src/dtos/protocol/events/NewRole.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewRole = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const Role_1 = __webpack_require__(/*! ../../Role */ "./src/dtos/Role.ts");
class NewRole extends Dto_1.Dto {
    spaceId;
    role;
    constructor(data) {
        super();
        this.fill(data, {
            role: (0, Dto_1.cast)(data.role, Role_1.Role),
        });
    }
}
exports.NewRole = NewRole;


/***/ }),

/***/ "./src/dtos/protocol/events/NewRoom.ts":
/*!*********************************************!*\
  !*** ./src/dtos/protocol/events/NewRoom.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewRoom = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const RoomSummary_1 = __webpack_require__(/*! ../../RoomSummary */ "./src/dtos/RoomSummary.ts");
class NewRoom extends Dto_1.Dto {
    summary;
    spaceId;
    constructor(data) {
        super();
        this.fill(data, {
            summary: (0, Dto_1.cast)(data.summary, RoomSummary_1.RoomSummary),
        });
    }
}
exports.NewRoom = NewRoom;


/***/ }),

/***/ "./src/dtos/protocol/events/NewTopic.ts":
/*!**********************************************!*\
  !*** ./src/dtos/protocol/events/NewTopic.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewTopic = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const Topic_1 = __webpack_require__(/*! ../../Topic */ "./src/dtos/Topic.ts");
class NewTopic extends Dto_1.Dto {
    roomId;
    topic;
    constructor(data) {
        super();
        this.fill(data, {
            topic: (0, Dto_1.cast)(data.topic, Topic_1.Topic),
        });
    }
}
exports.NewTopic = NewTopic;


/***/ }),

/***/ "./src/dtos/protocol/events/Ok.ts":
/*!****************************************!*\
  !*** ./src/dtos/protocol/events/Ok.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Ok = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class Ok extends Dto_1.Dto {
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.Ok = Ok;


/***/ }),

/***/ "./src/dtos/protocol/events/Permissions.ts":
/*!*************************************************!*\
  !*** ./src/dtos/protocol/events/Permissions.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Permissions = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const Permission_1 = __webpack_require__(/*! ../../Permission */ "./src/dtos/Permission.ts");
class Permissions extends Dto_1.Dto {
    permissions;
    constructor(data) {
        super();
        this.fill(data, {
            permissions: (0, Dto_1.castArray)(data.permissions, Permission_1.Permission),
        });
    }
}
exports.Permissions = Permissions;


/***/ }),

/***/ "./src/dtos/protocol/events/RoleDeleted.ts":
/*!*************************************************!*\
  !*** ./src/dtos/protocol/events/RoleDeleted.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleDeleted = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class RoleDeleted extends Dto_1.Dto {
    roleId;
    spaceId;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.RoleDeleted = RoleDeleted;


/***/ }),

/***/ "./src/dtos/protocol/events/RoomDeleted.ts":
/*!*************************************************!*\
  !*** ./src/dtos/protocol/events/RoomDeleted.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomDeleted = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class RoomDeleted extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.RoomDeleted = RoomDeleted;


/***/ }),

/***/ "./src/dtos/protocol/events/RoomJoined.ts":
/*!************************************************!*\
  !*** ./src/dtos/protocol/events/RoomJoined.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomJoined = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const Room_1 = __webpack_require__(/*! ../../Room */ "./src/dtos/Room.ts");
class RoomJoined extends Dto_1.Dto {
    room;
    constructor(data) {
        super();
        this.fill(data, {
            room: (0, Dto_1.cast)(data.room, Room_1.Room),
        });
    }
}
exports.RoomJoined = RoomJoined;


/***/ }),

/***/ "./src/dtos/protocol/events/RoomLeft.ts":
/*!**********************************************!*\
  !*** ./src/dtos/protocol/events/RoomLeft.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomLeft = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class RoomLeft extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.RoomLeft = RoomLeft;


/***/ }),

/***/ "./src/dtos/protocol/events/RoomMemberJoined.ts":
/*!******************************************************!*\
  !*** ./src/dtos/protocol/events/RoomMemberJoined.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomMemberJoined = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const RoomMember_1 = __webpack_require__(/*! ../../RoomMember */ "./src/dtos/RoomMember.ts");
class RoomMemberJoined extends Dto_1.Dto {
    member;
    constructor(data) {
        super();
        this.fill(data, {
            member: (0, Dto_1.cast)(data.member, RoomMember_1.RoomMember),
        });
    }
}
exports.RoomMemberJoined = RoomMemberJoined;


/***/ }),

/***/ "./src/dtos/protocol/events/RoomMemberLeft.ts":
/*!****************************************************!*\
  !*** ./src/dtos/protocol/events/RoomMemberLeft.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomMemberLeft = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class RoomMemberLeft extends Dto_1.Dto {
    userId;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.RoomMemberLeft = RoomMemberLeft;


/***/ }),

/***/ "./src/dtos/protocol/events/RoomMembers.ts":
/*!*************************************************!*\
  !*** ./src/dtos/protocol/events/RoomMembers.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomMembers = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const RoomMember_1 = __webpack_require__(/*! ../../RoomMember */ "./src/dtos/RoomMember.ts");
class RoomMembers extends Dto_1.Dto {
    members;
    constructor(data) {
        super();
        this.fill(data, {
            members: (0, Dto_1.castArray)(data.members, RoomMember_1.RoomMember),
        });
    }
}
exports.RoomMembers = RoomMembers;


/***/ }),

/***/ "./src/dtos/protocol/events/Session.ts":
/*!*********************************************!*\
  !*** ./src/dtos/protocol/events/Session.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Session = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const UserState_1 = __webpack_require__(/*! ../../UserState */ "./src/dtos/UserState.ts");
const User_1 = __webpack_require__(/*! ../../User */ "./src/dtos/User.ts");
class Session extends Dto_1.Dto {
    serverVersion;
    state;
    user;
    constructor(data) {
        super();
        this.fill(data, {
            state: (0, Dto_1.cast)(data.state, UserState_1.UserState),
            user: (0, Dto_1.cast)(data.user, User_1.User),
        });
    }
}
exports.Session = Session;


/***/ }),

/***/ "./src/dtos/protocol/events/SpaceDeleted.ts":
/*!**************************************************!*\
  !*** ./src/dtos/protocol/events/SpaceDeleted.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpaceDeleted = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class SpaceDeleted extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.SpaceDeleted = SpaceDeleted;


/***/ }),

/***/ "./src/dtos/protocol/events/SpaceJoined.ts":
/*!*************************************************!*\
  !*** ./src/dtos/protocol/events/SpaceJoined.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpaceJoined = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const Space_1 = __webpack_require__(/*! ../../Space */ "./src/dtos/Space.ts");
class SpaceJoined extends Dto_1.Dto {
    space;
    constructor(data) {
        super();
        this.fill(data, {
            space: (0, Dto_1.cast)(data.space, Space_1.Space),
        });
    }
}
exports.SpaceJoined = SpaceJoined;


/***/ }),

/***/ "./src/dtos/protocol/events/SpaceLeft.ts":
/*!***********************************************!*\
  !*** ./src/dtos/protocol/events/SpaceLeft.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpaceLeft = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class SpaceLeft extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.SpaceLeft = SpaceLeft;


/***/ }),

/***/ "./src/dtos/protocol/events/SpaceMemberJoined.ts":
/*!*******************************************************!*\
  !*** ./src/dtos/protocol/events/SpaceMemberJoined.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpaceMemberJoined = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const SpaceMember_1 = __webpack_require__(/*! ../../SpaceMember */ "./src/dtos/SpaceMember.ts");
class SpaceMemberJoined extends Dto_1.Dto {
    member;
    constructor(data) {
        super();
        this.fill(data, {
            member: (0, Dto_1.cast)(data.member, SpaceMember_1.SpaceMember),
        });
    }
}
exports.SpaceMemberJoined = SpaceMemberJoined;


/***/ }),

/***/ "./src/dtos/protocol/events/SpaceMemberLeft.ts":
/*!*****************************************************!*\
  !*** ./src/dtos/protocol/events/SpaceMemberLeft.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpaceMemberLeft = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class SpaceMemberLeft extends Dto_1.Dto {
    userId;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.SpaceMemberLeft = SpaceMemberLeft;


/***/ }),

/***/ "./src/dtos/protocol/events/SpaceMemberUpdate.ts":
/*!*******************************************************!*\
  !*** ./src/dtos/protocol/events/SpaceMemberUpdate.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpaceMemberUpdate = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const SpaceMember_1 = __webpack_require__(/*! ../../SpaceMember */ "./src/dtos/SpaceMember.ts");
class SpaceMemberUpdate extends Dto_1.Dto {
    member;
    constructor(data) {
        super();
        this.fill(data, {
            member: (0, Dto_1.cast)(data.member, SpaceMember_1.SpaceMember),
        });
    }
}
exports.SpaceMemberUpdate = SpaceMemberUpdate;


/***/ }),

/***/ "./src/dtos/protocol/events/SpaceMembers.ts":
/*!**************************************************!*\
  !*** ./src/dtos/protocol/events/SpaceMembers.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpaceMembers = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const SpaceMember_1 = __webpack_require__(/*! ../../SpaceMember */ "./src/dtos/SpaceMember.ts");
class SpaceMembers extends Dto_1.Dto {
    members;
    constructor(data) {
        super();
        this.fill(data, {
            members: (0, Dto_1.castArray)(data.members, SpaceMember_1.SpaceMember),
        });
    }
}
exports.SpaceMembers = SpaceMembers;


/***/ }),

/***/ "./src/dtos/protocol/events/SpaceRooms.ts":
/*!************************************************!*\
  !*** ./src/dtos/protocol/events/SpaceRooms.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SpaceRooms = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
const RoomSummary_1 = __webpack_require__(/*! ../../RoomSummary */ "./src/dtos/RoomSummary.ts");
class SpaceRooms extends Dto_1.Dto {
    summaries;
    constructor(data) {
        super();
        this.fill(data, {
            summaries: (0, Dto_1.castArray)(data.summaries, RoomSummary_1.RoomSummary),
        });
    }
}
exports.SpaceRooms = SpaceRooms;


/***/ }),

/***/ "./src/dtos/protocol/events/TopicDeleted.ts":
/*!**************************************************!*\
  !*** ./src/dtos/protocol/events/TopicDeleted.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopicDeleted = void 0;
const Dto_1 = __webpack_require__(/*! ../../Dto */ "./src/dtos/Dto.ts");
class TopicDeleted extends Dto_1.Dto {
    id;
    constructor(data) {
        super();
        this.fill(data);
    }
}
exports.TopicDeleted = TopicDeleted;


/***/ }),

/***/ "./src/protocol.ts":
/*!*************************!*\
  !*** ./src/protocol.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.commands = exports.events = void 0;
const Bye_1 = __webpack_require__(/*! ./dtos/protocol/events/Bye */ "./src/dtos/protocol/events/Bye.ts");
const Ok_1 = __webpack_require__(/*! ./dtos/protocol/events/Ok */ "./src/dtos/protocol/events/Ok.ts");
const Error_1 = __webpack_require__(/*! ./dtos/protocol/events/Error */ "./src/dtos/protocol/events/Error.ts");
const Session_1 = __webpack_require__(/*! ./dtos/protocol/events/Session */ "./src/dtos/protocol/events/Session.ts");
const Permissions_1 = __webpack_require__(/*! ./dtos/protocol/events/Permissions */ "./src/dtos/protocol/events/Permissions.ts");
const SpaceJoined_1 = __webpack_require__(/*! ./dtos/protocol/events/SpaceJoined */ "./src/dtos/protocol/events/SpaceJoined.ts");
const SpaceLeft_1 = __webpack_require__(/*! ./dtos/protocol/events/SpaceLeft */ "./src/dtos/protocol/events/SpaceLeft.ts");
const SpaceMemberJoined_1 = __webpack_require__(/*! ./dtos/protocol/events/SpaceMemberJoined */ "./src/dtos/protocol/events/SpaceMemberJoined.ts");
const SpaceMemberLeft_1 = __webpack_require__(/*! ./dtos/protocol/events/SpaceMemberLeft */ "./src/dtos/protocol/events/SpaceMemberLeft.ts");
const SpaceMemberUpdate_1 = __webpack_require__(/*! ./dtos/protocol/events/SpaceMemberUpdate */ "./src/dtos/protocol/events/SpaceMemberUpdate.ts");
const SpaceDeleted_1 = __webpack_require__(/*! ./dtos/protocol/events/SpaceDeleted */ "./src/dtos/protocol/events/SpaceDeleted.ts");
const SpaceMembers_1 = __webpack_require__(/*! ./dtos/protocol/events/SpaceMembers */ "./src/dtos/protocol/events/SpaceMembers.ts");
const SpaceRooms_1 = __webpack_require__(/*! ./dtos/protocol/events/SpaceRooms */ "./src/dtos/protocol/events/SpaceRooms.ts");
const NewRole_1 = __webpack_require__(/*! ./dtos/protocol/events/NewRole */ "./src/dtos/protocol/events/NewRole.ts");
const RoleDeleted_1 = __webpack_require__(/*! ./dtos/protocol/events/RoleDeleted */ "./src/dtos/protocol/events/RoleDeleted.ts");
const RoomJoined_1 = __webpack_require__(/*! ./dtos/protocol/events/RoomJoined */ "./src/dtos/protocol/events/RoomJoined.ts");
const RoomLeft_1 = __webpack_require__(/*! ./dtos/protocol/events/RoomLeft */ "./src/dtos/protocol/events/RoomLeft.ts");
const RoomMemberJoined_1 = __webpack_require__(/*! ./dtos/protocol/events/RoomMemberJoined */ "./src/dtos/protocol/events/RoomMemberJoined.ts");
const RoomMemberLeft_1 = __webpack_require__(/*! ./dtos/protocol/events/RoomMemberLeft */ "./src/dtos/protocol/events/RoomMemberLeft.ts");
const RoomMembers_1 = __webpack_require__(/*! ./dtos/protocol/events/RoomMembers */ "./src/dtos/protocol/events/RoomMembers.ts");
const NewRoom_1 = __webpack_require__(/*! ./dtos/protocol/events/NewRoom */ "./src/dtos/protocol/events/NewRoom.ts");
const RoomDeleted_1 = __webpack_require__(/*! ./dtos/protocol/events/RoomDeleted */ "./src/dtos/protocol/events/RoomDeleted.ts");
const NewTopic_1 = __webpack_require__(/*! ./dtos/protocol/events/NewTopic */ "./src/dtos/protocol/events/NewTopic.ts");
const TopicDeleted_1 = __webpack_require__(/*! ./dtos/protocol/events/TopicDeleted */ "./src/dtos/protocol/events/TopicDeleted.ts");
const NewMessage_1 = __webpack_require__(/*! ./dtos/protocol/events/NewMessage */ "./src/dtos/protocol/events/NewMessage.ts");
const GetSession_1 = __webpack_require__(/*! ./dtos/protocol/commands/GetSession */ "./src/dtos/protocol/commands/GetSession.ts");
const SetUserPermissions_1 = __webpack_require__(/*! ./dtos/protocol/commands/SetUserPermissions */ "./src/dtos/protocol/commands/SetUserPermissions.ts");
const GetUserPermissions_1 = __webpack_require__(/*! ./dtos/protocol/commands/GetUserPermissions */ "./src/dtos/protocol/commands/GetUserPermissions.ts");
const GetComputedPermissions_1 = __webpack_require__(/*! ./dtos/protocol/commands/GetComputedPermissions */ "./src/dtos/protocol/commands/GetComputedPermissions.ts");
const JoinSpace_1 = __webpack_require__(/*! ./dtos/protocol/commands/JoinSpace */ "./src/dtos/protocol/commands/JoinSpace.ts");
const LeaveSpace_1 = __webpack_require__(/*! ./dtos/protocol/commands/LeaveSpace */ "./src/dtos/protocol/commands/LeaveSpace.ts");
const CreateSpace_1 = __webpack_require__(/*! ./dtos/protocol/commands/CreateSpace */ "./src/dtos/protocol/commands/CreateSpace.ts");
const DeleteSpace_1 = __webpack_require__(/*! ./dtos/protocol/commands/DeleteSpace */ "./src/dtos/protocol/commands/DeleteSpace.ts");
const GetSpaceMembers_1 = __webpack_require__(/*! ./dtos/protocol/commands/GetSpaceMembers */ "./src/dtos/protocol/commands/GetSpaceMembers.ts");
const GetSpaceRooms_1 = __webpack_require__(/*! ./dtos/protocol/commands/GetSpaceRooms */ "./src/dtos/protocol/commands/GetSpaceRooms.ts");
const CreateRole_1 = __webpack_require__(/*! ./dtos/protocol/commands/CreateRole */ "./src/dtos/protocol/commands/CreateRole.ts");
const DeleteRole_1 = __webpack_require__(/*! ./dtos/protocol/commands/DeleteRole */ "./src/dtos/protocol/commands/DeleteRole.ts");
const AssignRole_1 = __webpack_require__(/*! ./dtos/protocol/commands/AssignRole */ "./src/dtos/protocol/commands/AssignRole.ts");
const DeassignRole_1 = __webpack_require__(/*! ./dtos/protocol/commands/DeassignRole */ "./src/dtos/protocol/commands/DeassignRole.ts");
const SetRolePermissions_1 = __webpack_require__(/*! ./dtos/protocol/commands/SetRolePermissions */ "./src/dtos/protocol/commands/SetRolePermissions.ts");
const GetRolePermissions_1 = __webpack_require__(/*! ./dtos/protocol/commands/GetRolePermissions */ "./src/dtos/protocol/commands/GetRolePermissions.ts");
const JoinRoom_1 = __webpack_require__(/*! ./dtos/protocol/commands/JoinRoom */ "./src/dtos/protocol/commands/JoinRoom.ts");
const LeaveRoom_1 = __webpack_require__(/*! ./dtos/protocol/commands/LeaveRoom */ "./src/dtos/protocol/commands/LeaveRoom.ts");
const CreateRoom_1 = __webpack_require__(/*! ./dtos/protocol/commands/CreateRoom */ "./src/dtos/protocol/commands/CreateRoom.ts");
const DeleteRoom_1 = __webpack_require__(/*! ./dtos/protocol/commands/DeleteRoom */ "./src/dtos/protocol/commands/DeleteRoom.ts");
const GetRoomMembers_1 = __webpack_require__(/*! ./dtos/protocol/commands/GetRoomMembers */ "./src/dtos/protocol/commands/GetRoomMembers.ts");
const CreateTopic_1 = __webpack_require__(/*! ./dtos/protocol/commands/CreateTopic */ "./src/dtos/protocol/commands/CreateTopic.ts");
const DeleteTopic_1 = __webpack_require__(/*! ./dtos/protocol/commands/DeleteTopic */ "./src/dtos/protocol/commands/DeleteTopic.ts");
const CreateMessage_1 = __webpack_require__(/*! ./dtos/protocol/commands/CreateMessage */ "./src/dtos/protocol/commands/CreateMessage.ts");
exports.events = {
    // General events
    Bye: Bye_1.Bye,
    Ok: Ok_1.Ok,
    Error: Error_1.Error,
    Session: Session_1.Session,
    Permissions: Permissions_1.Permissions,
    // Space events
    SpaceJoined: SpaceJoined_1.SpaceJoined,
    SpaceLeft: SpaceLeft_1.SpaceLeft,
    SpaceMemberJoined: SpaceMemberJoined_1.SpaceMemberJoined,
    SpaceMemberLeft: SpaceMemberLeft_1.SpaceMemberLeft,
    SpaceMemberUpdate: SpaceMemberUpdate_1.SpaceMemberUpdate,
    SpaceDeleted: SpaceDeleted_1.SpaceDeleted,
    SpaceMembers: SpaceMembers_1.SpaceMembers,
    SpaceRooms: SpaceRooms_1.SpaceRooms,
    NewRole: NewRole_1.NewRole,
    RoleDeleted: RoleDeleted_1.RoleDeleted,
    // Room events
    RoomJoined: RoomJoined_1.RoomJoined,
    RoomLeft: RoomLeft_1.RoomLeft,
    RoomMemberJoined: RoomMemberJoined_1.RoomMemberJoined,
    RoomMemberLeft: RoomMemberLeft_1.RoomMemberLeft,
    RoomMembers: RoomMembers_1.RoomMembers,
    NewRoom: NewRoom_1.NewRoom,
    RoomDeleted: RoomDeleted_1.RoomDeleted,
    // Topic events
    NewTopic: NewTopic_1.NewTopic,
    TopicDeleted: TopicDeleted_1.TopicDeleted,
    NewMessage: NewMessage_1.NewMessage,
};
exports.commands = {
    // General commands
    GetSession: GetSession_1.GetSession,
    SetUserPermissions: SetUserPermissions_1.SetUserPermissions,
    GetUserPermissions: GetUserPermissions_1.GetUserPermissions,
    GetComputedPermissions: GetComputedPermissions_1.GetComputedPermissions,
    // Space commands
    JoinSpace: JoinSpace_1.JoinSpace,
    LeaveSpace: LeaveSpace_1.LeaveSpace,
    CreateSpace: CreateSpace_1.CreateSpace,
    DeleteSpace: DeleteSpace_1.DeleteSpace,
    GetSpaceMembers: GetSpaceMembers_1.GetSpaceMembers,
    GetSpaceRooms: GetSpaceRooms_1.GetSpaceRooms,
    CreateRole: CreateRole_1.CreateRole,
    DeleteRole: DeleteRole_1.DeleteRole,
    AssignRole: AssignRole_1.AssignRole,
    DeassignRole: DeassignRole_1.DeassignRole,
    SetRolePermissions: SetRolePermissions_1.SetRolePermissions,
    GetRolePermissions: GetRolePermissions_1.GetRolePermissions,
    // Room commands
    JoinRoom: JoinRoom_1.JoinRoom,
    LeaveRoom: LeaveRoom_1.LeaveRoom,
    CreateRoom: CreateRoom_1.CreateRoom,
    DeleteRoom: DeleteRoom_1.DeleteRoom,
    GetRoomMembers: GetRoomMembers_1.GetRoomMembers,
    // Topic commands
    CreateTopic: CreateTopic_1.CreateTopic,
    DeleteTopic: DeleteTopic_1.DeleteTopic,
    CreateMessage: CreateMessage_1.CreateMessage,
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getToken = exports.data = exports.connections = exports.Client = void 0;
const Client_1 = __webpack_require__(/*! ./Client */ "./src/Client.ts");
Object.defineProperty(exports, "Client", ({ enumerable: true, get: function () { return Client_1.Client; } }));
const WebApiConnection_1 = __webpack_require__(/*! ./connections/WebApiConnection */ "./src/connections/WebApiConnection.ts");
const Token_1 = __webpack_require__(/*! ./Token */ "./src/Token.ts");
Object.defineProperty(exports, "getToken", ({ enumerable: true, get: function () { return Token_1.getToken; } }));
const WebSocketConnection_1 = __webpack_require__(/*! ./connections/WebSocketConnection */ "./src/connections/WebSocketConnection.ts");
const protocol_1 = __webpack_require__(/*! ./protocol */ "./src/protocol.ts");
const Dto_1 = __webpack_require__(/*! ./dtos/Dto */ "./src/dtos/Dto.ts");
const Envelope_1 = __webpack_require__(/*! ./dtos/protocol/Envelope */ "./src/dtos/protocol/Envelope.ts");
const EnvelopeMeta_1 = __webpack_require__(/*! ./dtos/protocol/EnvelopeMeta */ "./src/dtos/protocol/EnvelopeMeta.ts");
const connections = {
    WebApi: WebApiConnection_1.WebApiConnection, WebSocket: WebSocketConnection_1.WebSocketConnection
};
exports.connections = connections;
const data = {
    Dto: Dto_1.Dto,
    Envelope: Envelope_1.Envelope,
    EnvelopeMeta: EnvelopeMeta_1.EnvelopeMeta,
    events: protocol_1.events, commands: protocol_1.commands
};
exports.data = data;

})();

PServ = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map