module.exports = function(app, urlApi, urlLocal, utils ,config) {

	//FRONT
	require("./accueil")(app, urlApi);
	require("./annonce")(app, urlApi);
	require("./visualisationAnnonce")(app, urlApi);
	require("./inscription")(app, urlApi, urlLocal, utils);
	require("./connexion")(app, urlApi, utils);
	require("./validationInscription")(app, urlApi);
	require("./deconnexion")(app);
	require("./profil")(app, urlApi, urlLocal, utils);
	require("./becomeProducer")(app, urlApi, utils);
	require("./ficheProducer")(app, urlApi, utils,config);
   
};