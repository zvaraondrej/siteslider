/*
npm install grunt --save-dev
npm install grunt-bower-install --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-uglify --save-dev
npm install grunt-browser-sync --save-dev
*/

module.exports = function(grunt) {

	grunt.initConfig({
		
		bowerInstall: {
		  target: {
	      src: 'index.html', // point to your HTML file
		  }
		},
		
		jshint: {
      all: ['js/*.js'] //files to lint
    },

    concat: {
	    options: {
	      separator: ';' //separates scripts
	    },
	    dist: {
	      src: ['js/*.js', 'js/**/*.js'], //Using mini match for your scripts to concatenate
	      dest: 'js/script.js' //where to output the script
	    }
	  },

	  uglify: {
   	  js: {
        files: {
          'js/script.js': ['js/script.js'] //save over the newly created script
        }
      }
  	},

  	browserSync: {
 		 files: {
		    src : [
		      'css/*.css',
		      'js/*.js',
		      '*.html'
		    ],
		  },
		  options: {
		    // watchTask: true
		  }
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bower-install');
  grunt.loadNpmTasks('grunt-browser-sync');

  //default tasks to run
  grunt.registerTask('default', ['jshint', 'bowerInstall', 'browserSync']);
  // grunt.registerTask('default', ['jshint', 'bowerInstall']);

  grunt.registerTask('development', ['jshint']);
	grunt.registerTask('production', ['jshint', 'concat', 'uglify']);

};