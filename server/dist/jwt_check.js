"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT;
function jwtCheck(req, res, next) {
    const nonSecurePaths = ['/registration', '/auth'];
    if (nonSecurePaths.includes(req.path))
        return next();
    try {
        req.jwt = jwt.verify(req.body.jwt, secretKey);
        return next();
    }
    catch (err) {
        return res.status(404).send("Invalid Token");
    }
}
exports.default = jwtCheck;
