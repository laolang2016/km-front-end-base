module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true
            },
            distCore: {
                src: ['./assets/js/lib/core/km-core.js'],
                dest: './assets/js/lib/core/core.js'
            }

        },
        cssmin: {
            common: {
                files: [{
                    expand: true,
                    cwd: './assets/css/common',
                    src: ['*.css', '!*.min.css'],
                    dest: './assets/css/common',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            compressjs: {
                files: {
                    './assets/js/lib/core/core.min.js': ['./assets/js/lib/core/core.js']
                }
            }
        },
        jshint: {
            all: ['./assets/js/lib/core/core.js']
        },
        watch: {
            scripts: {
                files: ['./assets/js/lib/core/km-core.js'],
                tasks: ['concat','jshint','uglify']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('concatjs', ['concat']);
    grunt.registerTask('compressjs', ['concat', 'jshint', 'uglify']);
    grunt.registerTask('cssmincss', ['cssmin']);
    grunt.registerTask('watchit',['concat','jshint','uglify','watch']);
    grunt.registerTask('default', ['compressjs','cssmincss']);
    // grunt.registerTask('default');

};