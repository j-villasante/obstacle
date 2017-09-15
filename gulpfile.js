// Dev build dependencies
const demon = require('nodemon');
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()
const sourcemaps = require('gulp-sourcemaps');

// Prod build dependencies
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const gulp = require('gulp')
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const runSequence = require('run-sequence');
const gulpif = require('gulp-if');
const lazypipe = require('lazypipe');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

let prod = false;

gulp.task('default', () => runSequence('build', ['nodemon', 'browser-sync', 'watch']))

gulp.task('nodemon', () => {
	nodemon({
		script: 'built/main.js',
		ignore: ['./static/'],
		ext: 'njk js',
		env: {
			NODE_ENV: 'development'
		},
		execMap: {
			js: 'node --inspect'
		}
	})
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
		reloadDelay: 500,
		ui: {
			port: 3002
		},
		open: false
	})
})

gulp.task('reload', () => demon.emit('restart'))

gulp.task('watch', () => {
    gulp.watch('./static/src/**/*.js', () =>  runSequence('bundle', 'reload'))
    gulp.watch('./static/css/**/*.css', () =>  runSequence('css', 'reload'))
    gulp.watch('./src/**/*.ts', () =>  runSequence('ts', 'reload'))
})

gulp.task('ts', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('./built'));
})

gulp.task('bundle', () => {
    let b = browserify({
        entries: './static/src/app.js',
        debug: !prod
    });

    let devPipe = lazypipe()
        .pipe(sourcemaps.init, {loadMaps: true})
        .pipe(sourcemaps.write, './')
    
    let prodPipe = lazypipe()
        .pipe(babel, { presets: ['es2015'] })
        .pipe(uglify)

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulpif(prod, prodPipe(), devPipe()))
        .pipe(gulp.dest('./static/dist/js/'));
})

gulp.task('css', () => {
    return gulp.src('./static/css/*.css')
        .pipe(gulpif(!prod, sourcemaps.init()))
        .pipe(cleanCSS())
        .pipe(gulpif(!prod, sourcemaps.write('./')))
        .pipe(gulp.dest('./static/dist/css/'))
})

gulp.task('set-prod', () => prod = true)

gulp.task('build', ['ts', 'bundle', 'css'])

gulp.task('prod', () => runSequence('set-prod', 'build'))
