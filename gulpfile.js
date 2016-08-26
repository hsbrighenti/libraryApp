var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];
var viewFiles = ['src/views/*.ejs'];

gulp.task('style', function(){
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function(){
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js', './lib/**/*.css', './lib/**/*.js'], {read: false});
    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {
        ignorePath: '../../public'
    };
    
    return gulp.src('./src/views/*.html')
                .pipe(wiredep(options))
                .pipe(inject(injectSrc, injectOptions))
                .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style'], function(){
    var options = {
        exec: 'node --debug',
        script: './app.js',
        delayTime: 3,
        env: {
            'PORT': 5000
        },
        watch: [
            jsFiles,
            viewFiles,
            './public/css/style.css'
        ]
    };

    return nodemon(options)
            .on('restart', ['style'], function(ev){
                console.log('Restarting......');
            });
});

gulp.task('build', ['style', 'inject']);
