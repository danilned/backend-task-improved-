"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const init_models_1 = require("../models/init-models");
const sequelize = new sequelize_1.Sequelize('back-end-task', 'postgres', '123456', {
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
});
(0, init_models_1.initModels)(sequelize);
