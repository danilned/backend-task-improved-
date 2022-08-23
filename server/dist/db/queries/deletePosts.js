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
exports.deletePosts = void 0;
const init_models_1 = require("../../models/init-models");
function deletePosts(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield init_models_1.users.findByPk(data.id);
        const userId = user === null || user === void 0 ? void 0 : user.getDataValue('rights');
        return init_models_1.posts.destroy({
            where: userId === 1 ?
                { post_id: data.postId } :
                {
                    post_id: data.postId,
                    id: data.id
                }
        })
            .catch((err) => err)
            .then((data) => {
            if (data instanceof Error) {
                return 402;
            }
            return 200;
        });
    });
}
exports.deletePosts = deletePosts;
