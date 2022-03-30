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
exports.getToken = void 0;
const apiUrl = 'https://polfan.pl/webservice/auth/token';
const defaultClientName = 'Polfan JS Library';
function getToken(login, password, clientName = defaultClientName) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(apiUrl, {
            method: 'POST',
            headers: {
                ContentType: 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                login, password, client_name: clientName
            })
        });
        return yield response.json();
    });
}
exports.getToken = getToken;
