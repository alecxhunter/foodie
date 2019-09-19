'use strict';

module.exports = function(app) {
    var room = require('../controllers/roomController');

    app.route('/rooms')
        .get(room.all)
        .post(room.create);

    app.route('/rooms/:id')
        .get(room.get)
        .put(room.update)
        .delete(room.delete);
};