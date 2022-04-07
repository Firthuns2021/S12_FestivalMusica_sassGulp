const { src, dest, watch } = require('gulp'); // {} -> nos trae multiples funciones


// CSS
const sass = require('gulp-sass')(require('sass')); // caracterisitca de node.js
const plumber = require('gulp-plumber');

function css(done){
    // console.log('compilando SASS...');
    // src('src/scss/app.scss')//1º Identificar el archivo .SCSS a compilar
    src('src/scss/**/*.scss')//1º Identificar el archivo .SCSS a compilar, con los ** hacemos que recompile tras detectar cualquier cambio realizado dentro de cualquier archivo dentro del directorio scss
        .pipe(plumber())
        .pipe( sass())// 2º Compilarlo
        .pipe( dest('build/css'))//3º Almacenarla en el disco duro
    done();
}
function dev( done ) {
    watch( 'src/scss/**/*.scss', css ); // identifica archivo, y que tarea va a llamar
    done();
}



exports.css = css;
exports.dev = dev; // consola: gulp dev; función que lo mantiene en modo escucha
