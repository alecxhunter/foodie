'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rows: {
        type: Number,
        required: true
    },
    columns: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Rooms', RoomSchema);