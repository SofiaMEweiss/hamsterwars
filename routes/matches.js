const getDatabase = require('../database.js')
const db = getDatabase()
const express = require('express')
const router = express.Router()

// GET /matches
router.get('/', async (req, res) => {
	try {
		const matchesRef = db.collection('matches')
		const snapshot = await matchesRef.get()
	
		if ( snapshot.empty) {
			res.status(404).send("Could not find any matches.")
			return
		}
	
		let matchItems = []
		snapshot.forEach(doc => {
			const data = doc.data()
			data.id = doc.id // id behövs för POST + DELETE
			matchItems.push( data )
		})

		res.send(matchItems)

	} catch (err) {
		res.status(500).send(err.message)
	}
})

// GET /matches/:id
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

//POST /matches
router.post('/', async (req, res) => {
	try {
		const object = req.body

		if(!object.winnerId || !object.loserId) {
			res.sendStatus(400)
			return
		}

		const docRef = await db.collection('matches').add(object)
		const idObj = { id: docRef.id }
		res.send(idObj)
	} catch (err) {
		res.status(500).send(err.message)
	}
})

 //DELETE /matches/:id
 router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
	
		if(!id) {
			res.sendStatus(400);
			return;
		}
	
		const docRef = await db.collection('matches').doc(id).get();

		if(!docRef.exists) {
			res.sendStatus(404);
			return;
		}
	
		await db.collection('matches').doc(id).delete()
			res.sendStatus(200);

	} catch(err) {
			res.status(500).send(err.message);
		} 
});
 
module.exports = router