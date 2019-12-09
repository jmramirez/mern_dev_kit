const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', () => {
    return gulp
        .src('client/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed'}).on('error',sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});



gulp.task('browser-sync', function() {
    browserSync.init({
        server: './public',
        notify: false,
        open: false //change this to true if you want the broser to open automatically
    });
});

gulp.task('browser-sync-proxy', function() {
    // THIS IS FOR SITUATIONS WHEN YOU HAVE ANOTHER SERVER RUNNING
    browserSync.init({
        proxy: {
            target: 'http://localhost:3000/', // can be [virtual host, sub-directory, localhost with port]
           // ws: true  enables websockets
        }
        // serveStatic: ['.', './public']
    });
});

function reload(done){
    browserSync.reload();
    done();
}

gulp.task('watch',function(){
    gulp.watch('./client/scss/**/*',gulp.series('styles'));
  //  gulp.watch('./assets/js/**/*', gulp.series('webpack'));
   gulp
        .watch([
            './dist/css/**/*',
            './dist/css/*',
           // './Views/Shared/*',
    //        '!public/js/**/.#*js',
           // '!public/css/**/.#*css'
        ],gulp.series(reload));
});

gulp.task('default', gulp.parallel(['styles','watch','browser-sync-proxy']));