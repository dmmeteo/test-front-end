'use strict';

var gulp          	= require('gulp'),
	del         	= require('del'), // Подключаем библиотеку для удаления файлов и папок
    sass          	= require('gulp-sass'), //компилятор sass
    inject        	= require('gulp-inject'), //инекция css и js в index.html
    wiredep       	= require('wiredep').stream, //инекция bower зависмостей в index.html
    useref  		= require('gulp-useref'), //сборщик проэкта на продакшн
    gulpif 			= require('gulp-if'), //фильтрация файлой подключенных в index.html
    uglify 			= require('gulp-uglify'), // минификация js
    minifyCss 		= require('gulp-minify-css'), // минификация css
    changed       	= require('gulp-changed'), //компиляция только изменного файла
    browserSync   	= require('browser-sync').create(), //автообновление страницы
    prefixer  	  	= require('gulp-autoprefixer'), //автодобавление прификсов css
    imagemin 	    = require('gulp-imagemin'), //для сжатия изображений
    pngquant 	    = require('imagemin-pngquant'); //дополнение imagemin для файлов png

//Config
var config = require('./gulp.config')(); //добавить модуль с конфигурациями

//Claer
gulp.task('clear:tmp', function(){
	return del.sync(config.path.TMP); //чистит директорию .tmp/
});
gulp.task('clear:dist', function(){
	return del.sync(config.path.DEST); //чистит директорию dist/
})

//Build styles
gulp.task('styles:build', function(){
  var target = gulp.src(config.path.SRC+'styles/**/*.sass');
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
    .pipe(gulp.dest(config.path.TMP+'styles/')) //директория для результат
    .pipe(browserSync.stream()); //перезагрузка страницы
});

//Build scripts
gulp.task('scripts:build', function(){
  var target = gulp.src(config.path.SRC+'scripts/**/*.js');

  return target //директория исходники
    .pipe(gulp.dest(config.path.TMP+'scripts/')) //директория для результат
    .pipe(browserSync.stream()); //перезагрузка страницы
});

//Build images
gulp.task('image:build', function () {
  var target = gulp.src(config.path.SRC+'img/**/*.*');
  var imageminOptions = {
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()],
    interlaced: true
  };

  return target //директория исходники
    .pipe(imagemin(imageminOptions)) //сжатие картинок
    .pipe(gulp.dest(config.path.TMP+'img/')) //директория для результат
    .pipe(browserSync.stream()); //перезагрузка страницы
});

//Inject
gulp.task('inject', ['clear:tmp', 'scripts:build', 'styles:build', 'image:build'], function(){
  var target  = gulp.src(config.path.SRC+'**/*.html'), //находим индекс или что-то другое .html
    sources = gulp.src([ //подключение стилей и скриптов
      config.path.TMP+'styles/*.css',
      config.path.TMP+'scripts/*.js'
    ], {
      read: false
    });
  var options = {
    ignorePath: [
      config.path.DEST,
      config.path.TMP
    ],
    addRootSlash: false
  };

  return target
    .pipe(inject(sources, options)) //инжектим компоненты js и css
    .pipe(wiredep(config.wiredep)) //инжектим компоненты bower через wiredep
    .pipe(gulp.dest(config.path.TMP)); //выносим готовые скрипты в папку с верменными файлами
});

//Watch надо доделать совсем немного
gulp.task('watch', ['inject'], function(){
  gulp.watch(config.path.SRC+'styles/**/*.sass', ['styles:build']); //следим за изменениями в sass
  gulp.watch(config.path.SRC+'scripts/**/*.js', browserSync.stream()); //следим за изменениями в js
  gulp.watch(config.path.SRC+'**/*.html', browserSync.stream()); //следим за изменениями index.html
});

//Build in dist
gulp.task('build', ['clear:dist', 'inject'], function () { //Собираем проэкт в dist
    return gulp.src(config.path.TMP+'*.html')
    	.pipe(useref())
        .pipe(gulpif('*.js', uglify())) //находит js и сожимает в main и vendor
        .pipe(gulpif('*.css', minifyCss())) //находит css и сожимает в main и vendor
        .pipe(gulp.dest(config.path.DEST));
});

//Server
gulp.task('serve', ['watch'], function () { //запускает билд и сервер из .tmp/
  browserSyncInit([
    config.path.TMP,
    config.path.SRC
  ]);
});

gulp.task('serve:dist', ['build'], function () { //запускает билд и сервер из dist/
  browserSyncInit(config.path.DEST);
});

function browserSyncInit(baseDir) { //инициализация сервера
  var routes = null; 
  if (Array.isArray(baseDir)) { //если получает массив добавляет значение зависимости
    routes = {
      '/bower_components': 'bower_components' //компонетны бовера
    };
  }
  browserSync.init({
    startPath: '/',
    server: {
      baseDir: baseDir,
      routes: routes
    },
	host: 'localhost',
	port: 3000,
	tunnel: true, //добавить тонель
	notify: false //выкл уведомление
  });
};

// Default
gulp.task('default', function () { //дефолт запускает билд проэкта без сервера
  gulp.start('build');
});