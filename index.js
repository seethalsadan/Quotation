// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const service = require('./service/route');

const app = express();
const port = process.env.PORT || 8080;

// Use CORS middleware to define allowed origins
app.use(cors());

// Use body-parser to parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Connect to MongoDB using Mongoose
const URI = "mongodb+srv://seethalsadan:cPHVxeManevoRzZY@cluster0.5t8cop2.mongodb.net/ProtectorDb?retryWrites=true&w=majority";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log("Database Connected");
});


// Define routes

// Login API Call
app.post('/login', (req, res) => {
    console.log('Inside login API');
    console.log(req.body);

    service.login(req.body.uname, req.body.password)
        .then((result) => {
            res.status(result.statusCode).json(result);
        });
});

app.get('/get-a-Quote/:quoteno', (req, res) => {
   console.log('Inside get-a-Quote API');
   console.log('Requested quoteno:', req.params.quoteno);
 
   service.getQuote(req.params.quoteno)
     .then((result) => {
       console.log(result.statusCode);
       res.status(result.statusCode).json(result);
     });
 });
 

// Edit Quote API
app.post('/update', (req, res) => {
   console.log('Inside update API');
   console.log(req.body);
 
   service.editQuot(req.body.quoteno, req.body)
     .then((result) => {
       console.log(result.statusCode);
       res.status(result.statusCode).json(result);
     });
 });
 

// Add Quote API
app.post('/addquotation', (req, res) => {
   console.log('Inside addQuotation API');
   console.log(req.body);
 
   service.addQuot(req.body)
     .then((result) => {
       console.log(result.statusCode);
       res.status(result.statusCode).json(result);
     });
 });
 
// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
