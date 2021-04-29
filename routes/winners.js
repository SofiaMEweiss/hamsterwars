const getDatabase = require('../database.js')
const db = getDatabase()
const express = require('express')
const router = express.Router()

// GET /winners
router.get('/', async (req, res) => {
	try {
		const hamsterRef = db.collection('hamsters');

		const snapshot = await hamsterRef.orderBy('wins', 'desc').limit(5).get();

		const topFiveWinners = [];

		snapshot.forEach(doc => {
			topFiveWinners.push(doc.data());
		});
	 
		res.send(topFiveWinners);
		}
	
	catch(err) {
		console.log(err.message);
	}
})

module.exports = router