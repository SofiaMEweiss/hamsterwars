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

	router.get('/:id', async (req,res) =>{
		try {
		const id = req.params.id
		const docRef = await db.collection('matches').doc(id).get()
	
		if( !docRef.exists ) {
			res.status(404).send(`Match with id: ${id} does not exist`)
			return
	
		}
	
		const data = docRef.data()
		res.send(data)
	} catch (err) {
		res.status(500).send(err.message)
	}
	});

//POST /hamsters
router.post('/', async (req, res) => {
	try {

	//express.json måste vara installerat
	const object = req.body

	//kontrollera om hamstern finns???
	if(!object.winnerId || !object.loserId) {
		res.sendStatus(400)
		return
		}

	// if( !isHamsterObject(object) ) {
	// 	res.sendStatus(400)
	// 	return

	const docRef = await db.collection('matches').add(object)
	const idObj = { id: docRef.id }
	res.send(idObj)
} catch (err) {
	res.status(500).send(err.message)
}
})
 
module.exports = router