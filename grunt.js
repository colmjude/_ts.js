/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['*.js', 'assets/*.js']
    },
    jasmine: {
        src:['test/lib/jquery.js', '_ts.js'],
        specs: 'test/*Spec.js',
        helpers: 'test/lib/jasmine-jquery-1.3.1.js',
        timeout: 10000,
        template: 'test/SpecRunner.tmpl'
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {}
    }
  });

	// Default task.
	grunt.registerTask('default', 'lint jasmine');
	// load tasks
	grunt.loadNpmTasks('grunt-jasmine-runner');

};
