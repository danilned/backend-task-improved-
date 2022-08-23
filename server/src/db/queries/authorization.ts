import { auth } from "../../types";
import { users } from "../../models/init-models";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export function authorization( accept: auth ) {
    return users.findOne(
    { 
        where: { 
            login: accept.login,
        }
    })
    .catch((err: Error) => err)
    .then(async (data) => {
        if (data instanceof users) {
            return {
                access: await bcrypt.compare(accept.password, data.password),
                id: data.id,
                rights: data.rights,
            };
        }
        return { status: 401 };
    })
    .then((data) => {
        if (data !== undefined && data.access) {
            return {
                status: 200,
                jwt: jwt.sign({ rights: data.rights, id: data.id }, process.env.JWT),
            };
        } 

        return { status: 401 };
    })
}