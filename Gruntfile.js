'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        project: {
            app: ['app'],
            assets: ['<%= project.app %>/assets'],
            css: ['<%= project.assets %>/sass/app.scss']
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    compass: false
                },
                files: {
                    '<%= project.assets %>/css/app.css':'<%= project.css %>'
                }
            }
        },
        watch: {
            sass: {
                files: '<%= project.assets %>/sass/{,*/}*.{scss,sass}',
                tasks: ['sass:dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt default task not specified yet, run grunt watch for grunt default tasks of this app;
    grunt.registerTask('default' ['watch', 'sass']);

    /*grunt.registerMultiTask('default','appCache', 'Updates a timestamp in cache.manifest to force browser to pull all files anew', function(){
        //tell grunt to not continue on to other tasks until this one is done
        var done = this.async();
        var now = (new Date()).toUTCString();
        grunt.log.writeln("Updating AppCache Timestamp to NOW: ", now);
        //Use Grunt's file utils to read in the file
        var appCache = grunt.file.read('cache.manifest');
        //look for the comment line that holds our timestamp
        var timeStampIdx = appCache.indexOf('#TIMESTAMP:');
        var updatedFile;
        if(timeStampIdx === -1) {
            //comment doesn't exist, so add it to the bottom
            updatedFile = appCache + '\n#TIMESTAMP:' + now;
        } else {
            //comment exists, so update it with the current timestamp
            updatedFile = appCache.substring(0, timeStampIdx + '#TIMESTAMP:'.length) + now;
        }
        //use Grunt's file util to write the file
        grunt.file.write('cache.manifest', updatedFile);
        //tell Grunt we're done and it can continue
        //mostly for when using grunt watch so the app doesn't refresh before this is done updating the file.
        done();
    });*/



};