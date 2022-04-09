const { src, dest, watch, parallel } = require('gulp'); // {} -> nos trae multiples funciones


// CSS
const sass = require('gulp-sass')(require('sass')); // caracterisitca de node.js
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); // nos mejora la compatibilidad entre navegadores
const cssnano = require('cssnano'); // comprime nuestro archivo css
const postcss = require('gulp-postcss'); // transformaciones por medio de las dos anteriores
const sourcemaps = require('gulp-sourcemaps');


//imagenes, hemos instalado : Npm i –save-dev gulp-webp
const cache = require('gulp-cache'); //Npm i save-dev gulp-cache
const imagemin = require('gulp-imagemin'); // Npm i save-dev gulp-imagemin@7.1.0
const webp = require('gulp-webp'); //Npm i –save-dev gulp-webp
const avif = require('gulp-avif');//Npm i save-dev gulp-avif

// Javascript
const terser = require('gulp-terser-js'); // comprimirá nuestro archivo js



function css(done){
    // console.log('compilando SASS...');
    // src('src/scss/app.scss')//1º Identificar el archivo .SCSS a compilar

    src('src/scss/**/*.scss')//1º Identificar el archivo .SCSS a compilar, con los ** hacemos que recompile tras detectar cualquier cambio realizado dentro de cualquier archivo dentro del directorio scss
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe( sass())// 2º Compilarlo
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css'))//3º Almacenarla en el disco duro
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3 //
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}
function versionAvif( done ) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function versionWebp( done ) {
    const opciones = {
        quality: 50 // la calidad va de  0 a 100, de menos a mas calidad
    };
    src('src/img/**/*.{png,jpg}') //busca las imagenes con dos formatos
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}

// .pipe(sourcemaps.init())
//     .pipe( terser() )
//     .pipe(sourcemaps.write('.'))

function javascript( done ) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev( done ) {
    watch( 'src/scss/**/*.scss', css ); // identifica archivo, y que tarea va a llamar
    watch('src/js/**/*.js', javascript);
    done();
}

// consola: gulp dev; función que lo mantiene en modo escucha

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes,versionWebp,versionAvif,javascript, dev); // con parallel, me ejecuta las dos tareas
