var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

var cities = {
	'Lotopia': 'description', 
	'Caspania': 'description', 
	'Indigo': 'description'
}

app.get('/cities', function(req, res){
	res.json(Object.keys(cities));
});



module.exports = app;