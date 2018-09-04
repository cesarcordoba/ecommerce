const _ = require('lodash');
const db = require('../relaciones');
var { categoria, producto } = db;

const jerarquia = require('../factories/jerarquia');

var ex = module.exports = {};

ex.create = (req, res, next) => categoria.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => categoria.findById(req.params.id)
    .then(categoria => categoria.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => categoria.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    categoria.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    categoria.findAll()
    .then(response => res.status(200).jsonp(response))

ex.nivel = (req, res, next) => {
	categoria.findAll({where : { nivel :req.params.nivel}})
    .then(response => res.status(200).jsonp(response))
}



ex.cambiarNivel = (req, res, next) => {


    // categoria.findById(req.params.hijo)
    // .then(response => console.log(response))

    var buscar = (array, id) =>  array.filter(n => n.IdCategoria === id).map(n => [  n.id, buscar(array, n.id) ])


    categoria.findAll()
    .then(response => res.status(200).jsonp(_.flattenDeep([ req.params.hijo , buscar(response, req.params.hijo) ])))




    // ;(async function(){
    //
    //     res.status(200).jsonp(await hijos(1))
    //
    // })()
    //
    // async function hijos(id){
    //
    //     console.log(id)
    //
    //     return new Object({
    //         id :  id,
    //         objetos : await categoria.findAll({ where : { IdCategoria : id }})
    //                 .then(response => response.map(async (n) => await hijos( n.id  ) )  ) })
    //
    // }


}

ex.subcategorias = (req, res, next) => categoria.findById(req.params.id)
    .then(response => response.getSubcategorias())
    .then(response => res.status(200).jsonp(response))

ex.filtro = (req, res, next) =>
    categoria.findAndCountAll({
		order : ['nombre']
	}).then(response =>
        res.status(200).jsonp(
            new Object({
                items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                paginas : Math.round(response.count / req.body.limite)
            })
        )
    )

ex.ligaratributo =  (req, res, next) =>
	categoria.findById(req.params.categoria)
	.then(modelo => modelo.addAtributos(req.params.atributo))
	.then(result => res.status(200).jsonp(result))


ex.desligaratributo =  (req, res, next) =>
	categoria.findById(req.params.categoria)
	.then(modelo => modelo.removeAtributos(req.params.atributo))
	.then(result => res.status(200).jsonp(result))

ex.atributos = (req, res, next) =>
	categoria.findById(req.params.id)
	.then(modelo => modelo.getAtributos())
	.then(result => res.status(200).jsonp(result))


ex.completo = (req, res, next) => {

    function detective(guia, hijo){
        let papa = guia.find(n => n.id === hijo.IdCategoria)
        return papa ? papa.nombre +  ' / ' + hijo.nombre : hijo.nombre
    }

    categoria.findAll()
    .then(response => response.map(n =>  Object.assign(n, { nombre : detective(response, n) })))
	.then(result => res.status(200).jsonp(result))

}

ex.ultimoproducto = (req, res, next) => {

    jerarquia().subniveles(req.params.id)
    .then(response => producto.findOne({ where : { IdCategoria:  response, status : 1}}))


	.then(result => res.status(200).jsonp(result))


}
