const mongoose = require('mongoose');

const {Schema} = mongoose;
const cargoship = new Schema(
    {
        tenant: {
            type: String,
            required: true,
        },
        ship: {
            type: String,
            required: true,
        },
        type: 
        {
            type: String,
            required: true,
        },
        weight: {
            size: { 
                type: Number,
            },
            standard: 
            { 
                type: String,
            },
        },
        fuel: {
            averagespeed: { 
                type: Number,
            },
            milespergallon: { 
                type: Number,
            },
            fullyloaded: { 
                type: Number,
            },
        },
        capacity:
        {
            combined: { 
                type: Number,
            },
            average: { 
                type: Number,
            },
        
        }
    }
)

module.exports = mongoose.model('Cargoship', cargoship,'ship');