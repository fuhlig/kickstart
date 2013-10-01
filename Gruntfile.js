module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    watch: {
      scss: {
        files: ['scss/**/*.scss'],
        tasks: 'scss'
      },
      html: {
        files: ['src/**/*.hbs'],
        tasks: 'html'
      },
      js: {
        files: ['js/**/*.js'],
        tasks: 'js'
      },
      livereload: {
        options: {
          livereload: true,
          debounceDelay: 600
        },
        files: [
          'dist/**/*.html',
          'dist/assets/css/{,*/}*.css',
          'dist/assets/js/{,*/}*.js'
        ]
      }
    },

    // GRUNT-SASS
    sass: {
      dist: {
        options: {
          style: 'expanded',
          sourcemap: true
        },

        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },


    // https://github.com/nDmitry/grunt-autoprefixer
    autoprefixer: {
      build: {
        options: {
          browsers: ['last 2 versions', '> 1%']
        },
        files: [
          {
            src : ['**/*.css', '!**/*autoprefixed.css'],
            cwd : 'css',
            dest : 'css',
            ext : '.autoprefixed.css',
            expand : true
          }
        ]
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          // change this to '0.0.0.0' or '*' to access the server from outside
          hostname: '0.0.0.0',
          base: './'
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.server.options.port %>'
      }
    },

    // compiles handlebars templates
    assemble: {
      options: {
        flatten: true,
        layout: 'layout.hbs',
        layoutdir: 'src/templates/layouts',
        assets: 'dist/assets',
        partials: ['src/templates/pages/*.hbs', 'src/templates/parts/*.hbs']
      },
      demo: {
        options: {
          data: ['src/data/*.{json,yml}']
        },
        files: {
          'dist/': ['src/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      demo: {
        files: [
          { expand: true, cwd: './css', src: ['./**/*.*'], dest: 'dist/assets/css' },
          { expand: true, cwd: './js', src: ['./**/*.*'], dest: 'dist/assets/js' }
        ]
      },
      css: {
        files: [
          { expand: true, cwd: './css', src: ['./**/*.*'], dest: 'dist/assets/css' }
        ]
      },
      js: {
        files: [
          { expand: true, cwd: './js', src: ['./**/*.*'], dest: 'dist/assets/js' }
        ]
      },
      js_vendor: {
        files: [
          { expand: true, cwd: './bower_components/jquery', src: ['jquery.js'], dest: 'js/vendor' },
          { expand: true, cwd: './bower_components/modernizr', src: ['modernizr.js'], dest: 'js/vendor' },
          { expand: true, cwd: './bower_components/angular', src: ['angular.js'], dest: 'js/vendor' }
        ]
      }
    },

    notify: {
      watch: {
        options: {
          message: 'I keep watching you ;-)'
        }
      },
      server: {
        options: {
          message: 'server is ready!'
        }
      },
      deploy: {
        options: {
          title: 'deployment',
          message: 'project deployed to gh-pages!'
        }
      }
    },

    notify_hooks: {
      options: {
        enabled: true,
        title: 'kickSTART'
      }
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    },

    concurrent: {
      dev: [
        'sass'
      ]
    }

  });

  // Default task
  grunt.registerTask('default', [
    'assemble',
    'copy'
  ]);

  grunt.registerTask('scss', [
    'sass',
    'copy:css'
  ]);
  grunt.registerTask('html', [
    'assemble'
  ]);
  grunt.registerTask('js', [
    'copy:js'
  ]);

  grunt.registerTask('dev', [
    'concurrent:dev',
    'connect',
    'open:server',
    'notify:server',
    'notify:watch',
    'watch'
  ]);
  grunt.registerTask('demo', [
    'copy:demo',
    'assemble:demo',
    'open'
  ]);
  grunt.registerTask('deploy', [
    'gh-pages',
    'notify:deploy'
  ]);

  grunt.registerTask('screenshot', [
    'localscreenshots'
  ]);

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-autoshot');
  grunt.loadNpmTasks('grunt-localscreenshots');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-devtools');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
