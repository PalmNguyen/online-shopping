/**
 * FASCO Shopping Cart Page Module
 * Đồng bộ chung dữ liệu với minicart.js thông qua LocalStorage key 'fasco_cart'
 */

const CART_KEY = 'fasco_cart';

// Lấy danh sách sản phẩm từ localStorage (Dùng chung key với minicart.js)
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Lưu danh sách sản phẩm vào localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Định dạng tiền tệ USD
function formatCurrency(amount) {
  return `$${parseFloat(amount).toFixed(2)}`;
}

// Cập nhật tổng tiền (Subtotal) bao gồm cả phí bọc quà ($10.00)
export function updateSummary() {
  const cart = getCart();
  let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Kiểm tra trạng thái checkbox bọc quà (đồng bộ giữa Mobile & PC)
  const wrapCheckboxes = document.querySelectorAll('.sync-wrap-cb');
  const isChecked = Array.from(wrapCheckboxes).some(cb => cb.checked);

  if (isChecked) {
    subtotal += 10.00;
    wrapCheckboxes.forEach(cb => (cb.checked = true));
  } else {
    wrapCheckboxes.forEach(cb => (cb.checked = false));
  }

  // Cập nhật giá trị hiển thị ở tất cả các ô subtotal
  const subtotalEls = document.querySelectorAll('.sync-subtotal-val');
  subtotalEls.forEach(el => {
    el.textContent = formatCurrency(subtotal);
  });
}

// Render danh sách sản phẩm ra giao diện trang Cart Page
export function renderCart() {
  const cartContainer = document.getElementById('cart-table-body');
  if (!cartContainer) return;

  const cart = getCart();

  // Trường hợp giỏ hàng trống
  if (cart.length === 0) {
    cartContainer.innerHTML = `
            <div class="text-center py-12">
                <p class="font-volkhov text-xl text-gray-500 mb-6">Your shopping cart is empty.</p>
                <a href="?page=shop" class="inline-block px-8 py-3 bg-black text-white font-poppins rounded-lg hover:bg-neutral-800 transition-colors">
                    Continue Shopping
                </a>
            </div>
        `;
    updateSummary();
    return;
  }

  // Render danh sách sản phẩm
  cartContainer.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    const formattedQty = item.quantity < 10 ? `0${item.quantity}` : item.quantity;
    const variantText = `Color : ${item.color}${item.size ? ` | Size: ${item.size}` : ''}`;

    return `
        <div class="cart-item-row w-full" data-index="${index}">
            
            <div class="hidden lg:flex justify-between w-full items-center">
                <div class="col-span-5 flex w-[368px] h-[224px] items-start space-x-4 mr-5">
                    <img src="${item.image || './assets/img/placeholder.png'}" alt="${item.name}" class="w-[168px] h-[225px] mr-5 object-cover flex-shrink-0 rounded-[5px]" />
                    <div class="flex flex-col justify-between h-full">
                        <div class="flex flex-cols">
                            <h3 class="font-volkhov font-normal flex w-[176px] text-xl font-bold text-black mr-11 leading-snug">
                                ${item.name}
                            </h3>
                            <div class="col-span-2 font-volkhov font-normal text-xl text-black mr-[310px]">
                                ${formatCurrency(item.price)}
                            </div>
                            <div class="col-span-3 flex justify-center mr-[290px]">
                                <div class="inline-flex items-center justify-between m-auto border border-[#8a8a8a] rounded px-3 py-1 w-30 h-11 text-xl font-volkhov">
                                    <button type="button" data-action="decrease" class="text-[#171717] hover:text-gray-400 cursor-pointer">-</button>
                                    <span class="text-[#8a8a8a] select-none mx-2">${formattedQty}</span>
                                    <button type="button" data-action="increase" class="text-[#171717] hover:text-gray-400 cursor-pointer">+</button>
                                </div>
                            </div>
                            <div class="col-span-2 text-right font-volkhov font-bold text-xl text-black">
                                ${formatCurrency(itemTotal)}
                            </div>
                        </div>
                        <p class="text-xl font-poppins text-[#8a8a8a] my-4">${variantText}</p>
                        <button type="button" data-action="remove" class="text-xl text-[#8a8a8a] font-poppins underline hover:text-black text-left transition-colors w-max mt-4 cursor-pointer">
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex lg:hidden flex-col w-full bg-white rounded-lg mb-4">
                <div class="flex items-start space-x-4 mb-4">
                    <img src="${item.image || './assets/img/placeholder.png'}" alt="${item.name}" class="w-[90px] h-[120px] object-cover rounded-md flex-shrink-0" />
                    <div class="flex flex-col mt-1">
                        <h3 class="font-volkhov font-bold text-base text-black leading-snug mb-1">
                            ${item.name}
                        </h3>
                        <p class="text-sm font-poppins text-[#8a8a8a] mb-2">${variantText}</p>
                        <button type="button" data-action="remove" class="text-sm text-[#FF4646] underline hover:opacity-75 text-left transition-colors cursor-pointer">
                            Remove
                        </button>
                    </div>
                </div>

                <div class="w-full bg-[#f8f9fa] rounded-xl p-4 flex flex-col space-y-4 border border-gray-100">
                    <div class="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span class="font-volkhov text-[#8a8a8a] text-sm">Price</span>
                        <span class="font-volkhov font-bold text-black text-sm">${formatCurrency(item.price)}</span>
                    </div>
                    <div class="flex justify-between items-center border-b border-gray-200 pb-3">
                        <span class="font-volkhov text-[#8a8a8a] text-sm">Quantity</span>
                        <div class="inline-flex items-center justify-between border border-gray-300 bg-white rounded px-2 py-1 w-20 h-8 shadow-sm">
                            <button type="button" data-action="decrease" class="text-black hover:text-gray-400 font-bold text-sm cursor-pointer">-</button>
                            <span class="text-black text-sm font-poppins select-none">${formattedQty}</span>
                            <button type="button" data-action="increase" class="text-black hover:text-gray-400 font-bold text-sm cursor-pointer">+</button>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-volkhov text-[#8a8a8a] text-sm">Total</span>
                        <span class="font-volkhov font-bold text-black text-sm">${formatCurrency(itemTotal)}</span>
                    </div>
                </div>
            </div>

        </div>
        `;
  }).join('');

  updateSummary();
}

// Khởi tạo các sự kiện cho trang Cart Page
export function initCartEvents() {
  const cartContainer = document.getElementById('cart-table-body');
  if (!cartContainer) return;

  // Render danh sách sản phẩm ban đầu
  renderCart();

  // Bắt sự kiện Tăng / Giảm / Xóa sản phẩm bằng Event Delegation
  cartContainer.addEventListener('click', (e) => {
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.getAttribute('data-action');
    const row = actionBtn.closest('.cart-item-row');
    if (!row) return;

    const index = parseInt(row.getAttribute('data-index'), 10);
    let cart = getCart();

    if (isNaN(index) || !cart[index]) return;

    if (action === 'increase') {
      cart[index].quantity += 1;
    } else if (action === 'decrease') {
      cart[index].quantity -= 1;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
      }
    } else if (action === 'remove') {
      cart.splice(index, 1);
    }

    saveCart(cart);
    renderCart();
  });

  // Sự kiện thay đổi checkbox bọc quà
  document.querySelectorAll('.sync-wrap-cb').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      document.querySelectorAll('.sync-wrap-cb').forEach(item => {
        item.checked = isChecked;
      });
      updateSummary();
    });
  });
}