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
            },
            compile_app: {
                src: ['./example/app.ts', './example/application/**/*.ts'],
                dest: './build/app.js',
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
            },
            import_framework: {
                files: {
                    'build/app.js': {
                        prepend: "var OX = require('./OX.js');\n\n"
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

    grunt.registerTask(
        'build_app',
        'Compiling application and importing framework',
        ['typescript:compile_app', 'file_append:import_framework']
    );

    // latter we will register build_test task
    grunt.registerTask('default', ['build_framework']);
}
