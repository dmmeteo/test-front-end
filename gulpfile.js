'use strict';

var gulp         = require('gulp'),
		del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
		sass         = require('gulp-sass'), //компилятор sass
		inject       = require('gulp-inject'), //инекция css и js в index.html
		wiredep      = require('wiredep').stream, //инекция bower зависмостей в index.html
		useref  		 = require('gulp-useref'), //сборщик проэкта на продакшн
		gulpif 			 = require('gulp-if'), //фильтрация файлойв подключенных в index.html
		uglify 			 = require('gulp-uglify'), // минификация js
		minifyCss 	 = require('gulp-minify-css'), // минификация css
		changed      = require('gulp-changed'), //компиляция только изменного файла
		browserSync  = require('browser-sync').create(), //автообновление страницы
		prefixer  	 = require('gulp-autoprefixer'), //автодобавление прификсов css
		imagemin 	   = require('gulp-imagemin'), //для сжатия изображений
		pngquant 	   = require('imagemin-pngquant'); //дополнение imagemin для файлов png

//Config
var config = require('./gulp.config')(); //добавить модуль с конфигурациями

//Claer
gulp.task('clear:tmp', function(){
	return del.sync(config.path.TMP); //чистит директорию .tmp/
});
gulp.task('clear:dist', function(){
	return del.sync(config.path.DEST); //чистит директорию dist/
})

//Build html
gulp.task('html:build', function(){
	var target = gulp.src(config.path.SRC+'app/**/*.html');

	return target //директория исходники
		.pipe(gulp.dest(config.path.TMP+'templates/')) //директория для результат
		.pipe(browserSync.stream()); //перезагрузка страницы
});

//Build styles
gulp.task('styles:build', function(){
	var target = gulp.src(config.path.SRC+'app/**/*.sass');
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
	var target = gulp.src(config.path.SRC+'app/**/*.js');

	return target //директория исходники
		.pipe(gulp.dest(config.path.TMP+'scripts/')) //директория для результат
		.pipe(browserSync.stream()); //перезагрузка страницы
});

//Build json
gulp.task('json:build', function(){
	var target = gulp.src(config.path.SRC+'app/**/*.json');

	return target //директория исходники
		.pipe(gulp.dest(config.path.TMP)) //директория для результат
		.pipe(browserSync.stream()); //перезагрузка страницы
});

//Build images
gulp.task('image:build', function () {
	var target = gulp.src(config.path.SRC+'assets/img/**/*.*');
	var imageminOptions = {
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()],
		interlaced: true
	};

	return target //директория исходники
		.pipe(imagemin(imageminOptions)) //сжатие картинок
		.pipe(gulp.dest(config.path.TMP+'assets/img/')) //директория для результат
		.pipe(browserSync.stream()); //перезагрузка страницы
});

//Inject
gulp.task('inject', ['html:build', 'scripts:build', 'styles:build', 'image:build', 'json:build'], function(){
	var target  = gulp.src(config.path.SRC+'index.html'); //находим индекс или что-то другое .html
	var sources = gulp.src([ //подключение стилей и скриптов
			config.path.TMP+'styles/**/*.css',
			config.path.TMP+'scripts/**/*.module.js',
			config.path.TMP+'scripts/**/*.js'
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

// Watch
gulp.task('watch', ['inject'], function () {
	var bowerWatcher   = gulp.watch('bower.json'),
			htmlWatcher    = gulp.watch(config.path.SRC+'**/*.html'),
			scriptsWatcher = gulp.watch(config.path.SRC+'app/**/*.js'),
			stylesWatcher  = gulp.watch(config.path.SRC+'app/**/*.sass');

	bowerWatcher.on('change', function () {
		gulp.start('inject');
	});

	htmlWatcher.on('change', function () {
		gulp.start('inject');
	});

	scriptsWatcher.on('change', function (event) {
		if (isOnlyChange(event)) {
			gulp.start('scripts:build');
		} else {
			gulp.start('inject');
		}
	});

	stylesWatcher.on('change', function (event) {
		if (isOnlyChange(event)) {
			gulp.start('styles:build');
		} else {
			gulp.start('inject');
		}
	});
});

// Change controller
function isOnlyChange(event) {
	return event.type === 'changed';
}

//Build in dist
gulp.task('build', ['clear:dist', 'inject'], function () { //Собираем проэкт в dist
		var target = gulp.src([ //подключение html, img, json
			config.path.TMP+'**/*.html',
			config.path.TMP+'**/*.png',
			config.path.TMP+'**/*.json'
		]);
		return target
			.pipe(useref())
			.pipe(gulpif('*.js', uglify())) //находит js и сожимает в main и vendor
			.pipe(gulpif('*.css', minifyCss()))  //находит css и сожимает в main и vendor
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
	//tunnel: true, //добавить тонель
	notify: false //выкл уведомление
	});
};

// Default
gulp.task('default', function () { //дефолт запускает билд проэкта без сервера
	gulp.start('build');
});