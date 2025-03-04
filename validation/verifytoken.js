const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['auth-token'];

    if (!token) return res.status(401).send('No token provided. Access Denied');
    
    try{
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid token');
    }
}

module.exports = verifyToken;