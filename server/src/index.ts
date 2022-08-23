import express from 'express';
import { Sequelize } from 'sequelize';
import { initModels } from "./models/init-models";
require('dotenv').config();
const app = express();
const router = express.Router();
const routerUse = require("./router");

const sequelize = new Sequelize('posts', 'postgres', process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
});

initModels(sequelize);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server has started on the port " + process.env.PORT || 3000);
});

app.use(routerUse);

export { router }