module.exports = function(app){

 
	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	
	app.get('/deconnexion', function(req, res, next) {
		req.session.destroy();
		res.redirect("/");
	});


};