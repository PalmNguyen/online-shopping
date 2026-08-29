/**
 * FASCO Checkout Module
 */

const CART_KEY = 'fasco_cart';
const CART_KEY_ALT = 'fasco_cart_items';

// Phí vận chuyển cố định
const SHIPPING_FEE = 40.00;

// Trạng thái giảm giá
let discountPercent = 0;

// Lấy giỏ hàng từ LocalStorage
function getCart() {
    const data = localStorage.getItem(CART_KEY) || localStorage.getItem(CART_KEY_ALT);
    return data ? JSON.parse(data) : [];
}

// Xóa giỏ hàng sau khi thanh toán thành công
function clearCart() {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(CART_KEY_ALT);
}

// Format giá tiền
function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

// Tính toán các chi phí
function calculateTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? SHIPPING_FEE : 0;
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = Math.max(0, subtotal + shipping - discountAmount);

    return { subtotal, shipping, discountAmount, total };
}

// Render sản phẩm ra giao diện Checkout
function renderCheckoutItems() {
    const cart = getCart();
    const desktopContainer = document.getElementById('checkout-items-desktop');
    const mobileContainer = document.getElementById('checkout-items-mobile');

    if (cart.length === 0) {
        const emptyHTML = `<p class="text-gray-500 font-poppins text-center py-6">Your cart is empty.</p>`;
        if (desktopContainer) desktopContainer.innerHTML = emptyHTML;
        if (mobileContainer) mobileContainer.innerHTML = emptyHTML;
        updateSummaryUI();
        return;
    }

    // Render danh sách trên Desktop
    if (desktopContainer) {
        desktopContainer.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between pb-3 border-b border-gray-200">
                <div class="flex items-center gap-4">
                    <div class="relative flex-shrink-0">
                        <img src="${item.image || './assets/img/placeholder.png'}" alt="${item.name}"
                            class="w-[70px] h-[80px] object-cover rounded-md border border-gray-200">
                        <span class="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border border-white">
                            ${item.quantity}
                        </span>
                    </div>
                    <div>
                        <h4 class="text-base font-volkhov font-bold text-black leading-tight">${item.name}</h4>
                        <p class="text-xs font-poppins text-gray-500 mt-1">Color: ${item.color || 'Default'}${item.size ? ` | Size: ${item.size}` : ''}</p>
                    </div>
                </div>
                <span class="text-base font-poppins font-semibold text-black">${formatCurrency(item.price * item.quantity)}</span>
            </div>
        `).join('');
    }

    // Render danh sách trên Mobile
    if (mobileContainer) {
        mobileContainer.innerHTML = cart.map(item => `
            <div class="flex items-center justify-between border-b border-gray-200 pb-2">
                <div class="flex items-center gap-3">
                    <div class="relative flex-shrink-0">
                        <img src="${item.image || './assets/img/placeholder.png'}" alt="${item.name}" class="w-12 h-14 object-cover rounded-md">
                        <span class="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            ${item.quantity}
                        </span>
                    </div>
                    <div>
                        <h4 class="text-xs font-volkhov font-bold text-black leading-tight">${item.name}</h4>
                        <p class="text-[10px] text-gray-500 mt-0.5">${item.color || 'Default'}</p>
                    </div>
                </div>
                <span class="text-xs font-poppins font-bold text-black">${formatCurrency(item.price * item.quantity)}</span>
            </div>
        `).join('');
    }

    updateSummaryUI();
}

// Cập nhật giá trị hiển thị ở phần Order Summary
function updateSummaryUI() {
    const { subtotal, shipping, discountAmount, total } = calculateTotals();

    // Đồng bộ Subtotal
    document.querySelectorAll('.js-checkout-subtotal').forEach(el => {
        el.textContent = formatCurrency(subtotal);
    });

    // Đồng bộ Shipping
    document.querySelectorAll('.js-checkout-shipping').forEach(el => {
        el.textContent = formatCurrency(shipping);
    });

    // Đồng bộ Total
    document.querySelectorAll('.js-checkout-total').forEach(el => {
        el.textContent = formatCurrency(total);
    });

    // Hiển thị dòng Discount nếu có mã giảm giá
    const discountDesktopRow = document.getElementById('discount-row-desktop');
    const discountMobileRow = document.getElementById('discount-row-mobile');

    if (discountPercent > 0) {
        document.querySelectorAll('.js-checkout-discount').forEach(el => {
            el.textContent = `-${formatCurrency(discountAmount)}`;
        });
        if (discountDesktopRow) discountDesktopRow.classList.remove('hidden');
        if (discountMobileRow) discountMobileRow.classList.remove('hidden');
    } else {
        if (discountDesktopRow) discountDesktopRow.classList.add('hidden');
        if (discountMobileRow) discountMobileRow.classList.add('hidden');
    }
}

// Áp dụng mã giảm giá
function applyDiscount(code) {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === 'FASCO10' || cleanCode === 'DISCOUNT10') {
        discountPercent = 10;
        alert("Success! 10% discount coupon applied.");
    } else if (cleanCode === 'FASCO20') {
        discountPercent = 20;
        alert("Success! 20% discount coupon applied.");
    } else {
        alert("Invalid coupon code!");
        return;
    }

    updateSummaryUI();
}

// Khởi tạo các sự kiện cho trang Checkout
export function initCheckoutEvents() {
    // 1. Render giỏ hàng ban đầu
    renderCheckoutItems();

    // 2. Lắng nghe nút Apply Discount (Desktop & Mobile)
    const btnDiscountDesktop = document.getElementById('btn-apply-discount-desktop');
    if (btnDiscountDesktop) {
        btnDiscountDesktop.onclick = () => {
            const input = document.getElementById('discount-code-desktop');
            if (input) applyDiscount(input.value);
        };
    }

    const btnDiscountMobile = document.getElementById('btn-apply-discount-mobile');
    if (btnDiscountMobile) {
        btnDiscountMobile.onclick = () => {
            const input = document.getElementById('discount-code-mobile');
            if (input) applyDiscount(input.value);
        };
    }

    // 3. Xử lý sự kiện bấm "Pay Now"
    const handlePayNow = (e) => {
        e.preventDefault();
        const cart = getCart();

        if (cart.length === 0) {
            alert("Your shopping cart is empty! Please add products before checking out.");
            window.location.href = '?page=shop';
            return;
        }

        // Đã điền thông tin thành công -> Thực hiện thanh toán
        alert("Thank you for your purchase! Your order has been placed successfully.");
        clearCart();
        window.location.href = '?page=home';
    };

    const formDesktop = document.getElementById('checkout-form-desktop');
    if (formDesktop) formDesktop.addEventListener('submit', handlePayNow);

    const formMobile = document.getElementById('checkout-form-mobile');
    if (formMobile) formMobile.addEventListener('submit', handlePayNow);
}