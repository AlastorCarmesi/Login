module.exports = (app, passport) => {

	// index routes
	app.get('/', (req, res) => {
		res.render('index');
	});

	//login view
	app.get('/login', (req, res) => {
		res.render('Login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/Perfil',
		failureRedirect: '/Login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('Registro', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/Perfil',
		failureRedirect: '/Registro',
		failureFlash: true // allow flash messages
	}));

	//profile view
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('Perfil', {
			user: req.user
		});
	});

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}