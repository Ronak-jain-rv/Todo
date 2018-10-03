/* # ********************************************************************** #
   #    Copyright (C) by <Habilelabs>, <2018>								#
   #    www.habilelabs.io													#
   # ********************************************************************** # */


/* ##########################################################################
   #	Purpose: <Controler file of Node>									#
   #	SN  Date  			Change Description      		Modified By		#
   #	1   27/09/2018    		Base Version                Ronak Jain		#
   ##########################################################################  */




const Item = require('../models/post.model');


/*eslint-disable */
module.exports = (app) => {
	/*eslint-enable */


	// Add item
	app.addItem = (req, res) => {
		const item = req.body.item;
		const completed = req.body.completed;
		Item.create({item, completed}, (err) => {
			if (err) {
				return res.status(400).send(err);
			}
			Item.find((error, items) => {
				if (error) {
					return res.status(404).send(error);
				}

				return res.json(items);
			});
		});
	};


	// Get all items
	app.getItem = (req, res) => {
		Item.find({}, (err, item) => {
			if (err) {
				return res.status(404).send(err);
			}
			return res.json(item);
		});
	};


	// Delete a particular item
	app.deleteItem = (req, res) => {
		const id = req.params.id;

		Item.findOne({_id: id}, (err, item) => {
			if (item) {
				Item.remove({_id: id}, (error) => {
					if (error) {
						return res.status(400).send('Id not found');
					}
					Item.find((errors, items) => {
						if (errors) {
							return res.status(404).send(errors);
						}

						return res.json(items);
					});
				});
			} else {
				return res.status(400).send('Id not found');
			}
		});
	};


	// Update the item
	app.updateItem = (req, res) => {
		const id = req.params.id;
		const completed = req.body.completed;

		if (id) {
			Item.update({_id: id}, {$set: {completed}}, (err) => {
				if (err) {
					return res.status(404).send(err);
				}
				Item.find((error, item) => {
					if (error) {
						return res.status(404).send(error);
					}

					return res.json(item);
				});
			});
		} else {
			return res.status(404).send('Item cant be null');
		}
	};


	// Get completed item
	app.getCompleted = (req, res) => {
		Item.find({completed: true}, (err, item) => {
			if (err) {
				return res.status(404).send(err);
			}
			return res.json(item);
		});
	};


	// Get active item
	app.getActive = (req, res) => {
		Item.find({completed: false}, (err, item) => {
			if (err) {
				return res.status(404).send(err);
			}
			return res.json(item);
		});
	};


	// Remove completed item
	app.deleteCompleted = (req, res) => {
		Item.deleteMany({completed: true}, (err) => {
			if (err) {
				return res.status(400).send('Id not found');
			}
			Item.find((error, item) => {
				if (error) {
					return res.status(404).send(error);
				}

				return res.json(item);
			});
		});
	};
};
