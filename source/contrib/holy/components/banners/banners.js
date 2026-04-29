/**
 * @file
 * Script for banners.
 */

(function (Drupal, once) {
  Drupal.behaviors.banners = {
    attach: function (context, settings) {

      once('bannersInit', '.block-views-blockbanners-block-2 .view-banners .view-content', context).forEach(function (el) {

        var banners = tns({
          container: '.block-views-blockbanners-block-2 .view-banners .view-content',
          items: 5,
          controls: false,
          nav: false,
          autoplayTimeout: 5000,
          autoplay:true,
          autoplayButtonOutput: false,
          mouseDrag: true,
          gutter: 50,
          responsive:{
            0:{
              items: 1,
            },
            800:{
              items: 2,
            },
            1000:{
              items: 3,
            },
            1200:{
              items: 4,
            },
            1400:{
              items: 5,
            }
          }
        });

      });

    }
  };
})(Drupal, once);
