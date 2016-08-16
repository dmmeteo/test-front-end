var gutil = require('gulp-util');

module.exports = config;

function config(){
'use strict';

	config.path = {  
	    tmp: {
	        html: '.tmp/',
	        scripts: '.tmp/scripts/',
	        styles: '.tmp/styles/',
	        img: '.tmp/img/'
	    },
	    src: {
	        html: 'src/**/*.html',
	        scripts: 'src/scripts/**/*.js',
	        styles: 'src/styles/**/*.sass',
	        img: 'src/img/**/*.*'
	    },
	    clean: {
	    	tmp: '.tmp/',
	    	dest: 'dist/'
	    }
	},

	config.server = {
	    server: {
	        baseDir: ".tmp/"
	    },
	    tunnel: true,
	    host: 'localhost',
	    port: 3000,
	    notify: false //выкл уведомление
	},

	config.wiredep = {
	    directory: 'bower_components'
	 };

return config;
};