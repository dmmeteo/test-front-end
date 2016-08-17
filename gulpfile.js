'use strict';

var gulp          = require('gulp'),
    sass          = require('gulp-sass'), //компилятор sass
    inject        = require('gulp-inject'), //инекция css и js в index.html
    wiredep       = require('wiredep').stream, //инекция bower зависмостей в index.html
    changed       = require('gulp-changed'), //компиляция только изменного файла
    browserSync   = require('browser-sync').create, //автообновление страницы
    prefixer  	  = require('gulp-autoprefixer'), //автодобавление прификсов css
    imagemin 	    = require('gulp-imagemin'), //для сжатия изображений
    pngquant 	    = require('imagemin-pngquant'); //дополнение imagemin для файлов png

//Config
var config = require('./gulp.config')();

//Build styles
gulp.task('styles:build', function(){
  var target = gulp.src(config.path.src.styles);
  var sassOptions = {
    outputStyle: 'expanded' //настройка для красивого css
  };
  var prefixerOptions = {
    browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'], //настройки для автопрефиксера
    cascade: false
  };

  return target //директория исходники
    .pipe(sass(sassOptions)) //компилятор sass
    .pipe(prefixer(prefixerOptions)) //добавление префиксов
    .pipe(gulp.dest(config.path.tmp.styles)) //директория для результат
    .pipe(browserSync.reload({stream: true})); //перезагрузка страницы
});

//Build scripts
gulp.task('scripts:build', function(){
  var target = gulp.src(config.path.src.scripts);

  return target //директория исходники
    .pipe(gulp.dest(config.path.tmp.scripts)) //директория для результат
    .pipe(browserSync.reload({stream: true})); //перезагрузка страницы
});

//Build images
gulp.task('image:build', function () {
  var target = gulp.src(config.path.src.img);
  var imageminOptions = {
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()],
    interlaced: true
  };

  return target
    .pipe(imagemin(imageminOptions))
    .pipe(gulp.dest(config.path.tmp.img))
    .pipe(browserSync.reload({stream: true}));
});

//Inject
gulp.task('inject', ['scripts:build', 'styles:build'], function(){
  var target  = gulp.src(config.path.src.html), //находим индекс или что-то другое .html
    sources = gulp.src([ //подключение стилей и скриптов
      config.path.tmp.styles+'*.css',
      config.path.tmp.scripts+'*.js'
    ], {
      read: false
    });
  var options = {
    ignorePath: [
      config.path.clean.dest,
      config.path.clean.tmp
    ],
    addRootSlash: false
  };

  return target
    .pipe(inject(sources, options)) //инжектим компоненты js и css
    .pipe(wiredep(config.wiredep)) //инжектим компоненты bower через wiredep
    .pipe(gulp.dest(config.path.tmp.html)); //выносим готовые скрипты в папку с верменными файлами
});

//Server
gulp.task('webserver', ['inject', 'image:build'], function () {
  browserSync(config.server);
});


//Watch надо доделать совсем немного
gulp.task('watch', ['webserver'], function(){
  gulp.watch(SRC+styles+'**/*.sass', ['sass']); //следим за изменениями в sass
  gulp.watch(SRC+scripts+'**/*.js', browserSync.reload); //следим за изменениями в js
  gulp.watch(SRC+'**/*.html', browserSync.reload); //следим за изменениями index.html
});

gulp.task('bower', function(){
  gulp.src(SRC+'**/*.html')
    .pipe(wiredep({
      directory : 'bower_components'
    }))
    .pipe(gulp.dest(DEST))
});
