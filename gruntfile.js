module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        stylus: {
            compile: {
                files: {
                    'public/css/style.css': ['public/stylus/all.styl']
                }
            }
        },
        watch: {
            scripts: {
                files: ['public/stylus/*.styl'],
                tasks: ['stylus']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['stylus', 'watch']);
}