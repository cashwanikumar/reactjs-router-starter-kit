"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //run a local dev server
var open = require('gulp-open'); //open a url n a web browser
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

var config = {
    port: 8888,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        dist: './dist',
        mainJs: './src/main.js',
        images: './src/images/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'src/public/css/app.css'
        ]
    },
    compressPNG: false
}

gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        liverload: true
    });
});

gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/script'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('eslint', function() {
    return gulp.src(config.paths.js)
                .pipe(eslint({config: 'eslint.config.json'}))
                .pipe(eslint.format());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'eslint']);
});

gulp.task('images', function(){
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());
    
    gulp.src('./src/favicon.png')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('default', ['html', 'js', 'css', 'images', 'eslint', 'open', 'watch']);