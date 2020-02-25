var express = require('express');
var router = express.Router();
var con = require('../data/continents.js');
const httpStatus = require("http-status-codes");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/continents', function(req, res, next) {
	let newobj = { title: 'Continents', con};
	res.render('continents', newobj);
});

router.get('/countries', function(req, res, next) {
        const mongo = require('mongodb');
        const dbname = "world";
        const constr = `mongodb://localhost:27017`;

        mongo.connect(constr, { useNewUrlParser: true, useUnifiedTopology: true},function (error, con) {
            if (error) {
                throw error;
            }
            const db = con.db(dbname);
            db.collection("country").find().toArray(function (err, data) {
                if (err) {
                    throw err;
                }
                db.collection("city").find().toArray(function (err, dataTwo) {
	                if (err) {
	                    throw err;
	                }
		                db.collection("language").find().toArray(function (err, dataThree) {
		                if (err) {
		                    throw err;
		                }
		                obj = { country: 'Countries', city: 'Cities', lang: "languages", data, dataTwo, dataThree};
		                res.render('countries', obj);
		            });
	            });
            });
        });
});

module.exports = router;
