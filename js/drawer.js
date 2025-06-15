// Mobile Drawer Menu - Uses existing hamburger menu on mobile (988px and below)
document.addEventListener('DOMContentLoaded', function () {

  function initDrawer() {
    // Only run on mobile/tablet screens (988px and below)
    if (window.innerWidth > 988) return;

    // Get elements - use hamburger instead of drawer-toggle
    const hamburger = document.querySelector('.hamburger');
    const drawer = document.querySelector('.drawer-menu');
    const closeBtn = document.querySelector('.drawer-close');
    const overlay = document.querySelector('.drawer-overlay');

    console.log('Hamburger found:', !!hamburger);
    console.log('Drawer found:', !!drawer);
    console.log('Close button found:', !!closeBtn);
    console.log('Overlay found:', !!overlay);

    // If drawer elements don't exist, don't initialize
    if (!hamburger || !drawer || !closeBtn || !overlay) {
      console.log('Some drawer elements not found in HTML');
      return;
    }

    function isDrawerOpen() {
      return drawer.classList.contains('open');
    }

    function openDrawer() {
      console.log('Opening drawer');
      drawer.classList.add('open');
      overlay.classList.add('show');
      hamburger.classList.add('active');

      // Prevent body scroll and add blur effect
      document.body.classList.add('drawer-open');
      document.body.style.overflow = 'hidden';

      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      // Store scroll position for restoration
      document.body.setAttribute('data-scroll-y', scrollY.toString());
    }

    function closeDrawer() {
      console.log('Closing drawer');
      drawer.classList.remove('open');
      overlay.classList.remove('show');
      hamburger.classList.remove('active');

      // Restore body scroll and remove blur effect
      document.body.classList.remove('drawer-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // Restore scroll position
      const scrollY = document.body.getAttribute('data-scroll-y');
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        document.body.removeAttribute('data-scroll-y');
      }
    }

    function toggleDrawer() {
      if (isDrawerOpen()) {
        closeDrawer();
      } else {
        openDrawer();
      }
    }

    // Add click event to hamburger
    hamburger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Hamburger clicked, drawer open:', isDrawerOpen());
      toggleDrawer();
    });

    // Add click event to close button
    closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      closeDrawer();
    });

    // Add click event to overlay
    overlay.addEventListener('click', function (e) {
      e.preventDefault();
      closeDrawer();
    });

    // Initialize Lucide icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isDrawerOpen()) {
        closeDrawer();
      }
    });

    console.log('Drawer initialized successfully');
  }

  // Initialize drawer
  initDrawer();

  // Re-initialize on window resize
  window.addEventListener('resize', function () {
    setTimeout(initDrawer, 100);
  });
});
