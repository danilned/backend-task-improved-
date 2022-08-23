import { posts as postsType } from "../../types";
import { posts } from "../../models/init-models";
 
export function createPosts( data:postsType ) {
    return posts.create({id: data.id, post_data: data.data, status: data.status})
    .catch((err:Error) => err)
    .then(data => data);
}