/**
 * @file
 * Support for collapse menu item on mobile screen.
 */

((Drupal) => {
  Drupal.behaviors.mobileMenuCollapse = {
    attach: function (context) {

      // Add <span> to <li> elements that contain a nested <ul>
      document.querySelectorAll('#menu .block-menu ul > li').forEach(li => {
        if (li.querySelector('ul')) {
          const span = document.createElement('span');
          li.appendChild(span);
        }
      });

      // Mark active trail items as open
      document.querySelectorAll('#menu .block-menu li.active-trail > span').forEach(span => {
        const prev = span.previousElementSibling;
        if (prev) prev.classList.add('open');
        span.classList.add('open');
      });

      // Toggle submenu visibility when clicking the <span>
      document.querySelectorAll('#menu .block-menu ul > li > span').forEach(span => {
        span.addEventListener('click', () => {
          const prev = span.previousElementSibling;
          if (!prev) return;

          if (prev.style.display === 'none' || getComputedStyle(prev).display === 'none') {
            // Show submenu
            prev.style.display = 'block';
            prev.classList.add('open');
            span.classList.add('open');
          } else {
            // Hide submenu
            prev.style.display = 'none';
            prev.classList.remove('open');
            span.classList.remove('open');
          }
        });
      });

    }
  };
})(Drupal);
