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
exports.showPosts = void 0;
const init_models_1 = require("../../models/init-models");
const sequelize_1 = require("sequelize");
function showPosts(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const rights = yield init_models_1.users.findOne({ where: { id: data } }).then(data => data === null || data === void 0 ? void 0 : data.getDataValue("rights"));
        const obj = { status: true };
        if (rights === 1) {
            obj.status = [true, false];
        }
        return init_models_1.posts.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    Object.assign({}, obj),
                    {
                        id: data
                    }
                ]
            }
        })
            .catch((err) => err)
            .then((data) => {
            if (data instanceof Error) {
                return { status: 407 };
            }
            return data;
        });
    });
}
exports.showPosts = showPosts;
