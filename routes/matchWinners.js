const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()

router.get('/:id', async (req, res) => {

	try {
	const hamsterId = req.params.id;
    const winnerRef = db.collection('matches');
    const snapshot = await winnerRef.where('winnerId', '==', `${hamsterId}`).get();

    if(snapshot.empty){
        res.status(404).send(`Hamster with id: ${hamsterId} have not won any match yet`);
        return;
    }
    matchwinners = [];
    snapshot.forEach(doc =>{
        const data = doc.data();
		data.id = doc.id
        matchwinners.push(data);
    })
    res.send(matchwinners);
} catch (err) {
	res.status(500).send(err.message)
}
 
})


module.exports = router