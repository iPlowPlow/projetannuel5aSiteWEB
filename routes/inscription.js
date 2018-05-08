/**
 * Created by iPlowPlow on 03/05/2017.
 */

 // Test1234(
module.exports = function(app, urlApi,urlLocal,  utils){

    var rp = require("request-promise");
    var bcrypt = require("bcrypt-nodejs");
    
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
            } else if(req.body.password.length<8 || req.body.password.search("[A-Z]+")== -1 || req.body.password.search("[a-z]+")== -1 || req.body.password.search("[0-9]+")== -1 || req.body.password.search("[^ \w]+")== -1) {
               res.render("inscription.ejs", {
                    msgError:"Mot de passe invalide : 8 caractères minimum, au moins une majuscule et une minuscule, un chiffre et un caractère spéciale sont requis ! ",
                    msgSuccess: "",
                    session : req.session
                });
            }else {
                //On génere le Salt
                var ListeCar = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9");
                var salt = "";
                var validationCodeUser ="";
                for (var i = 0; i<50 ; i++){
                    salt += ListeCar[Math.floor(Math.random()*ListeCar.length)];
                    validationCodeUser += ListeCar[Math.floor(Math.random()*ListeCar.length)];
                }

                var pwdSalty = req.body.password + salt
                

                //On vérifie si doublon login ou mail


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
                            url: urlApi + "/user/findByEmail",
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            json: {
                                "emailUser": req.body.mail
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
                                        "passwordUser" : bcrypt.hashSync(pwdSalty, null, null),
                                        "saltUser" : salt,
                                        "emailUser": req.body.mail,
                                        "validationCodeUser" : validationCodeUser
                                    }
                                }).then(function(body){
        
                                    var ServiceMail = utils.ServiceMail;
                                    var myMail = new ServiceMail();
                                    myMail.sendMail(req.body.mail,"Validation Inscription", "Votre inscription à bien été prise en compte. Afin de valider votre inscription merci de suivre le lien suivant : " +urlLocal+"/validationInscription/" +validationCodeUser)
                                    res.render("inscription.ejs", {
                                        msgError:"",
                                        msgSuccess: "Inscription validée !",
                                        session : req.session
                                    });
                                }).catch(function (err) {
                                    console.log(err);
                                    res.render("inscription.ejs", {
                                        msgError: "Erreur veuillez lors de l'inscription. Veuillez recommmencer !",
                                        msgSuccess: "",
                                        session : req.session
                                    });
                                });
                            }
                        }).catch(function (err) {
                            console.log(err);
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
