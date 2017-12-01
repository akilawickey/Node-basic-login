// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var engines = require('consolidate');
var path = require('path')


var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
var io = require('socket.io');

//IoT ==========================================================================

// var t_p,h_p,s_p,l_p;
// var t = '';
// var h = '';
// var s = '';
// var l = '';
// var count = 0;

// var hum_ = [];
// var light_ = [];
// var temp_ = [];
// var soil_ = [];


// mongoose.Promise = global.Promise;

//     var uristring = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/greenhouse';

//       mongoose.connect(uristring, function (err, res) {
//       if (err) { 
//         console.log ('ERROR connecting to: ' + uristring + '. ' + err);
//       } else {
//         console.log ('Succeeded connected to: ' + uristring);
//       }
//     });
//     // This is the schema.  Note the types, validation and trim 
//     // statements.  They enforce useful constraints on the data.
//     var userSchema = new mongoose.Schema({

//       date : { type: String},
//       rule_name : { type: String},
//       actuator_type: { type: String},
//       from: { type: String},
//       to: { type: String}

//     });
//     var mqtt_status = new mongoose.Schema({

//       time : { type: String},
//       mqtt_topic : { type: String},
//       status: { type: String}

//     });
//     var t_data = new mongoose.Schema({

//       time : { type: String},
//       val: { type: String}

//     });
//     var h_data = new mongoose.Schema({

//       time : { type: String},
//       val: { type: String}

//     });
//     var s_data = new mongoose.Schema({

//       time : { type: String},
//       val: { type: String}

//     });
//     var l_data = new mongoose.Schema({

//       time : { type: String},
//       val: { type: String}

//     });
//     // Compiles the schema into a model, opening (or creating, if
//     // nonexistent) the 'PowerUsers' collection in the MongoDB database
//     var PUser = mongoose.model('data_store', userSchema);
//     var PUser2 = mongoose.model('mqtt_store', mqtt_status);
//     var PUser3 = mongoose.model('temp_data', t_data);
//     var PUser4 = mongoose.model('hum_data', h_data);
//     var PUser5 = mongoose.model('soil_data', s_data);
//     var PUser6  = mongoose.model('light_data', l_data);



// =============================================================================

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

app.engine('html', require('ejs').renderFile);

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
