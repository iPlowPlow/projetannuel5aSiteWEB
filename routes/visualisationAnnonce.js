module.exports = function(app, urlApi){

    app.get("/visualisationAnnonce", function(req, res) {
        res.render("visualisationAnnonce.ejs", {
            session: req.session
        });
    });
};
