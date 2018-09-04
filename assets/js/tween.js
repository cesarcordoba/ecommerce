// app.directive('texto', function() {
//
//     var scrollMagicController = new ScrollMagic.Controller();
//
//     $('.texto').each(function(){
//
//         console.log(this);
//
//         var elemento = this.children[0];
//
//         tl = new TimelineLite();
//
//         tl
//             .from(elemento, .05 , {autoAlpha: 0, ease:Power4.easeIn})
//             .set({}, {}, .2)
//             .to(elemento, .1 , {autoAlpha: 0, ease:Power4.easeOut});
//
//         var scene = new ScrollMagic.Scene({
//             triggerElement: elemento,
//             triggerHook: .5,
//             duration: '300px'/* How many pixels to scroll / animate */
//         })
//         .setTween(tl)
//         .setPin(elemento)
//         .addTo(scrollMagicController)
//         .addIndicators();
//
//     })
//
// });
