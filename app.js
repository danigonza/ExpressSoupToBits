var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });
var redis = require('redis');
var client = redis.createClient();

app.use(express.static('public'));

client.select((process.env.NODE_ENV || 'development').length);

app.get('/cities', function(req, res){
	var cities = client.hkeys('cities', function(err, names){
		if (err) throw err;

		res.json(names);
	});

});

app.post('/cities', urlencode, function(req, res){
	var newCity = req.body;
	client.hset('cities', newCity.name, newCity.description, function(err){
		if (err) throw err;

		res.status(201).json(newCity.name);
	});
});

app.delete('/cities/:name', function(req, res){
		client.hdel('cities', req.params.name, function(err){
			if (err) throw err;
			res.sendStatus(204);
		});
});

module.exports = app;