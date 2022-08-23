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
exports.authorization = void 0;
const init_models_1 = require("../../models/init-models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function authorization(accept) {
    return init_models_1.users.findOne({
        where: {
            login: accept.login,
        }
    })
        .catch((err) => err)
        .then((data) => __awaiter(this, void 0, void 0, function* () {
        if (data instanceof init_models_1.users) {
            return {
                access: yield bcrypt.compare(accept.password, data.password),
                id: data.id,
                rights: data.rights,
            };
        }
        return { status: 401 };
    }))
        .then((data) => {
        if (data !== undefined && data.access) {
            return {
                status: 200,
                jwt: jwt.sign({ rights: data.rights, id: data.id }, process.env.JWT),
            };
        }
        return { status: 401 };
    });
}
exports.authorization = authorization;
