import JWT from "jsonwebtoken";

class Security {

    static isAuthenticated = (req, res, next) => {
        let authToken = req.headers["authorization"] || req.headers["Authorization"]
        if (!authToken) {
            res.status(401).json({ message: 'Token de acesso requerido' }) }
        else {
            let token = authToken.split(' ')[1] 
            req.token = token
        }
    
        JWT.verify(req.token, process.env.SECRET_KEY, (err, decodeToken) => { 
            if (err) {
                return res.status(401).json({ message: 'Acesso negado'})
            }
    
            req.roles = decodeToken.roles
            next()
        }) 
    }
    
    static isAdmin = (req, res, next) => { 
        const roles = req.roles
        if (!roles || !roles.contains('admin')) {
            return res.status(403).json({ message: 'Acesso nao permitido'})
        }
        next()
    }
    
}


export default Security