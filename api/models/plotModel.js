'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlotSchema = new Schema({
    room: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    stage: String,
    strain: String,
    abbr: String,
    medium: String,
    startDt: Date,
    flowerDt: Date,
    harvestDt: Date,
    lastWateredDt: Date,
    lightType: String,
    wattage: Number,
    diameter: Number,
    actionItems: Array
});

module.exports = mongoose.model('Plots', PlotSchema);