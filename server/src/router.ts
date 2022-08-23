import * as db from './db/export';
import express, { Request, Response } from "express";
import { router } from "./index";
import jwtCheck from './jwtCheck';

router.use(require('cors')());
router.use(express.json());
router.use(jwtCheck);

router.post("/registration", async (req:Request, res:Response) => {
    const user = await db.registration(req.body);

    if (user.status === 400) { 
        res.sendStatus(user.status);
        return;
    }

    res.send(user.jwt);
});

router.post("/auth", async (req:Request, res:Response) => {
    const jwt = await db.authorization(req.body);

    if ('jwt' in jwt) {
        res.send(jwt.jwt);
        return;
    }

    res.sendStatus(jwt.status);
});

router.post("/create_post", async (req:Request, res:Response) => {
    if (req.jwt) {
        const post = await db.createPosts({...req.body, id: req.jwt.id});
        
        if (post instanceof Error) {
            res.send({ status: 403 });
            return;
        }
        res.send(post.dataValues);
    }
});

router.post("/show_posts", async (req:Request, res:Response) => {
    if (req.jwt) {
        res.send(await db.showPosts(req.jwt.id))
    }
});

router.post("/delete_posts", async (req:Request, res:Response) => {
    if (req.jwt) {
        res.sendStatus(await db.deletePosts({...req.body, id: req.jwt.id}));
    }
});

router.post("/edit_posts", async (req:Request, res:Response) => {
    if (req.jwt) {
        res.sendStatus(await db.editPosts({...req.body, id: req.jwt.id}))
    }
});

module.exports = router;