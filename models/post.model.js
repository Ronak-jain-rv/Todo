/* # ********************************************************************** #
   #    Copyright (C) by <Habilelabs>, <2018>  								#
   #    www.habilelabs.io													#
   # ********************************************************************** # */


/* ##########################################################################
   #	Purpose: <Model File of node>										#
   #	SN  Date  			Change Description      		Modified By		#
   #	1   27/09/2018    		Base Version                Ronak Jain		#
   ##########################################################################  */



const mongoose = require('mongoose');

const item = new mongoose.Schema({
	item: {
		type: String,
	},
	completed: Boolean,

});

const Item = mongoose.model('todoItem', item);

module.exports = Item;
