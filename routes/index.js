module.exports = function(app, urlApi) {

	//FRONT
	require("./accueil")(app, urlApi);
    require("./inscription")(app, urlApi);
   
};