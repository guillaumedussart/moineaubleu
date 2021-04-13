module.exports = function (grunt) {
	grunt.initConfig({
		watch: {
			compass: {
				files: ['public/scss/*.scss'],
				tasks: ['compass:dev']
			},
			server: {
				files: ['.rebooted'],
				options: {
					livereload: true
				}
			}
		},
		compass: {
			dev: {
				options: {
					config: 'config.rb',
					sassDir: 'public/scss'
				}
			}
		},
		concurrent: {
			dev: [
				'nodemon',
				'watch',
				'browserSync'
			],
			options: {
				logConcurrentOutput: true
			}
		},
		nodemon: {
			dev: {
				script: './bin/www',
				options: {
					args: ['dev'],
					nodeArgs: ['-r','dotenv/config'],
					callback: function (nodemon) {
						nodemon.on('log', function (event) {
							console.log(event.colour);
						});
					},
					env: {
						PORT: '8000'
					},
					cwd: __dirname,
					ignore: ['node_modules/**'],
					ext: 'js',
					watch: ['server'],
					delay: 1000,
					legacyWatch: true
				}
			},
			exec: {
				options: {
					exec: 'less'
				}
			}
		},
		browserSync: {
			bsFiles: {
				src : 'assets/css/*.css'
			},
			options: {
				server: {
					baseDir: "./bin"
				}
			}
		}
	});

	// load npm tasks
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-nodemon');


	// define default task
	grunt.registerTask('default', ['concurrent']);
};