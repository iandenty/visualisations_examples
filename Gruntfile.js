module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    connect: {
      dev: {
        options: {
          port: 8001,
          base: './dest/',
          open:  true
        }
      }
    },

    watch: {
      scripts: {
        files: ['app/src/js/**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
      handlebars: {
        files: ['app/**/*.hbs'],
        tasks: ['clean', 'assemble']
      }
    },

    uglify: {
      dist: {
        files: {
          'dest/assets/js/app.min.js': ['app/src/js/**/*.js']
        }
      }
    },

    clean: {
      all: ['dest/*.html']
    },

    assemble: {
      options: {
          layoutdir: "app/src/layouts/",
          layout: "default.hbs",
          flatten: true,
          data: 'app/src/data/*.json',
          partials: ['app/src/partials/**/*.hbs' ]
      },
      pages: {
          files: {
              'dest/': ['app/src/pages/*.hbs']
          }
      }
    },

    bb: grunt.file.readJSON('../grunt-bitballoon.json'),
    bitballoon: {
      options: {
        token: '<%= bb.token %>',
        src: 'app/dest'
      },
      dev: {
        site: "poacher-joseph-31200.bitballoon.com"
      },
      prod: {
        site: "poacher-joseph-31200.bitballoon.com"
      }
    }

  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bitballoon');

  /* grunt tasks */
  grunt.registerTask('default', ['clean', 'assemble', 'connect', 'watch']);

  grunt.registerTask('deploy', ['clean', 'assemble', 'uglify',
    'bitballoon:prod'
  ]);
};