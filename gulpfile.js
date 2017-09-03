const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()

gulp.task('default', ['nodemon', 'browser-sync'])

gulp.task('nodemon', () => {
	var demon = nodemon({
		script: 'main.js',
		ignore: [],
		ext: 'njk js css',
		env: {
			NODE_ENV: 'development'
		},
		execMap: {
			js: "node --inspect"
		}
	})

	demon
		.on('start', () => {
			browserSync.reload()
		})
		.on('crash', () => {
			console.error('Application has crashed!\n')
			demon.emit('restart', 10)
		})
})

gulp.task('browser-sync', () => {
	browserSync.init({
		proxy: 'localhost:3000',
		port: 3001,
		reloadDelay: 1500,
		ui: {
			port: 3002
		},
		open: false
	})
})
