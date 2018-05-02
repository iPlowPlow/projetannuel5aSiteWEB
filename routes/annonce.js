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
      msgSuccess="";
      rp({
        url: urlApi + "/units",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (body) {
        if (body.code == 3) {
          res.render("annonceCreate.ejs", { msgError: body.message, msgSuccess:msgSuccess, session: req.session });
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
              res.render("annonceCreate.ejs", { msgError: body.message, msgSuccess:msgSuccess, session: req.session });
            } else {
              categoriesList = JSON.parse(body)
              res.render('annonceCreate.ejs', { msgError: "", msgSuccess:msgSuccess, units: unitsList, categories: categoriesList, session : req.session });
            }
          }).catch(function (err) {
            console.log(err)
            res.render("annonceCreate.ejs", { msgError: "Erreur inconnue. Merci de réessayer.", msgSuccess:msgSuccess, session: req.session });
          });
        }
      }).catch(function (err) {
        console.log(err)
        res.render("annonceCreate.ejs", { msgError: "Erreur inconnue. Merci de réessayer.", msgSuccess:msgSuccess, session: req.session });
      });
		}else{
			res.redirect("/");
		}
	});

  app.post('/annonce/new', function(req, res, next) {
    if(req.session.type && req.session.type == "productor") {
      msgError="";
      msgSuccess="";
			if(!req.body.name){
				msgError += "\n Veuillez saisir le nom de votre produit ! ";
      }
      if(!req.body.description){
				msgError += "\n Veuillez saisir la description de votre produit ! ";
      }
      if(!req.body.location){
				msgError += "\n Veuillez saisir la localisation de votre produit ! ";
      }
      if(!req.body.photo){
				msgError += "\n Veuillez saisir la localisation de votre produit ! ";
      }
      if(msgError != ""){
        res.render('annonceCreate.ejs', {msgError:msgError, msgSuccess:msgSuccess, session : req.session});
      }else{
        rp({
          url: urlApi + "/item",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          json: {
            "productId": req.body.product,
            "name": req.body.name,
            "description": req.body.description,
            "location": req.body.location,
            "photo": req.body.photo,
            "price": req.body.price,
            "unitId": req.body.unit,
            "quantity": req.body.quantity,
            "userId": req.session.idUser
          }
      }).then(function (body) {
        if (body) {
          if (body.code == "0") {
            res.render("annonceCreate.ejs", {
              msgError: "",
              msgSuccess: "Annonce créée !",
              session: req.session
            }); 
          }
          else {
            res.render("annonceCreate.ejs", { msgError: "Erreur lors de la création de l'annonce. Veuillez recommmencer !",
              msgSuccess: "", session: req.session });
          }
        } else {
          res.render("connexion.ejs", { msgError: "Erreur lors de la création de l'annonce. Veuillez recommmencer !",
              msgSuccess: "", session: req.session });
        }
      }).catch(function (err) {
            console.log(err);
            res.render("annonceCreate.ejs", {
              msgError: "Erreur lors de la création de l'annonce. Veuillez recommmencer !",
              msgSuccess: "",
              session: req.session
            });
          });
      }
    }else{
			res.redirect("/");
		}
  });
};