const LocalStrategy = require('passport-local').Strategy;
const valores = require('../App/Model/User');

module.exports = function (passport) {
 passport.serializeUser(function (User, done){
  done(null, User.id)
 });

 passport.deserializeUser(function(id, done){
  valores.findById(id, function(err, User){
    done(err,User);
  });
 });

 passport.use('local-signup', new LocalStrategy({
  usernameField: 'Email',
  passwordField: 'Cont',
  passReqToCallback: true
 },
 function (req, Email, Cont, done){
  valores.findOne({'local.Email': Email},
  function (err, User){
    if (err) {return done(err); }

    if (User){return done(null, false, req.flash('signupMessage','el correo ya esta en uso'));
  }
  else{

    var newUser = new valores();
    newUser.local.Email = Email;
    newUser.local.Cont = newUser.generateHash(Cont);
    newUser.save(function(err){
      if (err) {throw err;}
      return done(null, newUser)
    });
  }})
 }));

 passport.use('local-login', new LocalStrategy({
  usernameField: 'Email',
  passwordField: 'Cont',
  passReqToCallback: true
 },
 function (req, Email, Cont, done) {
  valores.findOne({'local.Email': Email}, function (err, User){
    if (err) {return done(err); }
    if (!User){
      return done(null, false, req.flash('loginMessage','ocurrio un problema'));
  }
  if(!User.ContraseñaVal(Cont)){
    return done(null, false, req.flash('loginMessage','Revisa la contraseña'));
  }
  return done(null, User);
  })
}));

}