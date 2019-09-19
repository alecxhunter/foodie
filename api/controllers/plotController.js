'use strict';
var mongoose = require('mongoose');
var Plot = mongoose.model('Plots');

exports.all = function(req, res) {
    Plot.find({}, function(err, plots) {
      if (err)
        res.send(err);
      res.json(plots);
    });
};
  
exports.create = function(req, res) {
    console.log('CREATE');
    console.log('body: ', req.body);
    var newPlot = new Plot(req.body);
    newPlot.save(function(err, plot) {
        if (err)
            res.send(err);
        res.json(plot);
    });
};

exports.get = function(req, res) {
    Plot.findById(req.params.id, function(err, plot) {
        if (err)
            res.send(err);
        res.json(plot);
    });
};

exports.update = function(req, res) {
    console.log('UPDATE');
    console.log('body: ', req.body);
    Plot.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, plot) {
        if (err)
            res.send(err);
        res.json(plot);
    });
};

exports.delete = function(req, res) {
    Plot.remove({
        _id: req.params.id
    }, function(err, plot) {
        if (err)
        res.send(err);
        res.json({ message: 'Plot successfully deleted' });
    });
}