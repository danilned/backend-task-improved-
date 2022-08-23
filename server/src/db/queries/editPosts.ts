import { postData } from "../../types";
import { posts } from "../../models/init-models";

export function editPosts( data:postData ) {
    const obj:{post_data?: string, status?: boolean} = {};
    if (data.data) obj.post_data = data.data;
    if (data.hasOwnProperty('status')) obj.status = data.status;

    return posts.update(obj, {
        where: {
            post_id: data.postId,
            id: data.id,
        }
    })
    .catch((err) => err)
    .then((data) => {
        if (data instanceof Error) {
            return 406
        } 
        return 200
    })
}