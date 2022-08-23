"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const init_models_1 = require("./models/init-models");
require('dotenv').config();
const app = (0, express_1.default)();
const router = express_1.default.Router();
exports.router = router;
const routerUse = require("./router");
const sequelize = new sequelize_1.Sequelize('posts', 'postgres', process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
});
(0, init_models_1.initModels)(sequelize);
app.listen(process.env.PORT || 3000, () => {
    console.log("Server has started on the port " + process.env.PORT || 3000);
});
app.use(routerUse);
