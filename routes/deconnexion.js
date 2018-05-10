module.exports = function(app){

	app.get('/deconnexion', function(req, res, next) {
		req.session.destroy();
		res.redirect("/");
	});


};