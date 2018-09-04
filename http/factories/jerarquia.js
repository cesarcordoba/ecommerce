const _ = require('lodash');
const db = require('../relaciones');
var { categoria } = db;

var items = categoria.findAll().then(response => response.map(n => n.get({plan : true})))

module.exports = () => {

    var buscar = (array, id) => array.filter(n => n.IdCategoria === id).map(n => [  n.id, buscar(array, n.id) ])

    return {
        subniveles : (id) => new Promise((resolve) => {
            items.then(response => {
                resolve(  _.flattenDeep([ Number(id) , buscar(response, Number(id)) ])   )
            })
        })
    }
}
