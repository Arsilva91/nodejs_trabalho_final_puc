import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {type: String, trim: true, required: true},
        email: {type: String, unique: true, lowercase:true, trim: true, required: true},
        password: {type: String, required: true},
        roles: {type: Array, required: true}
    }    
)

userSchema.methods.comparePassword = function(password) {    
    return bcrypt.compareSync(password, this.password);
  };

const users = mongoose.model('users', userSchema);
export default users;