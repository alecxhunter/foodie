'use strict';

module.exports = function(app) {
    var plot = require('../controllers/plotController');

    app.route('/plots')
        .get(plot.all)
        .post(plot.create);

    app.route('/plots/:id')
        .get(plot.get)
        .put(plot.update)
        .delete(plot.delete);
};