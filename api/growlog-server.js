var express = require('express');
var app = express();
var port = /* process.env.PORT ||  */8085;
var mongoose = require('mongoose');
var Room = require('./models/roomModel');
var Plot = require('./models/plotModel');
var Strain = require('./models/strainModel');
var bodyParser = require('body-parser');
var cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/igrow');

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var roomRoutes = require('./routes/roomRoutes');
var plotRoutes = require('./routes/plotRoutes');
var strainRoutes = require('./routes/strainRoutes');
roomRoutes(app);
plotRoutes(app);
strainRoutes(app);

app.listen(port);

console.log('[' + new Date().toLocaleString() +  '] iGrow API started on port ', port);