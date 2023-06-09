const express = require('express');
const router = express.Router();
const Books = require('../models/books');
const auth = require('../Authentication')

router.post('/post', async(req, res, next) => {
    for (var i=0; i<req.body.length; i++){
        const {title,writer,image,price,tag} = req.body[i]
        const newBook = new Books({
            title,
            writer,
            image,
            price,
            tag 
        })
        await newBook.save()
        .then((user) => res.json({data: user}))
        .catch(err => console.log(err))
    }
});

router.get('/get', async function(req, res) {
    const result = await Books.find().skip(Number(req.query.start)).limit(Number(req.query.count))
    res.send(result);
});

module.exports = router;