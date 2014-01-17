/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
    grunt.initConfig({
        lint: {
            files: ['*.js', 'assets/*.js']
        },
        jasmine: {
            src:['test/lib/jquery.js', '_ts.js'],
            options: {
                specs: 'test/*Spec.js',
                helpers: 'test/lib/jasmine-jquery-1.3.1.js',
                template: 'test/SpecRunner.tmpl'
            }
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
                browser: true,
                globals: {
                    "jQuery": true,
                    "tiddlyweb": true
                }
            },
            files: {
                src: ["Gruntfile.js", "_ts.js"]
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ["jshint", "jasmine"]);
    // load tasks
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks("grunt-contrib-jshint");

};
