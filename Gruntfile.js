module.exports = function (grunt) {
	grunt.initConfig({

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
				'watch'
			],
			options: {
				logConcurrentOutput: true
			}
		},
		nodemon: {
			dev: {
				script: './bin/www',
				options: {

					cwd: __dirname,
					ignore: ['node_modules/**'],
					ext: 'js,twig,css',
					watch: ['.'],
					delay: 1000,
					legacyWatch: true,
					callback: function (nodemon) {


						// refreshes browser when server reboots
						nodemon.on('restart', function () {
							// Delay before server listens on port
							setTimeout(function () {
								require('fs').writeFileSync('.rebooted', 'rebooted');
							}, 1000);
						});
					}
				},

			}
		},
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
		}
	});

	// load npm tasks
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-nodemon');


	// define default task
	grunt.registerTask('default', ['concurrent']);
};