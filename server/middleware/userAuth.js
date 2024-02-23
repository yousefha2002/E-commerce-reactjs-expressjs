const jwt = require('jsonwebtoken');

exports.userAuth = (req,res,next)=>{
    const token = req.get('Authorization');
    if(!token){
        const error = new Error('No Auth');
        error.statusCode = 403;
        throw error;
    }
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,'secret');
    }
    catch(err){
        throw err;
    }
    if(!decodedToken){
        const error = new Error('No Auth');
        error.statusCode = 403;
        throw error;
    }
    req.userId = decodedToken.userId;
    return next();
}