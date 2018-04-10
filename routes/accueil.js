
module.exports = function(app, urlApi){
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    var rp = require("request-promise");

    app.get("/", function(req, res) {
        res.render("accueil.ejs", {
            session: req.session
        });
    });
};
