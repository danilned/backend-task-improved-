const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT;

export default function jwtCheck(req:any, res:any, next:any) {
    const nonSecurePaths = ['/registration', '/auth'];
    if (nonSecurePaths.includes(req.path)) return next();
    try {
        req.jwt = jwt.verify(req.body.jwt, secretKey);
        return next();
    } catch(err) {
        return res.status(404).send("Invalid Token");
    }
}