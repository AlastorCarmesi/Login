module.exports = (app, passport) => {

	// index routes
	app.get('/', (req, res) => {
		res.render('index.ejs');
	});

	//Vista de login
	app.get('/Login', (req, res) => {
		res.render('Login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/Login', passport.authenticate('local-login', {
		successRedirect: '/Hola.ejs',
		failureRedirect: '/Login.ejs',
		failureFlash: true
	}));

	// Vista de Registro
	app.get('/Registro', (req, res) => {
		res.render('Registro.ejs', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/Registro', passport.authenticate('local-signup', {
		successRedirect: '/Hola.ejs',
		failureRedirect: '/Registro',
		failureFlash: true 
	}));

	//Perfil
	app.get('/Perfil',(req, res) => {
		res.render('Perfil.ejs', {
			User: req.User
		});
	});

	// Cerrar sesion
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

