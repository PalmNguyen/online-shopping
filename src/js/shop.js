// src/js/shop.js

// 1. DỮ LIỆU SẢN PHẨM (Mock Data - Trích xuất từ HTML mẫu)
const products = [
  {
    id: 1,
    name: "Rounded Red Hat",
    price: 8.00,
    image: "./assets/img/roundedredhat.png",
    colors: ["#FFD700", "#000000"], 
    sizes: ["S", "M"],
    brand: "Fasco",
    collection: "Accessories",
    tags: ["Fashion", "Hats","Sandal"]  
  },
  {
    id: 2,
    name: "Linen-blend Shirt",
    price: 17.00,
    image: "./assets/img/lineblendshirt.png",
    isSoldOut: true, // Đánh dấu hết hàng
    colors: ["#8DB4D2", "#FFD1DC"],
    sizes: ["M", "L", "XL"],
    brand: "Zara",
    collection: "Best sellers", 
    tags: ["Belt", "Bags","Snacker"]
  },
  {
    id: 3,
    name: "Long-sleeve Coat",
    price: 106.00,
    image: "./assets/img/longsleevecoat.png",
    colors: ["#EBE6DB", "#C1E1C1"],
    sizes: ["L", "XL", "XXL"],
    brand: "H&M",
    collection: "New arrivals", // Thêm collection
    tags: ["Denim", "Minimog","Vagabond"]  // Thêm tags
  },
  {
    id: 4,
    name: "Boxy Denim Hat",
    price: 25.00,
    image: "./assets/img/boxydenimhat.png",
    colors: ["#B1C5D4", "#063E66"],
    sizes: ["One Size"],
    brand: "Levi's",
    collection: "Best sellers",
    tags: ["Sunglasses","Beachwear"]
  },
  {
    id: 5,
    name: "Linen Plain Top",
    price: 25.00,
    image: "./assets/img/lineplaintop.png",
    colors: ["#C1E1C1", "url('./assets/img/pattern-caro.png')"], // Nền pattern
    sizes: ["S", "M", "L"],
    brand: "Zara",
    collection: "New arrivals",
    tags: ["Fashion", "Hats","Sandal"]
  },
  {
    id: 6,
    name: "Oversized T-shirt",
    price: 11.00,
    originalPrice: 14.00, // Giá gốc để hiển thị gạch ngang
    image: "./assets/img/oversizedtshirt.png",
    colors: ["#FFD1DC", "#C6AEC7", "#FFFFFF01"],
    sizes: ["M", "L", "XL"],
    brand: "Nike",
    collection: "Accessories",
      tags: ["Belt", "Bags","Snacker"]
  },
  {
    id: 7,
    name: "Polarised Sunglasses",
    price: 18.00,
    originalPrice: 21.00, // Giá gốc để hiển thị gạch ngang
    image: "./assets/img/polarisedsunglasses.png",
    colors: ["#000000", "#836953"],
    sizes: ["M", "L", "XL"],
    brand: "Ray-Ban",
    collection: "Best sellers",
    tags: ["Denim", "Minimog","Vagabond"]
  },
  {
    id: 8,
    name: "Rockstar Jacket",
    price: 22.00,
    image: "./assets/img/rockstarjacket.png",
    colors: ["#C6AEC7", "#BEDCE3"],
    sizes: ["M", "L"],
    brand: "Levi's",
    collection: "New arrivals",
    tags: ["Sunglasses","Beachwear"]
  },
  {
    id: 9,
    name: "Dotted Black Dress",
    price: 20.00,
    image: "./assets/img/dottedblackdress.png",
    colors: ["#063E66", "#000000", "#B1C5D4"],
    sizes: ["S", "M"],
    brand: "Fasco",
    collection: "Accessories",
    tags: ["Fashion", "Hats","Sandal"] 
  }
];

// 2. STATE - LƯU TRỮ TRẠNG THÁI CỦA TRANG
const state = {
    filteredProducts: [...products], // Ban đầu hiển thị toàn bộ sản phẩm
    currentPage: 1,
    itemsPerPage: 6, // Số sản phẩm trên 1 trang
    currentViewCols: 3, // Mặc định hiển thị 3 cột

    // --- THÊM PHẦN NÀY ĐỂ LƯU BỘ LỌC ĐANG CHỌN ---
    filters: {
        brand: [],
        size: [],
        price: [],
        color: [], 
        collection: [], 
        tag: []
    }
};




// 3. HÀM RENDER SẢN PHẨM
function renderProducts(productList) {
    const productListContainer = document.getElementById('product-list');
    
    // Nếu không tìm thấy thẻ ul#product-list thì dừng lại luôn để tránh lỗi
    if (!productListContainer) return;

    // Xóa trắng nội dung cũ trước khi bơm dữ liệu mới
    productListContainer.innerHTML = '';

    // Tính toán cắt mảng dựa trên số trang
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;

    // Tạo ra mảng mới chỉ chứa các sản phẩm của trang hiện tại
    const paginatedProducts = productList.slice(startIndex, endIndex);

    let html = '';

    // Lặp qua từng sản phẩm để tạo HTML
    paginatedProducts.forEach(product => {
        // --- XỬ LÝ 1: Giá cả (Có giá sale vs Không có giá sale) ---
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

        // --- XỬ LÝ 2: Tem "SOLD OUT" ---
        let soldOutHtml = '';
        if (product.isSoldOut) {
            soldOutHtml = `
                <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[54px] h-[54px] rounded-full bg-[#A1A1A1] flex flex-col items-center justify-center font-jost font-black text-[10px] leading-[12px] text-white text-center uppercase pointer-events-none">
                    <span>SOLD</span>
                    <span>OUT</span>
                </span>
            `;
        }

        // --- XỬ LÝ 3: Nút chọn màu sắc ---
        let colorsHtml = '';
        product.colors.forEach((color, index) => {
            // Nếu chuỗi màu có chữ 'url' (pattern caro), dùng background-image, ngược lại dùng background-color
            let bgStyle = color.includes('url') ? `background-image: ${color}; background-position: center;` : `background-color: ${color};`;
            
            // Màu đầu tiên giả lập trạng thái đang được chọn (có viền shadow), các màu sau có hiệu ứng hover
            let activeClass = index === 0 
                ? 'shadow-[inset_0_0_0_4px_#ffffff,0_0_0_1px_#000000]' 
                : 'hover:scale-110 transition-transform';

            colorsHtml += `
                <button
                    type="button"
                    class="w-[26px] h-[26px] rounded-full cursor-pointer ${activeClass}"
                    style="${bgStyle}"
                    aria-label="Color variation"
                ></button>
            `;
        });

        // --- GỘP TẤT CẢ VÀO THẺ <li> CHUẨN HTML CỦA BẠN ---
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

    // Bơm toàn bộ chuỗi HTML vừa tạo vào khung chứa
    productListContainer.innerHTML = html;

    // Gọi hàm render nút phân trang
    renderPagination(productList.length);
}

// 3.5. HÀM XỬ LÝ ĐỔI GIAO DIỆN CỘT
function setupViewStyle() {
    // Lấy tất cả các nút có class .view-btn
    const viewButtons = document.querySelectorAll('.view-btn');
    const productList = document.getElementById('product-list');

    if (!viewButtons.length || !productList) return;

    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Lấy số cột từ thuộc tính data-cols (ví dụ: "4")
            const cols = btn.getAttribute('data-cols');
            
            // Xóa tất cả các class quy định số cột cũ của Tailwind trên màn hình lớn
            productList.classList.remove('lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4', 'lg:grid-cols-5');
            
            // Thêm class mới tương ứng với nút vừa bấm
            productList.classList.add(`lg:grid-cols-${cols}`);

            // === TẠO HIỆU ỨNG CHO NÚT (Đen = Đang chọn, Xám = Không chọn) ===
            // Reset toàn bộ nút về màu xám (#F2F2F2) và ảnh màu đen
            viewButtons.forEach(b => {
                b.classList.remove('bg-black');
                b.classList.add('bg-[#F2F2F2]');
                const img = b.querySelector('img');
                if(img) img.classList.remove('brightness-0', 'invert');
            });

            // Set nút vừa bấm thành màu đen, ảnh màu trắng
            btn.classList.remove('bg-[#F2F2F2]');
            btn.classList.add('bg-black');
            const img = btn.querySelector('img');
            if(img) img.classList.add('brightness-0', 'invert');
        });
    });
}

// 3.6. HÀM XỬ LÝ SẮP XẾP SẢN PHẨM (SORT)
function setupSort() {
    const sortSelect = document.getElementById('sort-select');
    
    // Nếu không tìm thấy thẻ select thì dừng lại
    if (!sortSelect) return;

    sortSelect.addEventListener('change', (e) => {
        const sortValue = e.target.value;

        // Tiến hành sắp xếp mảng state.filteredProducts
        if (sortValue === 'price-low-high') {
            // Giá: Thấp đến Cao
            state.filteredProducts.sort((a, b) => a.price - b.price);
            
        } else if (sortValue === 'price-high-low') {
            // Giá: Cao đến Thấp
            state.filteredProducts.sort((a, b) => b.price - a.price);
            
        } else if (sortValue === 'newest') {
            // Mới nhất (Giả định ID lớn hơn là sản phẩm thêm vào sau/mới hơn)
            state.filteredProducts.sort((a, b) => b.id - a.id);
            
        } else if (sortValue === 'best-selling') {
            // Best selling (Tạm thời cho về mặc định là ID từ nhỏ đến lớn)
            state.filteredProducts.sort((a, b) => a.id - b.id);
        }

        // Sau khi mảng đã được sắp xếp lại, chỉ cần gọi hàm render để vẽ lại HTML
        renderProducts(state.filteredProducts);
    });
}

// 3.7. HÀM TẠO VÀ XỬ LÝ PHÂN TRANG
function renderPagination(totalItems) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(totalItems / state.itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let html = '';

    // Nút Previous (<)
    const isFirstPage = state.currentPage === 1;
    if (!isFirstPage) {
        html += `
            <button type="button" class="page-btn prev-btn w-[44px] h-[44px] flex items-center justify-center rounded-full text-black hover:bg-[#F3F3F3] font-jost text-base transition-colors" aria-label="Previous page">
                &lt;
            </button>
        `;
    }

    // Các nút Số (1, 2, 3...)
    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === state.currentPage;
        
        // Active: 44x44px, rounded-full (9999px), bg-[#F3F3F3], chữ đen
        const activeClass = isActive 
            ? 'bg-[#F3F3F3] text-black font-semibold' 
            : 'bg-transparent text-[#666666] hover:text-black hover:bg-[#F3F3F3]';
        
        html += `
            <button type="button" class="page-btn num-btn w-[44px] h-[44px] flex items-center justify-center rounded-full font-jost text-base transition-colors ${activeClass}" data-page="${i}">
                ${i}
            </button>
        `;
    }

    // Nút Next (»)
    const isLastPage = state.currentPage === totalPages;
    if (!isLastPage) {
        html += `
            <button type="button" class="page-btn next-btn w-[44px] h-[44px] flex items-center justify-center rounded-full text-black hover:bg-[#F3F3F3] font-jost text-base transition-colors" aria-label="Next page">
                &raquo;
            </button>
        `;
    }

    paginationContainer.innerHTML = html;

    // Gắn sự kiện Click
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

// 3.8. HÀM TÍNH TOÁN VÀ ÁP DỤNG BỘ LỌC
function applyFilters() {
    // 1. Lấy lại mảng gốc để lọc từ đầu
    let result = [...products];

    // 2. Lọc theo Brand (Thương hiệu)
    if (state.filters.brand.length > 0) {
        result = result.filter(product => state.filters.brand.includes(product.brand));
    }

    // 3. Lọc theo Size (Kích thước)
    if (state.filters.size.length > 0) {
        result = result.filter(product => {
            // Kiểm tra xem mảng sizes của sản phẩm có chứa size nào đang được tick không
            return product.sizes.some(size => state.filters.size.includes(size));
        });
    }

  // 4. Lọc theo Giá (Price)
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

    //loc theo mau
    if (state.filters.color.length > 0) {
        result = result.filter(product => {
            // Kiểm tra xem trong mảng colors của sản phẩm có màu đang được tick hay không
            return product.colors.some(c => state.filters.color.includes(c));
        });
    }

    // Lọc theo Collection
const activeCollections = state.filters.collection.filter(c => c !== "All products");
if (activeCollections.length > 0) {
    result = result.filter(product => {
        // Tự động gom collection về dạng mảng để hỗ trợ cả 2 cách viết data (chuỗi hoặc mảng)
        const prodCols = Array.isArray(product.collections) 
            ? product.collections 
            : (product.collection ? [product.collection] : []);

        return prodCols.some(c => activeCollections.includes(c));
    });
}

// Lọc theo Tag
if (state.filters.tag.length > 0) {
    result = result.filter(product => 
        product.tags && product.tags.some(t => state.filters.tag.includes(t))
    );
}
    // 5. Cập nhật lại mảng hiển thị và ÉP về TRANG 1
    state.filteredProducts = result;
    state.currentPage = 1; // Rất quan trọng: Lọc xong phải về trang 1

    // 6. GỌI LẠI HÀM SẮP XẾP (ĐỂ KẾT HỢP VỪA LỌC VỪA SẮP XẾP)
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        // Kích hoạt sự kiện 'change' giả để nó tự chạy mảng qua hàm Sort đã viết
        sortSelect.dispatchEvent(new Event('change'));
    } else {
        // Nếu không có Sort thì render luôn
        renderProducts(state.filteredProducts);
    }
}

// 3.9. HÀM LẮNG NGHE SỰ KIỆN CLICK VÀO SIDEBAR (Phiên bản Custom UI)
// CẬP NHẬT: Hàm xử lý Click Sidebar (Đã hỗ trợ bật/tắt Tags chuẩn)
function setupFilters() {
    const filterItems = document.querySelectorAll('.filter-item');
    if (!filterItems.length) return;

    filterItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const type = item.getAttribute('data-type');
            const value = item.getAttribute('data-value');

            const isSelected = state.filters[type].includes(value);

            if (isSelected) {
                // 1. NẾU ĐÃ CHỌN -> BẤM LẠI ĐỂ BỎ CHỌN (TẮT)
                state.filters[type] = state.filters[type].filter(v => v !== value);
                
                // Reset UI về màu xám ban đầu
                if (type === 'size') {
                    item.classList.remove('border-black', 'text-black');
                    item.classList.add('border-medium-gray', 'text-medium-gray');
                } else if (type === 'color') {
                    item.classList.remove('ring-2', 'ring-offset-2', 'ring-black');
                } else if (type === 'tag') {
                    // Trả lại màu xám của Tag
                    item.classList.remove('text-black', 'font-bold', 'underline');
                    item.classList.add('text-neutral-gray');
                } else {
                    item.classList.remove('text-black', 'font-bold');
                    item.classList.add('text-medium-gray');
                }
            } else {
                // 2. NẾU CHƯA CHỌN -> BẤM ĐỂ BẬT (BẬT)
                state.filters[type].push(value);
                
                // Highlight UI lên màu đen
                if (type === 'size') {
                    item.classList.remove('border-medium-gray', 'text-medium-gray');
                    item.classList.add('border-black', 'text-black');
                } else if (type === 'color') {
                    item.classList.add('ring-2', 'ring-offset-2', 'ring-black');
                } else if (type === 'tag') {
                    // Sáng màu đen và in đậm cho Tag
                    item.classList.remove('text-neutral-gray');
                    item.classList.add('text-black', 'font-bold');
                } else {
                    item.classList.remove('text-medium-gray');
                    item.classList.add('text-black', 'font-bold');
                }
            }

            // Lọc lại danh sách sản phẩm
            applyFilters();
        });
    });
}

// 4. HÀM KHỞI TẠO CHÍNH CỦA TRANG SHOP
export function initShopEvents() {
    console.log("File shop.js đã load thành công với " + products.length + " sản phẩm!");
    
    // 1. GỌI HÀM RENDER ĐẦU TIÊN
    renderProducts(state.filteredProducts);

    // 2. KÍCH HOẠT SỰ KIỆN ĐỔI CỘT
    setupViewStyle(); 

    // 3. KÍCH HOẠT SỰ KIỆN SẮP XẾP
    setupSort();

    // -- THÊM DÒNG NÀY VÀO --
    setupFilters();
}

