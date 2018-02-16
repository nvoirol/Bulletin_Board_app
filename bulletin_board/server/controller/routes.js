
var pg = require('pg');


var dbUrl = {
	user: process.argv.POSTGRES_USER,
	password: process.argv.POSTGRES_PASSWORD,
	database: 'messagesdb',
	host: 'localhost',
	port: 5432
};


var pgClient = new pg.Client(dbUrl);


pgClient.connect();

var express = require('express');
var path = require('path');

var router = express.Router();

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/html/index.html'));
});

router.get('/update', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/html/update.html'));
});

router.post('/api/message', (req,res) => {
	if(req.body.title !== '' && req.body.body !== ''){
		var query = "INSERT INTO messages (title, body) VALUES ($1, $2)";
		pgClient.query(query, [req.body.title, req.body.body], (error,queryRes) => {
			if(error){
				res.json(error)
			} else {
				res.json(queryRes)
			}
		});
	} else if (req.body.title === '' & req.body.body !== '') {
		var query = "INSERT INTO messages (title, body) VALUES ($1, $2)";
		pgClient.query(query, ["Guest", req.body.body], (error,queryRes) => {
			if(error){
				res.json(error)
			} else {
				res.json(queryRes)
			}
		});		
	} else if ((req.body.title !== '' && req.body.body === '') || (req.body.title === '' && req.body.body === '')) {
		res.json("null_message")
	}
});

router.get('/api/messages', (req,res) => {
	var query = "SELECT * FROM messages";
	pgClient.query(query, (error,queryRes) => {
		if(error){
			res.json(error)
		} else {
			res.json(queryRes)
		}
	});	
});


module.exports = router;