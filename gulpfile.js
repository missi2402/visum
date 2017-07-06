var gulp       = require('gulp'), 
    sass         = require('gulp-sass'), 
    browserSync  = require('browser-sync'), 
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'), 
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'), 
    del          = require('del'), 
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'), 
    cache        = require('gulp-cache'), 
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)') 
        .pipe(sass()) 
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'src' // Директория для сервера - src
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('scripts', function() {
    return gulp.src([
        //'src/libs/jquery/dist/jquery.min.js', // Берем jQuery
        //'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('src/js')); // Выгружаем в папку src/js
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('src/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('src/css'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('src/sass/**/*.+(scss|sass)', ['sass']); 
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);   
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

    var buildCss = gulp.src([
        'src/css/main.css',
        'src/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('src/fonts/**/*') 
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('src/js/**/*') 
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);