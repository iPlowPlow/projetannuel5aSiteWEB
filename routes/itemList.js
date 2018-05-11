module.exports = function(app, urlApi, utils){
  var rp = require("request-promise");
  var formidable = require("formidable");
 
	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	
	app.get('/itemList', function(req, res, next) {
    var msgError = "";
    var categories= [];
    var products = [];
    var producers = [];
    var cities = [];
    var listTab = "";
    if(req.session.type){
      rp({
        uri: urlApi + "/item/filter",
        method: "GET",
        json: true,
        headers: {
          'User-Agent': 'Request-Promise'
        },
        qs: {
          limit: '150'
        }
      }).then(function (body) {
        if (body.code == 0) {
          for (var item in body.list) {
            if(!cities.includes(body.list[item].city)){
              cities.push(body.list[item].cities);
            }
            if(!producers.includes({id:body.list[item].idProducer, name:body.list[item].producerFirstName+" "+body.list[item].producerName})){
              producers.push({id:body.list[item].idProducer, name:body.list[item].producerFirstName+" "+body.list[item].producerName});
            }
            if(!categories.includes({id:body.list[item].categId, name:body.list[item].categoryName})){
              categories.push({id:body.list[item].categId, name:body.list[item].categoryName});
            }
            if(!products.includes({id:body.list[item].productId, name:body.list[item].productName, idCat:body.list[item].categId, nameCat:body.list[item].categoryName})){
              products.push({id:body.list[item].productId, name:body.list[item].productName, idCat:body.list[item].categId, nameCat:body.list[item].categoryName});
            }
            listTab += "<tr>"
              +"<td><a href='https://www.w3schools.com'><img src='http://localhost:8888/itemPhotos/5/0.jpg' width='150' height='150'></a></td>"
              +"<td style='text-align:center;vertical-align:middle'><a href='https://www.w3schools.com'><h3>"+body.list[item].itemName+"</h3></a></td>"
              +"<td style='text-align:center;vertical-align:middle'><h5>"+body.list[item].description+"</h5></td>"
              +"<td style='text-align:center;vertical-align:middle'><h5>"+body.list[item].productName+"</h5></td>"
              +"<td style='text-align:center;vertical-align:middle'><h5>"+body.list[item].producerFirstName+" "+body.list[item].producerName+"</h5></td>"
              +"<td style='text-align:center;vertical-align:middle'><h5>"+body.list[item].city+"</h5></td>"
              +"<td style='text-align:center;vertical-align:middle'><h5>"+body.list[item].quantity+" "+ body.list[item].unitName+" disponibles</h5></td>"
              +"<td style='text-align:center;vertical-align:middle'><h3>"+body.list[item].price+"€/"+body.list[item].unitName+"</h3></td>"
            +"</tr>"
          }
          res.render('itemList.ejs', { msgError: "", categories: categories, products: products, producers: producers, cities: cities, listTab: listTab, session : req.session });
        } else {
          res.render("itemList.ejs", { msgError: body.message, session: req.session });
        }
      });
    }else{
			res.redirect("/");
		}
  });
};