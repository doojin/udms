module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                options: { sourcemap: 'none' },
                files: { 'src/public/css/app.css' : 'scss/app.scss' }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass']);
};
