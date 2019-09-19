'use strict';

module.exports = function(app) {
    var strain = require('../controllers/strainController');

    app.route('/strains')
        .get(strain.all)
        .post(strain.create);

    app.route('/strains/:id')
        .get(strain.get)
        .put(strain.update)
        .delete(strain.delete);
};