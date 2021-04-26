const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()


// REST API 

// GET /hamsters
router.get('/', async (req, res) => {
//	console.log('/hamster REST API');
//	res.send('/hamsters REST API') 

const hamstersRef = db.collection('hamsters')
const snapshot = await hamstersRef.get()

if ( snapshot.empty) {
	res.send([])
	return
}

let items = []
snapshot.forEach(doc => {
	const data = doc.data()
	data.id = doc.id // id behövs för POST + PUT + DELETE
	items.push( data )

})
res.send(items)


})

// GET RANDOM
router.get('/random', async (req, res) => {

	const hamstersRef = db.collection('hamsters');
	const snapshot = await hamstersRef.get();
	if (snapshot.empty) {
		res.send([])
		return
	}
       items = []

	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id 
		items.push(data)
	})

	const randomIndex = Math.floor(Math.random() * items.length)
	res.status(200).send(items[randomIndex])

})

// GET /hamsters/:id

router.get('/:id', async (req,res) =>{
	const id = req.params.id
	const docRef = await db.collection('hamsters').doc(id).get()

	if( !docRef.exists ) {
		res.status(404).send('Hamster does not exist')
		return

	}

	const data = docRef.data()
	res.send(data)
});





//POST /hamsters
router.post('/', async (req, res) => {

	//express.json måste vara installerat
	const object = req.body


	if( !isHamsterObject(object) ) {
		res.sendStatus(400)
		return
	}

	const docRef = await db.collection('hamsters').add(object)
	const idObj = { id: docRef.id }
	res.send(idObj)
	
})

// PUT /hamsters/:id
router.put('/:id', async (req, res) => {
	const object = req.body
	const id = req.params.id

	if( !object ||!id ) {
		res.sendStatus(400)
		return
	}

	//Todo, kontrollera att objektet finns i databasen

	const docRef =db.collection('hamsters').doc(id)

	await db.collection('hamsters').doc(id).set(object, {merge: true })
	res.sendStatus(200)
})

function isHamsterObject(maybeObject) {
	if( !maybeObject ) 
	return false

	return true
}
// DELETE /hamsters/:id
router.delete('/:id', async (req, res) => {
	const id = req.params.id

	
	if ( !id ) {
		res.sendStatus(400)
		return
	}

	await db.collection('hamsters').doc(id).delete()
	res.sendStatus(200)

})



module.exports = router