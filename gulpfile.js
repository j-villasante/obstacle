const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');

gulp.task('default', ['nodemon', 'browser-sync'])

gulp.task('nodemon', ['bundle'], () => {
	let demon = nodemon({
		script: 'main.js',
		ignore: ['./static/dist/'],
		ext: 'njk js css',
        tasks: ['bundle'],
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

gulp.task('bundle', () => {
    let b = browserify({
        entries: './static/src/app.js',
        debug: true
    });

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        // .pipe(babel({
        //     presets: ['es2015']
        // }))  
        // .pipe(uglify())
        // .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./static/dist/js/'));
})

gulp.task('css', () => {
    return gulp.src('./static/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./static/dist/css/'));
})
