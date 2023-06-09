const express = require('express');
const router = express.Router();
const Orders = require('../models/orders');
const auth = require('../Authentication')

router.post('/post',auth, async(req, res, next) => {
    
        const {title,products,totalprice,orderstatus} = req.body
        const newOrder = new Orders({
            title,
            products,
            totalprice,
            orderstatus,
        })
        await newOrder.save()
        .then((user) => res.json({data: user}))
        .catch(err => console.log(err))
    
});


module.exports = router;