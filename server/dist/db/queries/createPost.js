"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPosts = void 0;
const init_models_1 = require("../../models/init-models");
function createPosts(data) {
    return init_models_1.posts.create({ id: data.id, post_data: data.data, status: data.status })
        .catch((err) => err)
        .then(data => data);
}
exports.createPosts = createPosts;
