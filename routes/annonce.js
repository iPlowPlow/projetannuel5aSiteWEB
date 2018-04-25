module.exports = function(app, urlApi){
  var rp = require("request-promise");
  var msgError;
  var unitsList;
  var categoriesList;
 
	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	
	app.get('/annonce/new', function(req, res, next) {
		if(req.session.type && req.session.type == "productor") {
      msgError="";
      rp({
        url: urlApi + "/units",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (body) {
        if (body.code == 3) {
          res.render("annonceCreate.ejs", { msgError: body.message, session: req.session });
        } else {
          unitsList = JSON.parse(body);
          rp({
            url: urlApi + "/categories",
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(function (body) {
            if (body.code == 3) {
              res.render("annonceCreate.ejs", { msgError: body.message, session: req.session });
            } else {
              categoriesList = JSON.parse(body)
              res.render('annonceCreate.ejs', { msgError: "", units: unitsList, categories: categoriesList, session : req.session });
            }
          }).catch(function (err) {
            console.log(err)
            res.render("annonceCreate.ejs", { msgError: "Erreur inconnue. Merci de réessayer.", session: req.session });
          });
        }
      }).catch(function (err) {
        console.log(err)
        res.render("annonceCreate.ejs", { msgError: "Erreur inconnue. Merci de réessayer.", session: req.session });
      });
		}else{
			res.redirect("/");
		}
	});
};