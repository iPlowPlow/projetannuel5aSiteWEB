module.exports = function(app, urlApi, urlLocal, utils ,config) {

	//FRONT
	require("./accueil")(app, urlApi);
	require("./visualisationAnnonce")(app, urlApi, utils, config);
	require("./item")(app, urlApi, utils);
	require("./itemList")(app, urlApi, utils);
	require("./inscription")(app, urlApi, urlLocal, utils);
	require("./connexion")(app, urlApi, utils);
	require("./validationInscription")(app, urlApi);
	require("./deconnexion")(app);
	require("./profil")(app, urlApi, urlLocal, utils);
	require("./becomeProducer")(app, urlApi, utils);
	require("./ficheProducer")(app, urlApi, utils, config);
	require("./product")(app, urlApi);
	require("./cart")(app, urlApi, utils, config);

   
};