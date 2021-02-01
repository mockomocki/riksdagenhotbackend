const express = require('express');
const app = express();
const port = 3001;
const hello = "if you want to start server just do nodemon"
var riksdagRouter = require('./routes/riksdag');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3002");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/', riksdagRouter);

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://mocko:mocko123@database1.opo7e.mongodb.net/database1?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
mongoose.set('useFindAndModify', false);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;