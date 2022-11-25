const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
const userSchema = new mongoose.Schema({
    local:{
        Email: String,
        Cont: String,
    }
});

userSchema.methods.generateHash = function (Cont){
    return bcrypt.hashSync(Cont, bcrypt.genSaltSync(8), null);
}

userSchema.methods.ContraseñaVal = function (Cont){
    return bcrypt.compareSync(Cont, this.Cont);
}

module.exports = mongoose.model('valores',userSchema);