module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    jekyll: {                             // Task
      options: {                          // Universal options
        bundleExec: true,
        src : '<%= app %>'
      },
      dist: {                             // Target
        options: {                        // Target options
          dest: '<%= dist %>',
          config: '_config.yml,_config.build.yml'
        }
      },
      serve: {                            // Another target
        options: {
          dest: '.jekyll',
          drafts: true
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 
        // 'site/assets/js/src/*.js'
        ],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-jekyll');

  // grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'jekyll']);

};