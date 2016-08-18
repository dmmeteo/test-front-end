var gutil = require('gulp-util');

module.exports = config;

function config(){
'use strict';

	config.path = {
		TMP: '.tmp/',
        SRC: 'src/',
	    DEST: 'dist/'
	},

	config.wiredep = {
	    directory: 'bower_components'
	 };

return config;
};
