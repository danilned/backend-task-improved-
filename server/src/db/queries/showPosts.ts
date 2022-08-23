import { posts, users } from "../../models/init-models";
import { Op } from "sequelize";

export async function showPosts(data: number) {
    const rights = await users.findOne({where: {id: data}}).then(data => data?.getDataValue("rights"));

    const obj: {status?: boolean | boolean[]} = { status: true };
    if (rights === 1) {
        obj.status = [true, false]
    }

    return posts.findAll({
        where: {
            [Op.or]: [
                {
                    ...obj
                },
                {
                    id: data
                }
            ]
        }
    })
    .catch((err) => err)
    .then((data: string | posts[]) => {
        if (data instanceof Error) {
            return { status: 407 }
        }
        return data;
    });
}