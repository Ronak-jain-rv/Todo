/* # ********************************************************************** #
   #    Copyright (C) by <Habilelabs>, <2018>								#
   #    www.habilelabs.io													#
   # ********************************************************************** # */


/* ##########################################################################
   #	Purpose: <Main Node file server>									#
   #	SN  Date  			Change Description      		Modified By		#
   #	1   27/09/2018    		Base Version                Ronak Jain		#
   ##########################################################################  */


const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const port = process.env.port || 7200;
const path = require('path');


const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('./config/db');


const app = express();

/* app.use(express.json()); */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// DB connection
mongoose.connect(mongo.url, (err) => {
	if (err) {
		console.log('Error: ', err);
	}
	else {
		console.log('Connected');
	}
});


// model files
/* const model = require('./models/post.model'); */


// Controller files
const controllerLocation = `${__dirname}/controller`;
const controllerFiles = fs.readdirSync(controllerLocation);

controllerFiles.forEach(files => (require(`${controllerLocation}/${files}`))(app));


// Routes files
const routeLocation = `${__dirname}/routes`;
const routeFiles = fs.readdirSync(routeLocation);

routeFiles.forEach(files => (require(`${routeLocation}/${files}`))(app));


// to connect angular with node after building the
// angular dist is the folder where the frontend resides
app.use(express.static(path.join(__dirname, 'client/dist/TODO2')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/dist/TODO2/index.html'));
});


// PORT

app.listen(port, () => console.log(`Port: ${port}`));
