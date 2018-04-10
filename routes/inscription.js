/**
 * Created by iPlowPlow on 03/05/2017.
 */
module.exports = function(app, urlApi){

    var rp = require("request-promise");

    // =====================================
    // inscription ==============================
    // =====================================
    // show the inscription form
    app.get("/inscription", function(req, res, next) {

        if(req.session.type && req.session.type != ""){
            res.redirect("/");
        }else {
            res.render("inscription.ejs", {msgError: "", msgSuccess: "", session: req.session});
        }
    });

    // process the inscription form
    app.post("/inscription", function (req, res, next) {
        if(req.session.type && req.session.type != ""){
            res.redirect("/");
        } else {
            if (!req.body.username){
                res.render("inscription.ejs", {
                    msgError:"Veuillez saisir un login !",
                    msgSuccess: "",
                    session : req.session
                });
            } else if(!req.body.password) {
                res.render("inscription.ejs", {
                    msgError:"Veuillez saisir un mot de passe !", msgSuccess: "",
                    session : req.session
                });
            } else if(!req.body.mail) {
                res.render("inscription.ejs", {
                    msgError:"Veuillez saisir un mail !",
                    msgSuccess: "",
                    session : req.session
                });
            } else if(!req.body.passwordConfirm) {
                res.render("inscription.ejs", {
                    msgError:"Veuillez retaper votre mot de passe",
                    msgSuccess: "",
                    session : req.session
                });
            } else if(req.body.password != req.body.passwordConfirm){
                res.render("inscription.ejs", {
                    msgError:"Les mots de passe saisient ne sont pas identiques !",
                    msgSuccess: "",
                    session : req.session
                });
            } else {
                rp({
                    url: urlApi + "/user/findByLogin",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    json: {
                        "loginUser": req.body.username
                    }
                }).then(function(body) {
                    if(body.code == "0"){
                        res.render("inscription.ejs", {
                            msgError : "Cet Utilisateur existe déjà !",
                            msgSuccess : "",
                            session : req.session
                        });
                    } else {
                        rp({
                            url: urlApi + "/user" ,
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            json: {
                                "loginUser": req.body.username,
                                "passwordUser" : req.body.password,
                                "emailUser": req.body.mail
                            }
                        }).then(function(body){
                            res.render("inscription.ejs", {
                                msgError:"",
                                msgSuccess: "Inscription validée !",
                                session : req.session
                            });
                        }).catch(function (err) {
                            res.render("inscription.ejs", {
                                msgError: "Erreur veuillez lors de l'inscription. Veuillez recommmencer !",
                                msgSuccess: "",
                                session : req.session
                            });
                        });
                    }
                });
            }
        }
    });

};
