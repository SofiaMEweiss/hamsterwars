const getDatabase = require('../database.js')
const db = getDatabase()
const express = require('express')
const router = express.Router()

// GET /losers
router.get('/', async (req, res) => {
	try {
		const hamsterRef = db.collection('hamsters');

		const snapshot = await hamsterRef.orderBy('defeats', 'desc').limit(5).get();

		const topFiveLosers = [];
		snapshot.forEach(doc => {
			topFiveLosers.push(doc.data());
		});
	 
		res.send(topFiveLosers);
	}
	
	catch(err) {
	console.log(err.message);
	}
})

module.exports = router