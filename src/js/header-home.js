export function initHeader() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (menuBtn && mobileMenu) {
    // Click nút Hamburger để ẩn/hiện menu
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
      menuIcon.innerText = mobileMenu.classList.contains('hidden') ? '☰' : '✕';
    });

    // Click ra ngoài khoảng trống tự động đóng menu
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuIcon.innerText = '☰';
      }
    });
  }
}