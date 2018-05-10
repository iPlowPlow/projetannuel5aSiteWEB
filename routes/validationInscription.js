
module.exports = function(app, urlApi){
    // =====================================
    // VALIDATION INSCRIPTION PAGE (with login links) ========
    // =====================================
    var rp = require("request-promise");

    app.get("/validationInscription/:code", function(req, res) {
        
        var code = req.params.code;
        
        rp({
            url: urlApi + "/user/findForValidation",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            json: {
                "validationCodeUser": code
            }
        }).then(function(body) {
            if(body.code ==0){
                res.render("validationInscription.ejs", {
                    msgError: "",
                    msgSuccess: "Compte Validé avec succès !",
                    session : req.session
                });
            }else{
                res.render("validationInscription.ejs", {
                    msgError: "Erreur veuillez lors de la validation. Veuillez recommmencer !",
                    msgSuccess: "",
                    session : req.session
                });
            }
        }).catch(function (err) {
            console.log(err);
            res.render("validationInscription.ejs", {
                msgError: "Erreur veuillez lors de la validation. Veuillez recommmencer !",
                msgSuccess: "",
                session : req.session
            });
        });

    });
};
