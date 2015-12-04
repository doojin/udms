module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                options: { sourcemap: 'none' },
                files: { 'src/public/css/app.css' : 'scss/app.scss' }
            }
        },
        copy: {
            all: {
                files: [
                    {expand: false, src: 'bower_components/jquery/dist/jquery.min.js', dest: 'src/public/js/vendor/jquery.min.js'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['sass', 'copy']);
};
