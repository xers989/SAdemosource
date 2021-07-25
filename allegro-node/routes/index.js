const express = require('express');
const CargoShip = require('../schemas/cargoship');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try{
        const cargoships = await CargoShip.find({});
        res.render('mongoose',{cargoships});
    }catch (err)
    {
        console.error(err);
        next(err);
    }
});

module.exports = router;