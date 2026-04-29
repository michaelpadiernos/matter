/**
 * @file
 * Script for hero carousel.
 */

(function (Drupal, once) {
  Drupal.behaviors.heroCarousel = {
    attach: function (context, settings) {

      once('heroCarouselInit', '.view-intro .view-content', context).forEach(function (el) {

        var hero_carousel = tns({
          container: el,
          items: 1,
          slideBy: 'page',
          autoplay: true,
          controls: true,
          nav: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          autoplayButtonOutput: false,
          controlsText: ['<', '>'],
          responsive: {
            0: {
              controls: false,
              autoplay: false,
              mouseDrag: true,
            },
            1400: {
              controls: true,
              autoplay: true,
              mouseDrag: false,
            }
          }
        });

      });

    }
  };
})(Drupal, once);
