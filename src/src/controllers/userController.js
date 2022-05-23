import users from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

class UserController{
    static register = (req, res) => {
        let user = new users(req.body);
        user.password = bcrypt.hashSync(req.body.password, 10);
        user.save((err)=> {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar o usuário.`})
            } else {
                user.password = undefined;
                res.status(201).send(user.toJSON())
            }
        })
    }
    static signIn = (req, res) => {
        users.findOne({email: req.body.email}, {}, (err, user)=>{
            if(err){                
                throw err;
            }            
            if(!user || !user.comparePassword(req.body.password)){
                return res.status(401).json({ message: 'Falha de autenticação. usuário ou password invalido.' });
            }
            return res.json({ token: jwt.sign({ email: user.email, name: user.name, _id: user._id }, process.env.SECRET_KEY) });
        })
    }
    static loginRequired = (req, res, next) => {
        if (req.user) {
            next();
          } else {
        
            return res.status(401).json({ message: 'Usuário não autorizado!' });
          }
    }
    static profile = (req, res, next) => {
        if (req.user) {
            res.send(req.user);
            next();
          } 
          else {
           return res.status(401).json({ message: 'token invalido.' });
          }
    }
}

export default UserController;