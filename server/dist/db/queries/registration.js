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
exports.registration = void 0;
const users_1 = require("../../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function registration(accept) {
    return __awaiter(this, void 0, void 0, function* () {
        if (accept.login.length && accept.password.length && accept.email.length) {
            return users_1.users.create({ login: accept.login, password: yield bcrypt.hash(accept.password, 10), email: accept.email, rights: 0 })
                .catch((err) => err)
                .then((data) => {
                if (data instanceof Error) {
                    return { status: 400 };
                }
                return { jwt: jwt.sign({ rights: data.rights, id: data.id }, process.env.JWT), status: 200 };
            });
        }
        return { status: 400 };
    });
}
exports.registration = registration;
