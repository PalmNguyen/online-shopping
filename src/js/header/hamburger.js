export function initHeaderEvents() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = urlParams.get("page") || "home";
  const currentSearch = urlParams.get("search") || "";

  // 1. XỬ LÝ HAMBURGER MENU (Chạy tốt trên cả Home Header và Sub Header)
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.onclick = function (e) {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    };
    mobileMenu.onclick = function (e) {
      e.stopPropagation();
    };
  }

  // 2. XỬ LÝ TÌM KIẾM (Chỉ chạy nếu có ô Search - ở Sub Header)
  const searchBtn = document.getElementById("search-btn");
  const searchBox = document.getElementById("search-box");

  if (searchBtn && searchBox) {
    const input = searchBox.querySelector("input");

    if (input && currentSearch) {
      input.value = currentSearch;
    }

    searchBtn.onclick = function (e) {
      e.stopPropagation();
      searchBox.classList.toggle("hidden");

      if (!searchBox.classList.contains("hidden") && input) {
        input.focus();
      }
    };

    searchBox.onclick = function (e) {
      e.stopPropagation();
    };

    const searchForm = searchBox.tagName === "FORM" ? searchBox : searchBox.querySelector("form");
    const handleSearchSubmit = function (e) {
      e.preventDefault();
      const keyword = input ? input.value.trim() : "";

      if (keyword) {
        searchBox.classList.add("hidden");
        window.history.pushState({}, "", `?page=shop&search=${encodeURIComponent(keyword)}`);
        
        if (typeof window.renderPage === "function") {
          window.renderPage();
        }
      } else {
        alert("Vui lòng nhập từ khóa cần tìm!");
      }
    };

    if (searchForm) {
      searchForm.onsubmit = handleSearchSubmit;
    } else {
      searchBox.onsubmit = handleSearchSubmit;
    }
  }

  // 3. XỬ LÝ DROPDOWN PAGES (Chỉ chạy nếu có ở Sub Header)
  const pagesBtn = document.getElementById("desktop-pages-btn");
  const pagesDropdown = document.getElementById("desktop-pages-dropdown");

  if (pagesBtn && pagesDropdown) {
    pagesBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      pagesDropdown.classList.toggle("hidden");
    };
  }

  // 4. CLICK RA NGOÀI ĐỂ ĐÓNG TẤT CẢ POPUP / MENU MOBILE
  document.addEventListener("click", function () {
    if (searchBox && !searchBox.classList.contains("hidden")) {
      searchBox.classList.add("hidden");
    }
    if (pagesDropdown && !pagesDropdown.classList.contains("hidden")) {
      pagesDropdown.classList.add("hidden");
    }
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });

  // 5. TỰ ĐỘNG ACTIVE GẠCH CHÂN LINK TRANG HIỆN TẠI (Chạy cho cả 2 Header)
  const navLinks = document.querySelectorAll("nav ul a");
  navLinks.forEach((link) => {
    link.classList.remove("border-b", "border-black", "pb-1");

    if (link.getAttribute("href") === `?page=${currentPage}`) {
      link.classList.add("border-b", "border-black", "pb-1");
    }
  });
}