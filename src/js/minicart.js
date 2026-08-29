const CART_KEY = 'fasco_cart';

// Lấy giỏ hàng từ localStorage
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Lưu giỏ hàng
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
}

// Cập nhật giao diện giỏ hàng
export function updateCartUI() {
    const cart = getCart();
    const badge = document.getElementById('cart-badge');
    const itemsContainer = document.getElementById('mini-cart-items');
    const subtotalEl = document.getElementById('mini-cart-subtotal');

    // Cập nhật Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (badge) {
        badge.innerText = totalItems;
        if (totalItems > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    // Cập nhật Subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;

    // Render danh sách sản phẩm
    if (itemsContainer) {
        if (cart.length === 0) {
            itemsContainer.innerHTML = '<p class="font-poppins text-medium-gray text-center py-4">Your cart is empty.</p>';
            return;
        }

        itemsContainer.innerHTML = cart.map((item, index) => `
            <div class="w-full flex flex-col items-start gap-[19px]">
                <div class="w-full flex flex-row gap-[22px] items-center">
                    <img src="${item.image}" alt="${item.name}"
                        class="w-[168px] h-[225px] object-cover rounded-[5px] shrink-0" />

                    <div class="flex flex-col gap-[9px] flex-1">
                        <div class="flex flex-col text-left">
                            <div class="flex items-center justify-between w-full">
                                <h3 class="font-volkhov text-lg xl:text-[22px] font-normal text-black leading-tight xl:leading-[42px]">
                                    ${item.name}
                                </h3>
                                <button type="button" onclick="removeCartItem(${index})" class="font-poppins text-xs xl:text-sm text-[#FF4646] underline hover:opacity-75 cursor-pointer">
                                    Remove
                                </button>
                            </div>
                            <p class="font-poppins font-normal text-base xl:text-[22px] leading-tight xl:leading-[42px] text-medium-gray">
                                Color : ${item.color}${item.size ? ` | Size: ${item.size}` : ''}
                            </p>
                            <span class="font-poppins font-normal text-base xl:text-[22px] leading-tight xl:leading-[42px] text-black">
                                $${item.price.toFixed(2)}
                            </span>
                        </div>

                        <!-- Ô tăng giảm số lượng -->
                        <div class="w-[140px] xl:w-[170px] h-[48px] xl:h-[59px] bg-[#F1F1F1] rounded-[5px] flex items-center justify-between px-3 xl:px-4 shrink-0">
                            <button type="button" aria-label="Decrease quantity" onclick="changeQuantity(${index}, -1)"
                                class="font-poppins font-medium text-2xl xl:text-[36px] text-[#171717] leading-none hover:opacity-60 cursor-pointer flex items-center justify-center h-full">
                                -
                            </button>
                            <input type="text" value="${item.quantity < 10 ? '0' + item.quantity : item.quantity}" readonly aria-label="Product quantity"
                                class="w-10 xl:w-12 text-center font-poppins font-normal text-2xl xl:text-[36px] text-[#8A8A8A] leading-none bg-transparent outline-none select-none" />
                            <button type="button" aria-label="Increase quantity" onclick="changeQuantity(${index}, 1)"
                                class="font-poppins font-medium text-2xl xl:text-[36px] text-[#171717] leading-none hover:opacity-60 cursor-pointer flex items-center justify-center h-full">
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Thanh cắt ngang 1 -->
                <div class="w-full h-[1px] bg-[#00000063]"></div>
            </div>
        `).join('');
    }
}
// Đưa hàm vào window để có thể gọi từ inline onclick của HTML mới render
window.changeQuantity = function(index, change) {
    let cart = getCart();
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    saveCart(cart);
};

window.removeCartItem = function(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
};

// Đóng/Mở Mini-cart
export function toggleMiniCart(show) {
    const miniCart = document.getElementById('mini-cart');
    const cartPanel = document.getElementById('cart-panel');
    
    if (!miniCart || !cartPanel) return;

    if (show) {
        miniCart.classList.remove('opacity-0', 'pointer-events-none');
        miniCart.classList.add('opacity-100');
        cartPanel.classList.remove('translate-x-full');
        cartPanel.classList.add('translate-x-0');
    } else {
        miniCart.classList.remove('opacity-100');
        miniCart.classList.add('opacity-0', 'pointer-events-none');
        cartPanel.classList.remove('translate-x-0');
        cartPanel.classList.add('translate-x-full');
    }
}

// HÀM KHỞI TẠO CHÍNH (Được gọi từ index.html)
// Biến đánh dấu để đảm bảo chỉ gắn sự kiện lên document đúng 1 lần
let isEventListenerAttached = false;

export function initMiniCartEvents() {
    // 1. Luôn cập nhật lại UI đầu tiên
    updateCartUI();

    // 2. Bắt TẤT CẢ sự kiện (Đóng/Mở/Add to cart) bằng Event Delegation trên document
    if (!isEventListenerAttached) {
        document.addEventListener('click', (e) => {
            // Nút MỞ giỏ hàng trên Header
            const openBtn = e.target.closest('#open-cart-btn');
            if (openBtn) {
                e.preventDefault();
                toggleMiniCart(true);
                return;
            }

            // Nút ĐÓNG giỏ hàng (Nút X)
            const closeBtn = e.target.closest('#close-cart-btn');
            if (closeBtn) {
                e.preventDefault();
                toggleMiniCart(false);
                return;
            }

            // Click ra ngoài lớp phủ mờ (Backdrop) để đóng
            const backdrop = e.target.closest('#cart-backdrop');
            if (backdrop) {
                e.preventDefault();
                toggleMiniCart(false);
                return;
            }

            // Nút ADD TO CART (Bắt động cho cả sản phẩm render từ shop.js)
            const addBtn = e.target.closest('.add-to-cart-btn');
            if (addBtn) {
                e.preventDefault();
                
                const wrapper = addBtn.closest('.flex, .flex-col, .w-full'); 
                const quantityInput = wrapper ? wrapper.querySelector('input[type="number"]') : null;
                const quantityValue = quantityInput ? parseInt(quantityInput.value) : 1;

                const newItem = {
                    id: addBtn.dataset.id || "prod_01",
                    name: addBtn.dataset.name || "Product Name",
                    price: parseFloat(addBtn.dataset.price) || 0,
                    color: addBtn.dataset.color || "Default",
                    size: addBtn.dataset.size || "M",
                    image: addBtn.dataset.image || "",
                    quantity: quantityValue
                };

                let cart = getCart();
                const existingItemIndex = cart.findIndex(
                    item => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
                );
                
                if (existingItemIndex !== -1) {
                    cart[existingItemIndex].quantity += newItem.quantity;
                } else {
                    cart.push(newItem);
                }

                saveCart(cart);
                toggleMiniCart(true);
                return;
            }
        });

        isEventListenerAttached = true; // Đã gắn xong listener toàn cục
    }
}