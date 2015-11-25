var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

// Redis connection
var redis = require('redis');
var client = redis.createClient();
client.select((process.env.NODE_ENV || 'development').length);

var router = express.Router();

router.route('/')
	.get(function(req, res){
		var cities = client.hkeys('cities', function(err, names){
			if (err) throw err;
			res.json(names);
		});
	})

	.post(urlencode, function(req, res){
		var newCity = req.body;
		if (!newCity.name || !newCity.description){
			 res.sendStatus(400);
			 return false;
		}
		client.hset('cities', newCity.name, newCity.description, function(err){
			if (err) throw err;
			res.status(201).json(newCity.name);
		});
	});

router.route('/:name')
	.get(function(req, res){
		client.hget('cities', req.params.name, function(err, description){
			if (err) throw err;
			res.render('show.ejs', { city: { name: req.params.name, description: description } });
		});
	})

	.delete(function(req, res){
		client.hdel('cities', req.params.name, function(err){
			if (err) throw err;
			res.sendStatus(204);
		});
	});

module.exports = router;