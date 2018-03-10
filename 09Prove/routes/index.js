var express = require('express');
var router = express.Router();
var pg = require('pg');
const connectString = process.env.DATABASE_URL || 'postgres://limited:limited@localhost:5432/template1';

//made these global so I didnt have to keep passing them.
var weight;
var type;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/price', function(req, res) {
	getPrices(req, res);
});

// This funtion was made so I could pass the express website response object
// to my querey for its call back funtion.
function renderPage(err, databaseResponse, expressResponse) {
	
	const lettStamped = {1:0.5, 2:0.71, 3:0.92, 3.5:1.13};
	const lettMetered = {1:0.47, 2:0.68, 3:0.89, 3.5:1.10};
	const LEn = {1:1, 2:1.21, 3:1.42, 4:1.63, 5:1.84, 6:2.05, 7:2.26, 8:2.47, 9:2.68, 10:2.89, 11:3.10, 12:3.31, 13:3.52};
	const FCPackage = {1:3.5, 2:3.5, 3:3.5, 4:3.5, 5:3.75, 6:3.75, 7:3.75, 8:3.75, 9:4.10, 10:4.45, 11:4.8, 12:5.15, 13:5.5}; 

	console.log(err ? err.stack : databaseResponse.rows[0].price);
	if (err) 
	{
		var Price;
		if (type == 1)
			Price = lettStamped[weight];
		else if (type == 2)
			Price = lettMetered[weight];
		else if (type == 3)
			Price = LEn[weight];
		else if (type == 4)
			Price = FCPackage[weight];
		else
		{
			console.log("ERROR: converting type");
			return;
		}
		Price = Price.toFixed(2);
		expressResponse.render('price', {price: Price});
	}
	else
	{
		var result = [];
		result.push(databaseResponse.rows[0]);

	  	console.log("Result: " + result[0]['price']);

	  	var Price = parseFloat(result[0]['price']);
	  	Price = Price.toFixed(2);
		expressResponse.render('price', {price: Price});
	}
}

// Gets the input and querys the database.
function getPrices(req, exRes)
{
	weight = parseFloat(req.query.weight);
	type = parseInt(req.query.type);

	if (weight > 13) { weight = 13;}

	//Conditional statement for weight.
	if (type <= 2 && weight > 3.5) 
		{
			type = 3;
			weight = Math.round(weight);
		}
	else if (weight != 3.5 || type > 2)
		{
			weight = Math.round(weight);
		}

	//SETUP database
	var db_querey = "SELECT price FROM Prices WHERE package_type = $1 AND weight = $2::float";
	var client = new pg.Client(connectString);

	client.connect();
	client.query(db_querey, [type, weight], (err, DBaseRes) => {
		client.end();
		renderPage(err, DBaseRes, exRes);
	});
}

module.exports = router;
