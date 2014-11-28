module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks('grunt-typescript');

    grunt.initConfig({
        typescript: {
            compile_framework: {
                src: ['./src/**/*.ts'],
                dest: './build/OX.js',
                options: {
                    module: 'commonjs', //or commonjs
                    target: 'es5', //or es
                    basePath: './src',
                    sourceMap: false,
                    declaration: true,
                    comments: false,
                    references: [
                        "./libraries/*.d.ts"
                    ]
                }
            }
        },
        file_append: {
            export_framework: {
                files: {
                    'build/OX.js': {
                        append: "\nmodule.exports = OX;"
                    }
                }
            }
        }
    });


    // define the tasks
    grunt.registerTask(
        'build_framework',
        'Compiling framework and exporting',
        ['typescript:compile_framework', 'file_append:export_framework']
    );

    // latter we will register build_test task
    grunt.registerTask('default', ['build_framework']);
}
