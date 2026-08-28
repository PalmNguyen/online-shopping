/**
 * FASCO Shopping Cart Module
 * Tách biệt hoàn toàn UI Desktop (Gốc) & UI Mobile (Mới)
 */

const CART_STORAGE_KEY = 'fasco_cart_items';

const DEFAULT_CART = [
  {
    id: 'prod-1',
    name: 'Mini Dress With Ruffled Straps',
    price: 14.90,
    quantity: 1,
    color: 'Red',
    image: './assets/img/baaodo.png'
  }
];

let removedItemsHistory = [];

function getCart() {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  return data ? JSON.parse(data) : DEFAULT_CART;
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function formatCurrency(amount) {
  return `$${parseFloat(amount).toFixed(2)}`;
}

export function initCartEvents() {
  let cartContainer = document.getElementById('cart-table-body');
  if (!cartContainer) return;

  function updateSummary() {
    const cart = getCart();
    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Đồng bộ checkbox giữa Mobile và PC
    const wrapCheckboxes = document.querySelectorAll('.sync-wrap-cb');
    let isChecked = Array.from(wrapCheckboxes).some(cb => cb.checked);

    if (isChecked) {
      subtotal += 10.00;
      wrapCheckboxes.forEach(cb => cb.checked = true);
    } else {
      wrapCheckboxes.forEach(cb => cb.checked = false);
    }

    // Cập nhật giá tiền vào cả Mobile và PC
    const subtotalEls = document.querySelectorAll('.sync-subtotal-val');
    subtotalEls.forEach(el => el.textContent = formatCurrency(subtotal));
  }

  // Gắn sự kiện cho các checkbox bọc quà
  document.querySelectorAll('.sync-wrap-cb').forEach(cb => {
    cb.addEventListener('change', updateSummary);
  });

  function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
      cartContainer.innerHTML = `<p class="text-center font-volkhov text-xl mt-10">Your shopping cart is empty.</p>`;
      updateSummary();
      return;
    }

    cartContainer.innerHTML = cart.map(item => {
      const itemTotal = item.price * item.quantity;
      const formattedQty = item.quantity < 10 ? `0${item.quantity}` : item.quantity;

      return `
        <div class="cart-item-row w-full" data-id="${item.id}">
            
            <!-- ================= GIAO DIỆN DESKTOP (Giữ nguyên 100% lề và class cũ) ================= -->
            <div class="hidden lg:flex justify-between w-full items-center">
                <div class="col-span-5 flex w-[368px] h-[224px] items-start space-x-4 mr-5">
                    <img src="${item.image}" alt="${item.name}" class="w-[168px] h-[225px] mr-5 object-cover flex-shrink-0" />
                    <div class="flex flex-col justify-between">
                        <div class="flex flex-cols">
                            <h3 class="font-volkhov font-normal flex w-[176px] h-[56px] text-xl font-bold text-black mr-11 leading-snug">
                                ${item.name}
                            </h3>
                            <div class="col-span-2 font-volkhov font-normal text-xl text-black mr-[310px]">
                                ${formatCurrency(item.price)}
                            </div>
                            <div class="col-span-3 flex justify-center mr-[290px]">
                                <div class="inline-flex items-center justify-between m-auto border border-8a8a8a rounded px-3 py-1 w-30 h-11 text-xl font-volkhov">
                                    <button data-action="decrease" class="text-[#171717] hover:text-gray-400 cursor-pointer">-</button>
                                    <span class="text-[#8a8a8a] select-none">${formattedQty}</span>
                                    <button data-action="increase" class="text-[#171717] hover:text-gray-400 cursor-pointer">+</button>
                                </div>
                            </div>
                            <div class="col-span-2 text-right font-volkhov font-bold text-xl text-black">
                                ${formatCurrency(itemTotal)}
                            </div>
                        </div>
                        <p class="text-xl font-poppins text-[#8a8a8a] my-4">Color : ${item.color}</p>
                        <button data-action="remove" class="text-xl text-[#8a8a8a] font-poppins underline hover:text-black text-left transition-colors w-max mt-4 cursor-pointer">
                            Remove
                        </button>
                    </div>
                </div>
            </div>

            <!-- ================= GIAO DIỆN MOBILE (Theo đúng ảnh bạn gửi) ================= -->
            <div class="flex lg:hidden flex-col w-full bg-white rounded-lg mb-4">
                <div class="flex items-start space-x-4 mb-4">
                    <img src="${item.image}" alt="${item.name}" class="w-[90px] h-[120px] object-cover rounded-md flex-shrink-0" />
                    <div class="flex flex-col mt-1">
                        <h3 class="font-volkhov font-bold text-base text-black leading-snug mb-1">
                            ${item.name}
                        </h3>
                        <p class="text-sm font-poppins text-[#8a8a8a] mb-2">Color : ${item.color}</p>
                        <button data-action="remove" class="text-sm text-[#5a7684] underline hover:text-black text-left transition-colors cursor-pointer">
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
                            <button data-action="decrease" class="text-black hover:text-gray-400 font-bold text-sm cursor-pointer">-</button>
                            <span class="text-black text-sm font-poppins select-none">${formattedQty}</span>
                            <button data-action="increase" class="text-black hover:text-gray-400 font-bold text-sm cursor-pointer">+</button>
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

  // Bắt sự kiện bấm Tăng/Giảm/Xóa
  cartContainer.onclick = (e) => {
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.getAttribute('data-action');
    let cart = getCart();

    const row = actionBtn.closest('.cart-item-row');
    if (!row) return;

    const itemId = row.getAttribute('data-id');
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease' && item.quantity > 1) {
      item.quantity -= 1;
    } else if (action === 'remove') {
      cart = cart.filter(i => i.id !== itemId);
    }

    saveCart(cart);
    renderCart();
  };

  renderCart();
}