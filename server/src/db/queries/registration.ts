import { register, jwtStatus } from "../../types";
import { users } from "../../models/users";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export async function registration( accept:register ): Promise<jwtStatus<400>> {
    if (accept.login.length && accept.password.length && accept.email.length) {
        return users.create({login: accept.login, password: await bcrypt.hash(accept.password, 10), email: accept.email, rights: 0})
        .catch((err: Error) => err)
        .then((data) => { 
            if (data instanceof Error) {
                return { status: 400 };
            }
            return { jwt: jwt.sign({ rights: data.rights, id: data.id }, process.env.JWT), status: 200 }
        });
    }
    return { status: 400 }
}