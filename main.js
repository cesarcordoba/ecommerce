var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');

var con = require('./http/conexion');
var con2 = require('./http2/conexion');

var lessMiddleware = require('less-middleware')

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(flash());

app.use(session({secret: '01f4845/564564/6@@fas588--[[}++', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }});

app.use('/', require('./http/rutas'));
app.use('/', require('./http/rutas/Productos'));
app.use('/', require('./http/rutas/Gamas'));
app.use('/', require('./http/rutas/Lineas'));
app.use('/', require('./http/rutas/Categorias'));
app.use('/', require('./http/rutas/Opciones'));
app.use('/', require('./http/rutas/Atributos'));
app.use('/', require('./http/rutas/Tipos'));
app.use('/', require('./http/rutas/Marcas'));
app.use('/', require('./http/rutas/Ambientes'));
app.use('/', require('./http/rutas/Posiciones'));
app.use('/', require('./http/rutas/Sucursales'));
app.use('/', require('./http/rutas/Fotos'));
app.use('/', require('./http/rutas/Promociones'));
app.use('/', require('./http/rutas/Imagenes'));
app.use('/', require('./http/rutas/Portadas'));
app.use('/', require('./http/rutas/Precios'));
app.use('/', require('./http/rutas/Descuentos'));
app.use('/', require('./http/rutas/Favoritos'));
app.use('/', require('./http/rutas/Tarjetas'));
app.use('/', require('./http/rutas/Usuarios'));
app.use('/', require('./http/rutas/Avatares'));
app.use('/', require('./http/rutas/Direcciones'));
app.use('/', require('./http/rutas/Transacciones'));
app.use('/', require('./http/rutas/Ordenes'));
app.use('/', require('./http/rutas/Status'));
app.use('/', require('./http/rutas/Facturas'));
app.use('/', require('./http/rutas/Paquetes'));
app.use('/', require('./http/rutas/Existencias'));
app.use('/', require('./http/rutas/Inventarios'));
app.use('/', require('./http/rutas/Versiones'));
app.use('/', require('./http/rutas/Observaciones'));
app.use('/', require('./http/rutas/Colores'));
app.use('/', require('./http/rutas/Espacios'));
app.use('/', require('./http/rutas/Cuartos'));
app.use('/', require('./http/rutas/Ofertas'));

app.use('/', require('./http/rutas/Entrantes'));
app.use('/', require('./http/rutas/Salientes'));

app.use('/', require('./http/rutas/Calendarizados'));

app.use('/', require('./http2/rutas/Firebird'));
app.use('/', require('./http2/rutas/Bases'));
app.use('/', require('./http2/rutas/Tablas'));
app.use('/', require('./http2/rutas/Rows'));
app.use('/', require('./http2/rutas/Rutinarios')); 
app.use('/', require('./http2/rutas/Mudanza'));

app.use(lessMiddleware(__dirname + '/assets'));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'http')));

module.exports = app;
