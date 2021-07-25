const express = require('express');
const CargoShip = require('../schemas/cargoship');

const router = express.Router();

router.route('/:tenant').get( async(req, res, next) => {
    try{
        tenant = req.params.tenant;

        let result = await CargoShip.aggregate([
            { $match: { tenant: tenant }},
            {
              $group: {
                _id: null,
                totalsize: {$sum: '$weight.size'},
                averagespeed: {$avg: '$fuel.averagespeed'},
                milspergallon: {$avg:'$fuel.milespergallon'},
              }
            }
          ]);        
        console.log("Input Query is "+ tenant);
        res.json(result);
    }catch (err)
    {
        console.error(err);
        next(err);
    }
})

module.exports = router;