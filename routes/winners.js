const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()


// GET /winners
router.get('/', async (req, res) => {
	// let result;
	try {

		const hamsterRef = db.collection('hamsters');

		
		const snapshot = await hamsterRef.where('wins', '>', 0).orderBy('wins', 'desc').limit(5).get();
	// result = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get();

	const topFive = [];
	snapshot.forEach(doc => {
	topFive.push(doc.data());
	});
	 
	res.send(topFive);
	}
	
	catch(err) {
	console.log(err.message);
	}})

module.exports = router