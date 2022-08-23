import { postId } from "../../types";
import { posts, users } from "../../models/init-models";
 
export async function deletePosts( data: postId ) {
    const user = await users.findByPk(data.id);
    const userId = user?.getDataValue('rights')

    return posts.destroy({
        where: userId === 1 ? 
            {post_id: data.postId} : 
            {
                post_id: data.postId,
                id: data.id
            }
    })
    .catch((err: Error) => err)
    .then((data) => {
        if (data instanceof Error) {
            return 402;
        }
        return 200;
    })
}