const getDatabase = require('../database.js')
const db = getDatabase()

const express = require('express')
const router = express.Router()

router.get('/:id', async (req, res) => {
	const id = req.params.id;
    const winnerRef = db.collection('matches');
    const snapshot = await winnerRef.where('winnerId', '==', `${id}`).get();
    if(snapshot.empty){
        res.status(404).send(`Hamster with id: ${id} have not won any match yet`);
        return;
    }
    matchwinners = [];
    snapshot.forEach(doc =>{
        const data = doc.data();
        matchwinners.push(data);
    })
    res.send(matchwinners);
 
})


module.exports = router