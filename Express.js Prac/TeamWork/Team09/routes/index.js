var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET data
router.get('/math', function(req, res) {
	doMath(req, res);
});

function doMath(req, res) {
	var x = parseInt(req.query.x);
	var y =  parseInt(req.query.y);
	var op = req.query.operation;
	var z;
	var opS;

	//Do calculations and save them.
	switch(op) {
		case 'add':
			z = x + y;
			opS = '+';
			break;
		case 'sub':
			z = x - y;
			opS = '-';
			break;
		case 'mul':
			z = x * y;
			opS = '*';
			break;
		case 'div':
			z = x / y;
			opS = '/';
			break;
	} 
	console.log("Z: " + z);
	var data = {X: x, Y: y, Z: z, Op: opS};
	res.render('result', data);
};

module.exports = router;
