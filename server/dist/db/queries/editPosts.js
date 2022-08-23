"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPosts = void 0;
const init_models_1 = require("../../models/init-models");
function editPosts(data) {
    const obj = {};
    if (data.data)
        obj.post_data = data.data;
    if (data.hasOwnProperty('status'))
        obj.status = data.status;
    return init_models_1.posts.update(obj, {
        where: {
            post_id: data.postId,
            id: data.id,
        }
    })
        .catch((err) => err)
        .then((data) => {
        if (data instanceof Error) {
            return 406;
        }
        return 200;
    });
}
exports.editPosts = editPosts;
