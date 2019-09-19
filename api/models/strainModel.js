'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StrainSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    type: String,
    flowerTime: String,
    phenoNum: Number
});

module.exports = mongoose.model('Strains', StrainSchema);