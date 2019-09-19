'use strict';
var mongoose = require('mongoose');
var Strain = mongoose.model('Strains');

exports.all = function(req, res) {
    Strain.find({}, function(err, strains) {
      if (err)
        res.send(err);
      res.json(strains);
    });
};
  
exports.create = function(req, res) {
    var newStrain = new Strain(req.body);
    newStrain.save(function(err, strain) {
        if (err)
            res.send(err);
        res.json(strain);
    });
};

exports.get = function(req, res) {
    Strain.findById(req.params.id, function(err, strain) {
        if (err)
            res.send(err);
        res.json(strain);
    });
};

exports.update = function(req, res) {
    Strain.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, strain) {
        if (err)
            res.send(err);
        res.json(strain);
    });
};

exports.delete = function(req, res) {
    Strain.remove({
        _id: req.params.id
    }, function(err, strain) {
        if (err)
        res.send(err);
        res.json({ message: 'Strain successfully deleted' });
    });
}