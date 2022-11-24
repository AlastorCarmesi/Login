const Schema = mongoose.Schema;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const userSchema = new Schema({
    local:{
        Email: String,
        Cont: String,
        NomUs: String,
        Nom: String
    }
});

userSchema.methods.generateHash = function (Cont){
    return bcrypt.hashSync(Cont, bcrypt.genSaltSync(8), null);
}

userSchema.methods.ContraseñaVal = function (Cont){
    return bcrypt.compareSync(Cont, this.Cont);
}

module.exports = mongoose.model('User',userSchema);