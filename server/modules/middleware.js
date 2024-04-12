export function verifyJwt(req, res, next) {
    jwt.verify(req.body.jsonwebtoken, process.env.JWT_SECRET, (err, decoded) => {
        if(decoded) {
            res.locals.decoded = decoded;
            next();
        } else {
            res.send({error: true, message: "Invalid jwt token!"});
        }
    });
}