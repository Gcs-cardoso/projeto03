const jwt = require("jsonwebtoken")

module.exports = (req,res,next) =>{
    const authHeader = req.get('Authorization')
    if(!authHeader){
        req.isAuth = false
        return next()
    }
//separa a string em portador/token
   
const token = authHeader.split(' ')[1]
    if(!token || token===''){
        req.isAuth = false
        return next()
    }
    
    let checktoken;
    try {
        checktoken = jwt.verify(token,'secretkey')
    } catch (err) {
        req.isAuth=false
        return next()
    }
     if (!checktoken) {
         req.isAuth=false
         return next()
     }
        req.isAuth=true
        req.idUsuario= checktoken.idUsuario
        next()
}