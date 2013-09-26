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
          debounceDelay: 500
        },
        files: [
          'dist/**/*.html',
          'dist/assets/css/{,*/}*.css',
          'dist/assets/js/{,*/}*.js'
        ]
      }
    },

    // GRUNT-SASS
    // sass: {
    //   build: {
    //     files : [
    //       {
    //         src : ['**/*.scss', '!**/_*.scss'],
    //         cwd : 'scss',
    //         dest : 'css',
    //         ext : '.css',
    //         expand : true
    //       }
    //     ],
    //     options : {
    //       style : 'expanded'
    //     }
    //   }
    // },

    // GRUNT-CONTRIB-SASS
    // sass: {
    //   dist: {
    //     options: {
    //       // sourcemap: true,
    //       style: 'expanded'
    //     },

    //     files: {
    //       'main.css': 'main.scss'
    //     }
        // files: [
        //   {
        //     expand: true,
        //     cwd: 'scss',
        //     dest: 'css',
        //     ext: '.css',
        //     src: ['**/*.scss', '!**/_*.scss']
        //   }
        // ]
      // }
    // },

    // compass: {
    //   dist: {
    //     options: {
    //       sassDir: 'scss',
    //       cssDir: 'css'
    //     }
    //   }
    // },

    autoshot: {
      default_options: {
        options: {
          // necessary config
          path: 'screenshots/',
          filename: '',
          type: 'png',
          // optional config, must set either remote or local
          remote: 'http://localhost:<%= connect.options.port &>',
          viewport: [
            '800x600',
            '1024x768',
            '1920x1080'
          ]
        },
      },
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
      dev: {
        path: 'http://localhost:8000'
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
          { expand: true, cwd: './bower_components/modernizr', src: ['modernizr.js'], dest: 'js/vendor' }
        ]
      }
    },

    notify: {
      watch: {
        options: {
          title: 'watch complete!',
          message: 'I keep watching you ;-)'
        }
      },
      server: {
        options: {
          message: 'server is ready!'
        }
      }
    },

    notify_hooks: {
      options: {
        enabled: true
      }
    }

  });

  // Default task
  grunt.registerTask('default', [
    'assemble',
    'copy'
    ]);

  grunt.registerTask('scss', [
    // 'sass',
    'copy:css'
    ]);
  grunt.registerTask('html', [
    'assemble'
    ]);
  grunt.registerTask('js', [
    'copy:js'
    ]);

  grunt.registerTask('dev', [
    'connect',
    'watch',
    'open:dev',
    'notify'
    ]);
  grunt.registerTask('demo', [
    'copy:demo',
    'assemble:demo',
    'open'
    ]);
  grunt.registerTask('deploy', ['gh-pages']);

  grunt.registerTask('screenshots', [
    'autoshot:default_options'
    ]);

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-devtools');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
