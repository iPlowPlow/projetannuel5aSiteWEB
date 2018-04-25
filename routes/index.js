module.exports = function(app, urlApi, urlLocal, utils) {

	//FRONT
	require("./accueil")(app, urlApi);
	require("./inscription")(app, urlApi, urlLocal, utils);
	require("./connexion")(app, urlApi, utils);
	require("./validationInscription")(app, urlApi);
	require("./deconnexion")(app);
   
};