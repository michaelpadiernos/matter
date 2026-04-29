/**
 * @file
 * Support for navbar-collapse with navbar icon-menu.
 */

((Drupal, once) => {
  Drupal.behaviors.navbarCollapse = {
    attach(context) {
      once('navbarCollapse', '.icon-menu', context).forEach(iconMenu => {
        iconMenu.addEventListener('click', () => {
          document.body.classList.toggle('menu-open');
        });
      });
    }
  };
})(Drupal, once);
