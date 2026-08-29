// src/js/shop.js

export function initShopEvents() {
    // Lấy phần tử chính của trang Shop để kiểm tra
    const productListContainer = document.getElementById('product-list');

    // Nếu không ở trang Shop (không có danh sách sản phẩm) thì dừng lại luôn để tránh lỗi
    if (!productListContainer) return;

    // 1. DỮ LIỆU SẢN PHẨM
    const products = [
        {
            id: 1, name: "Rounded Red Hat", price: 8.00, image: "./assets/img/roundedredhat.png",
            colors: ["#FFD700", "#000000"], sizes: ["S", "M"], brand: "Fasco", collection: "Accessories", tags: ["Fashion", "Hats", "Sandal"]
        },
        {
            id: 2, name: "Linen-blend Shirt", price: 17.00, image: "./assets/img/lineblendshirt.png", isSoldOut: true,
            colors: ["#8DB4D2", "#FFD1DC"], sizes: ["M", "L", "XL"], brand: "Zara", collection: "Best sellers", tags: ["Belt", "Bags", "Snacker"]
        },
        {
            id: 3, name: "Long-sleeve Coat", price: 106.00, image: "./assets/img/longsleevecoat.png",
            colors: ["#EBE6DB", "#C1E1C1"], sizes: ["L", "XL", "XXL"], brand: "H&M", collection: "New arrivals", tags: ["Denim", "Minimog", "Vagabond"]
        },
        {
            id: 4, name: "Boxy Denim Hat", price: 25.00, image: "./assets/img/boxydenimhat.png",
            colors: ["#B1C5D4", "#063E66"], sizes: ["One Size"], brand: "Levi's", collection: "Best sellers", tags: ["Sunglasses", "Beachwear"]
        },
        {
            id: 5, name: "Linen Plain Top", price: 25.00, image: "./assets/img/lineplaintop.png",
            colors: ["#C1E1C1", "url('./assets/img/pattern-caro.png')"], sizes: ["S", "M", "L"], brand: "Zara", collection: "New arrivals", tags: ["Fashion", "Hats", "Sandal"]
        },
        {
            id: 6, name: "Oversized T-shirt", price: 11.00, originalPrice: 14.00, image: "./assets/img/oversizedtshirt.png",
            colors: ["#FFD1DC", "#C6AEC7", "#FFFFFF01"], sizes: ["M", "L", "XL"], brand: "Nike", collection: "Accessories", tags: ["Belt", "Bags", "Snacker"]
        },
        {
            id: 7, name: "Polarised Sunglasses", price: 18.00, originalPrice: 21.00, image: "./assets/img/polarisedsunglasses.png",
            colors: ["#000000", "#836953"], sizes: ["M", "L", "XL"], brand: "Ray-Ban", collection: "Best sellers", tags: ["Denim", "Minimog", "Vagabond"]
        },
        {
            id: 8, name: "Rockstar Jacket", price: 22.00, image: "./assets/img/rockstarjacket.png",
            colors: ["#C6AEC7", "#BEDCE3"], sizes: ["M", "L"], brand: "Levi's", collection: "New arrivals", tags: ["Sunglasses", "Beachwear"]
        },
        {
            id: 9, name: "Dotted Black Dress", price: 20.00, image: "./assets/img/dottedblackdress.png",
            colors: ["#063E66", "#000000", "#B1C5D4"], sizes: ["S", "M"], brand: "Fasco", collection: "Accessories", tags: ["Fashion", "Hats", "Sandal"]
        }
    ];

    // 2. STATE - LƯU TRẠNG THÁI TRANG
    const state = {
        filteredProducts: [...products],
        currentPage: 1,
        itemsPerPage: 6,
        currentViewCols: 3,
        filters: {
            brand: [],
            size: [],
            price: [],
            color: [],
            collection: [],
            tag: []
        }
    };

    // 3. CÁC HÀM XỬ LÝ (HELPER FUNCTIONS)
    function renderProducts(productList) {
        productListContainer.innerHTML = '';

        if (!productList || productList.length === 0) {
            productListContainer.innerHTML = `
                <div class="col-span-full py-10 text-center text-gray-500 font-jost">
                    Không tìm thấy sản phẩm nào phù hợp!
                </div>
            `;
            renderPagination(0);
            return;
        }

        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        const paginatedProducts = productList.slice(startIndex, endIndex);
        let html = '';

        paginatedProducts.forEach(product => {
            let priceHtml = '';
            if (product.originalPrice) {
                priceHtml = `
                    <div class="flex items-center gap-[8px]">
                        <span class="font-jost font-bold text-base leading-[19px] text-black">$${product.price.toFixed(2)}</span>
                        <del class="font-jost font-normal text-base leading-[19px] text-[#666666] line-through no-underline-offset">$${product.originalPrice.toFixed(2)}</del>
                    </div>
                `;
            } else {
                priceHtml = `<p class="font-jost font-normal text-base leading-[24px] text-black">$${product.price.toFixed(2)}</p>`;
            }

            let soldOutHtml = '';
            if (product.isSoldOut) {
                soldOutHtml = `
                    <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[54px] h-[54px] rounded-full bg-[#A1A1A1] flex flex-col items-center justify-center font-jost font-black text-[10px] leading-[12px] text-white text-center uppercase pointer-events-none">
                        <span>SOLD</span>
                        <span>OUT</span>
                    </span>
                `;
            }

            let colorsHtml = '';
            product.colors.forEach((color, index) => {
                let bgStyle = color.includes('url') ? `background-image: ${color}; background-position: center;` : `background-color: ${color};`;
                let activeClass = index === 0 
                    ? 'shadow-[inset_0_0_0_4px_#ffffff,0_0_0_1px_#000000]' 
                    : 'hover:scale-110 transition-transform';

                colorsHtml += `
                    <button type="button" class="w-[26px] h-[26px] rounded-full cursor-pointer ${activeClass}" style="${bgStyle}" aria-label="Color variation"></button>
                `;
            });

            html += `
                <li class="add-to-cart-btn px-[12px] flex flex-col items-start gap-5 w-full cursor-pointer hover:opacity-80 transition-opacity"
                    data-id="shop_prod_${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-color="${product.colors[0] || 'Default'}"
                    data-size="M"
                    data-image="${product.image}"
                >
                    <div class="relative w-full">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-auto object-cover rounded-[4px]" />
                        ${soldOutHtml}
                    </div>
                    <div class="flex flex-col gap-[13px] w-full">
                        <div class="flex flex-col gap-1">
                            <h3 class="font-volkhov font-normal text-base leading-[24px] text-black">${product.name}</h3>
                            ${priceHtml}
                        </div>
                        <div class="flex flex-row items-center gap-[10px]">
                            ${colorsHtml}
                        </div>
                    </div>
                </li>
            `;
        });

        productListContainer.innerHTML = html;
        renderPagination(productList.length);
    }

    function setupViewStyle() {
        const viewButtons = document.querySelectorAll('.view-btn');
        if (!viewButtons.length) return;

        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const cols = btn.getAttribute('data-cols');
                productListContainer.classList.remove('lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4', 'lg:grid-cols-5');
                productListContainer.classList.add(`lg:grid-cols-${cols}`);

                viewButtons.forEach(b => {
                    b.classList.remove('bg-black');
                    b.classList.add('bg-[#F2F2F2]');
                    const img = b.querySelector('img');
                    if(img) img.classList.remove('brightness-0', 'invert');
                });

                btn.classList.remove('bg-[#F2F2F2]');
                btn.classList.add('bg-black');
                const img = btn.querySelector('img');
                if(img) img.classList.add('brightness-0', 'invert');
            });
        });
    }

    function setupSort() {
        const sortSelect = document.getElementById('sort-select');
        if (!sortSelect) return;

        sortSelect.addEventListener('change', (e) => {
            const sortValue = e.target.value;
            sortProducts(sortValue);
            renderProducts(state.filteredProducts);
        });
    }

    function sortProducts(sortValue) {
        if (sortValue === 'price-low-high') {
            state.filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-high-low') {
            state.filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'newest') {
            state.filteredProducts.sort((a, b) => b.id - a.id);
        } else if (sortValue === 'best-selling') {
            state.filteredProducts.sort((a, b) => a.id - b.id);
        }
    }

    function renderPagination(totalItems) {
        const paginationContainer = document.getElementById('pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(totalItems / state.itemsPerPage);
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let html = '';
        const isFirstPage = state.currentPage === 1;
        if (!isFirstPage) {
            html += `<button type="button" class="page-btn prev-btn w-[44px] h-[44px] flex items-center justify-center rounded-full text-black hover:bg-[#F3F3F3] font-jost text-base transition-colors" aria-label="Previous page">&lt;</button>`;
        }

        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === state.currentPage;
            const activeClass = isActive ? 'bg-[#F3F3F3] text-black font-semibold' : 'bg-transparent text-[#666666] hover:text-black hover:bg-[#F3F3F3]';
            html += `<button type="button" class="page-btn num-btn w-[44px] h-[44px] flex items-center justify-center rounded-full font-jost text-base transition-colors ${activeClass}" data-page="${i}">${i}</button>`;
        }

        const isLastPage = state.currentPage === totalPages;
        if (!isLastPage) {
            html += `<button type="button" class="page-btn next-btn w-[44px] h-[44px] flex items-center justify-center rounded-full text-black hover:bg-[#F3F3F3] font-jost text-base transition-colors" aria-label="Next page">&raquo;</button>`;
        }

        paginationContainer.innerHTML = html;

        const buttons = paginationContainer.querySelectorAll('.page-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.classList.contains('prev-btn')) {
                    if (state.currentPage > 1) state.currentPage--;
                } else if (btn.classList.contains('next-btn')) {
                    if (state.currentPage < totalPages) state.currentPage++;
                } else if (btn.classList.contains('num-btn')) {
                    state.currentPage = parseInt(btn.getAttribute('data-page'));
                }
                renderProducts(state.filteredProducts);
                
                const sortSelect = document.getElementById('sort-select');
                if (sortSelect) {
                    sortSelect.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            });
        });
    }

    function setupSearchInput() {
        const searchInputs = document.querySelectorAll(
            'input[placeholder*="Search"], input[placeholder*="search"], input[type="search"], #search-input, input[name="search"]'
        );
        if (!searchInputs.length) return;

        const urlParams = new URLSearchParams(window.location.search);
        const currentSearch = urlParams.get('search') || '';

        searchInputs.forEach(input => {
            if (currentSearch) {
                input.value = currentSearch;
            }

            input.addEventListener('input', (e) => {
                updateSearchState(e.target.value);
            });

            const form = input.closest('form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    updateSearchState(input.value);
                });
            }
        });
    }

    function updateSearchState(value) {
        const val = value.trim();
        const currentUrl = new URL(window.location.href);

        if (val) {
            currentUrl.searchParams.set('search', val);
        } else {
            currentUrl.searchParams.delete('search');
        }

        window.history.replaceState({}, '', currentUrl);

        const searchInputs = document.querySelectorAll(
            'input[placeholder*="Search"], input[placeholder*="search"], input[type="search"], #search-input, input[name="search"]'
        );
        searchInputs.forEach(inp => {
            inp.value = val;
        });

        applyFilters();
    }

    function applyFilters() {
        let result = [...products];

        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search')?.toLowerCase().trim();

        if (searchQuery) {
            result = result.filter(product => {
                const matchName = product.name?.toLowerCase().includes(searchQuery);
                const matchBrand = product.brand?.toLowerCase().includes(searchQuery);
                const matchTags = product.tags?.some(t => t.toLowerCase().includes(searchQuery));
                return matchName || matchBrand || matchTags;
            });
        }

        if (state.filters.brand.length > 0) result = result.filter(product => state.filters.brand.includes(product.brand));
        if (state.filters.size.length > 0) result = result.filter(product => product.sizes.some(size => state.filters.size.includes(size)));
        if (state.filters.price.length > 0) {
            result = result.filter(product => {
                return state.filters.price.some(range => {
                    if (range === '0-50') return product.price >= 0 && product.price <= 50;
                    if (range === '50-100') return product.price > 50 && product.price <= 100;
                    if (range === '100-150') return product.price > 100 && product.price <= 150;
                    if (range === '150-200') return product.price > 150 && product.price <= 200;
                    if (range === '300-400') return product.price > 300 && product.price <= 400;
                    return false;
                });
            });
        }
        if (state.filters.color.length > 0) result = result.filter(product => product.colors.some(c => state.filters.color.includes(c)));
        
        const activeCollections = state.filters.collection.filter(c => c !== "All products");
        if (activeCollections.length > 0) {
            result = result.filter(product => {
                const prodCols = Array.isArray(product.collections) ? product.collections : (product.collection ? [product.collection] : []);
                return prodCols.some(c => activeCollections.includes(c));
            });
        }

        if (state.filters.tag.length > 0) result = result.filter(product => product.tags && product.tags.some(t => state.filters.tag.includes(t)));

        state.filteredProducts = result;
        state.currentPage = 1;

        const sortSelect = document.getElementById('sort-select');
        if (sortSelect && sortSelect.value) {
            sortProducts(sortSelect.value);
        }

        renderProducts(state.filteredProducts);
    }

    function setupFilters() {
        const filterItems = document.querySelectorAll('.filter-item');
        if (!filterItems.length) return;

        filterItems.forEach(item => {
            item.addEventListener('click', () => {
                const type = item.getAttribute('data-type');
                const value = item.getAttribute('data-value');
                const isSelected = state.filters[type].includes(value);

                if (isSelected) {
                    state.filters[type] = state.filters[type].filter(v => v !== value);
                    if (type === 'size') {
                        item.classList.remove('border-black', 'text-black');
                        item.classList.add('border-medium-gray', 'text-medium-gray');
                    } else if (type === 'color') {
                        item.classList.remove('ring-2', 'ring-offset-2', 'ring-black');
                    } else if (type === 'tag') {
                        item.classList.remove('text-black', 'font-bold', 'underline');
                        item.classList.add('text-neutral-gray');
                    } else {
                        item.classList.remove('text-black', 'font-bold');
                        item.classList.add('text-medium-gray');
                    }
                } else {
                    state.filters[type].push(value);
                    if (type === 'size') {
                        item.classList.remove('border-medium-gray', 'text-medium-gray');
                        item.classList.add('border-black', 'text-black');
                    } else if (type === 'color') {
                        item.classList.add('ring-2', 'ring-offset-2', 'ring-black');
                    } else if (type === 'tag') {
                        item.classList.remove('text-neutral-gray');
                        item.classList.add('text-black', 'font-bold');
                    } else {
                        item.classList.remove('text-medium-gray');
                        item.classList.add('text-black', 'font-bold');
                    }
                }
                applyFilters();
            });
        });
    }

    // 3.10. HÀM XỬ LÝ THÊM VÀO GIỎ HÀNG (ADD TO CART)
    function setupAddToCart() {
        productListContainer.addEventListener('click', (e) => {
            // Kiểm tra click vào thẻ sản phẩm có class add-to-cart-btn
            const card = e.target.closest('.add-to-cart-btn');
            if (!card) return;

            // Bỏ qua nếu người dùng bấm vào các nút đổi màu bên trong card
            if (e.target.tagName === 'BUTTON') return;

            const productData = {
                id: card.dataset.id,
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                color: card.dataset.color,
                size: card.dataset.size,
                image: card.dataset.image,
                quantity: 1
            };

            // Lấy danh sách giỏ hàng hiện tại từ localStorage
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Kiểm tra xem sản phẩm cùng ID, màu, size đã tồn tại chưa
            const existingIndex = cart.findIndex(item => 
                item.id === productData.id && 
                item.color === productData.color && 
                item.size === productData.size
            );

            if (existingIndex > -1) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push(productData);
            }

            // Lưu lại vào localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Phát Custom Event để MiniCart nhận thông báo và cập nhật lại giao diện ngay lập tức
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        });
    }

    // 4. KHỞI TẠO LOGIC
    setupSearchInput();
    setupViewStyle(); 
    setupSort();
    setupFilters();
    setupAddToCart();
    applyFilters(); 
}