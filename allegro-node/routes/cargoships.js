const express = require('express');
const CargoShip = require('../schemas/cargoship');

const router = express.Router();

router.route('/').get( async(req, res, next) => {
    try{
        let query = {};
        tenant = req.query.tenant;
        console.log("Input Query is "+ tenant);
        if (tenant != "") query = {"tenant":tenant};
        const cargoships = await CargoShip.find(query);
        res.json(cargoships);
    }catch (err)
    {
        console.error(err);
        next(err);
    }
})
.post(async (req, res, next) => {
    console.log("Request:"+ JSON.stringify(req.body));
    console.log("request:"+ req.body.tenant);
    console.log("Post start"+ JSON.stringify(req.body));
    try{
        const cargoshiprow = new CargoShip(req.body);
        //console.log(cargoship.tenant)

        const cargoship = await CargoShip.create(
            cargoshiprow
        );
        console.log("POST log");
        res.status(201).json(cargoshiprow);
    }catch (err)
    {
        console.error(err);
        next(err);
    }
});


router.route('/:tenant').get( async(req, res, next) => {
    try{
        let query = {};
        tenant = req.params.tenant;
        console.log("Input Query is "+ tenant);
        if (tenant != "") query = {"tenant":tenant};
        const cargoships = await CargoShip.find(query);
        res.status(200).json(cargoships);
    }catch (err)
    {
        console.error(err);
        next(err);
    }
});

router.route('/:tenant/:ship').get( async(req, res, next) => {
    try{
        let query = {};
        tenant = req.params.tenant;
        ship = req.params.ship;
        console.log("Input Query is "+ tenant+","+ship);
        if (tenant != "") query = {"tenant":tenant, "ship":ship};
        const cargoships = await CargoShip.find(query);
        res.json(cargoships);
    }catch (err)
    {
        console.error(err);
        next(err);
    }
})
.patch(async (req, res, next) => {
    try{
        tenant = req.params.tenant;
        ship = req.params.ship;
        update = req.body;
        const result = await CargoShip.findOneAndUpdate(
            {"tenant":tenant, "ship":ship}, update, {new:true, upsert: true});
        res.json(result);
    }catch (err)
    {
        console.error(err);
        next(err);
    }
})
.delete(async (req, res, next) => {
    try{
        tenant = req.params.tenant;
        ship = req.params.ship;
        const result = await CargoShip.remove({"tenant":tenant, "ship":ship});
        res.json(result);
    }catch (err)
    {
        console.error(err);
        next(err);
    }
});

module.exports = router;