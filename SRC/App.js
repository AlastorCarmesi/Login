const express = require('express');
const log = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const flash = require('connect-flash')
const morgan = require('morgan')
const cookies = require('cookies-parser')
const passport = require('passport');
const session = require('express-session')

require('./App/Config/Pass')(passport)
//Base de datos
const { url } = require('./App/Config/DB')
mongoose.connect(url).then(bd => console.log('Exito al conectar')).catch(err => console.log(err))

//conexion con el servidor 
app.listen(3000, () =>{
    console.log('Servidor iniciado');
});

//vistas
app.set('views', path.join(__dirname, 'Views'))
app.set('view enngine', 'ejs')



//Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

// required for passport
app.use(session({
	secret: '1234567890',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./App/NRoutes.js')(app, passport);

app.use(express.static(path.join(__dirname, 'Recursos')));