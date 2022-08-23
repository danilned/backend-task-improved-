"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("./index");
const users_1 = require("../models/users");
module.exports = function authorization(data) {
    return users_1.users.findOne({ where: { login: data.login } });
};
