/* # ********************************************************************** #
   #    Copyright (C) by <Habilelabs>, <2018>								#
   #    www.habilelabs.io													#
   # ********************************************************************** # */


/* ##########################################################################
   #	Purpose: <Route file of node>										#
   #	SN  Date  			Change Description      		Modified By		#
   #	1   27/09/2018    		Base Version                Ronak Jain		#
   ##########################################################################  */



module.exports = (app) => {
	// post route
	app.route('/api/v1/post').post(app.addItem);

	// get route
	app.route('/api/v1/post').get(app.getItem);

	// delete route
	app.route('/api/v1/post/:id').delete(app.deleteItem);

	// put route
	app.route('/api/v1/post/:id').put(app.updateItem);

	// get call of completed item
	app.route('/api/v1/post/complete').get(app.getCompleted);

	// get call of active item
	app.route('/api/v1/post/active').get(app.getActive);

	// delete call to delete completed item
	app.route('/api/v1/posts').delete(app.deleteCompleted);
};
