// src/js/header/sub.js

export function initHeaderEvents() {
  const searchBtn = document.getElementById("search-btn");
  const searchBox = document.getElementById("search-box");
  const pagesBtn = document.getElementById("desktop-pages-btn");
  const pagesDropdown = document.getElementById("desktop-pages-dropdown");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = urlParams.get("page") || "home";
  const currentSearch = urlParams.get("search") || "";

  // 1. Xử lý mở/đóng và submit ô Tìm kiếm
  if (searchBtn && searchBox) {
    const input = searchBox.querySelector("input");

    // Tự động điền lại từ khóa tìm kiếm cũ vào ô input nếu có trên URL
    if (input && currentSearch) {
      input.value = currentSearch;
    }

    searchBtn.onclick = function (e) {
      e.stopPropagation();
      searchBox.classList.toggle("hidden");

      if (!searchBox.classList.contains("hidden")) {
        if (input) input.focus();
      }
    };

    searchBox.onclick = function (e) {
      e.stopPropagation();
    };

    // BẮT SỰ KIỆN KHI NGƯỜI DÙNG BẤM TÌM KIẾM
    const searchForm = searchBox.tagName === "FORM" ? searchBox : searchBox.querySelector("form");
    const handleSearchSubmit = function (e) {
      e.preventDefault();
      const keyword = input ? input.value.trim() : "";

      if (keyword) {
        // Tự động đóng khung tìm kiếm sau khi submit
        searchBox.classList.add("hidden");

        // Chuyển hướng sang trang Shop cùng từ khóa tìm kiếm trên URL
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

  // 2. Xử lý Dropdown Pages
  if (pagesBtn && pagesDropdown) {
    pagesBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      pagesDropdown.classList.toggle("hidden");
    };
  }

  // 3. Xử lý Mobile Menu
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.onclick = function (e) {
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");
    };
    mobileMenu.onclick = function (e) {
      e.stopPropagation();
    };
  }

  // 4. Click ra ngoài đóng tất cả popup
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

  // 5. TỰ ĐỘNG GẠCH CHÂN TRANG ĐANG ĐỨNG (ACTIVE LINK)
  const navLinks = document.querySelectorAll("nav ul a");

  navLinks.forEach((link) => {
    link.classList.remove("border-b", "border-black", "pb-1");

    if (link.getAttribute("href") === `?page=${currentPage}`) {
      link.classList.add("border-b", "border-black", "pb-1");
    }
  });
}