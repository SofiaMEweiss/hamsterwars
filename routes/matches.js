const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()

// GET /matches
router.get('/', async (req, res) => {
	//	console.log('/hamster REST API');
	//	res.send('/hamsters REST API') 
	try {
	const matchesRef = db.collection('matches')
	const snapshot = await matchesRef.get()
	
	if ( snapshot.empty) {
		// res.send([])
		res.status(404).send("Could not find any matches.")
		return
	}
	
	let items = []
	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id // id behövs för POST + PUT + DELETE
		items.push( data )
	
	})
	res.send(items)
	} catch (err) {
		res.status(500).send(err.message)
	}
	
	
	})
 
module.exports = router