var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/cities', function(req, res){
	var cities = ['Lotopia', 'Caspania', 'Indigo']
	res.json(cities);
});

module.exports = app;