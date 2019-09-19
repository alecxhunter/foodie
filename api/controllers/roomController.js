'use strict';
var mongoose = require('mongoose');
var Room = mongoose.model('Rooms');

exports.all = function(req, res) {
    console.log('room.all')
    Room.find({}, function(err, room) {
      if (err)
        res.send(err);
      res.json(room);
    });
};
  
exports.create = function(req, res) {
    console.log('room.create')
    console.log(req.body);
    var newRoom = new Room(req.body);
    newRoom.save(function(err, room) {
        if (err)
        res.send(err);
        res.json(room);
    });
};

exports.get = function(req, res) {
    console.log('room.get(' + req.params.id + ')')
    Room.findById(req.params.id, function(err, room) {
        if (err)
        res.send(err);
        res.json(room);
    });
};

exports.update = function(req, res) {
    console.log('room.update(' + req.params.id + ')')
    console.log(req.body)
    Room.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, room) {
        if (err)
        res.send(err);
        res.json(room);
    });
};

exports.delete = function(req, res) {
    Room.remove({
        _id: req.params.id
    }, function(err, room) {
        if (err)
        res.send(err);
        res.json({ message: 'Room successfully deleted' });
    });
}