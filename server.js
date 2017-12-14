const express = require('express')
const bodyParser= require('body-parser')
const app = express()
var mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//mongoDB and mongoose
var mongoDB = 'mongodb://quang:tomkutit@ds139446.mlab.com:39446/guang';
mongoose.connect(mongoDB, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

//our schema to store the name of user and destination
const Schema = mongoose.Schema;
const userSchema = new Schema({
	name: String,
	destination: String,
	location: {lat: Number, lng: Number}

});
var user = mongoose.model('Users', userSchema);

// Allow Cross-Origin queries to be made
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

//handlers
app.listen(3000, function() {
	console.log('Server is running on port 3000 boi')
})

//get all the users
app.get('/all',function(req,res){
  user.find({})
  .then(function(data){
    res.send(data)
  })
})

//get all travellers with matched destination
app.post('/matched', function (req, res) {
	console.log(req.body.destination),
  user.find({destination:req.body.destination})
  .then(function(data){
  	console.log(data);
    res.send(data);
  })
})


//create new users
app.post('/users', (req, res) => {
	var newUser = new user({
		name: req.body.name,
		destination: req.body.destination,
		location: req.body.location,

	});
	console.log(req.body.name)
	console.log(req.body.destination)
	newUser.save(function(err) {
		if (err){console.log(err);}
		else {console.log("new user saved on db");}
	})
})
