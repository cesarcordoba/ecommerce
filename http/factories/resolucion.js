const _ = require('lodash');
var Jimp = require("jimp");


module.exports = () => {

    return {
        procesar : (imagen) => new Promise(resolve => {
            Jimp.read(Buffer.from(_.split(imagen.imagen, ',', 2)[1], 'base64'))
            .then(image => {
                image.resize(200, 200).background(0xFFFFFFFF).getBase64("image/jpeg", (err, Buff) => {
                    resolve( Object.assign(  imagen, {imagen : Buff } ))
                })
            })
        })
        .catch(err => {})

    }

}
