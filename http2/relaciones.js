var conector = require('./conexion.js')

var base = require('./modelos/Bases')(conector);
var tabla = require('./modelos/Tablas')(conector);
var row = require('./modelos/Rows')(conector);


base.hasMany(tabla, { as : 'Tablas', foreignKey:'IdBase'});
tabla.belongsTo(base, { as : 'Bases', foreignKey:'IdBase'});

tabla.hasMany(row, { as : 'Rows', foreignKey:'IdTabla'});
row.belongsTo(tabla, { as : 'Tablas', foreignKey:'IdTabla'});

module.exports = {
    base,
    row,
    tabla
}
