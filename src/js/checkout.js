/**
 * FASCO Checkout Module (Hỗ trợ 2 giao diện song song)
 * File: src/js/checkout.js
 */

const CART_STORAGE_KEY = 'fasco_cart_items';

export function initCheckoutEvents() {
    initFormValidation();
    initDiscountLogic();
    initSubscribeForm();
}

function removeErrorBubbles() {
    document.querySelectorAll('.checkout-error-bubble').forEach(el => el.remove());
}

function showErrorOnField(field) {
    removeErrorBubbles();
    const parent = field.parentElement;
    if (window.getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
    }

    const bubble = document.createElement('div');
    bubble.className = 'checkout-error-bubble absolute z-50 flex items-center space-x-2 bg-white border border-gray-300 rounded-[6px] px-3 py-2 shadow-xl text-xs font-sans pointer-events-none transition-all';

    const topPos = field.offsetTop + field.offsetHeight + 6;
    const leftPos = field.offsetLeft + 12;

    bubble.style.top = `${topPos}px`;
    bubble.style.left = `${leftPos}px`;
    bubble.innerHTML = `
    <div class="absolute -top-[6px] left-4 w-2.5 h-2.5 bg-white border-t border-l border-gray-300 rotate-45"></div>
    <div class="w-4 h-4 bg-[#e65100] text-white font-bold text-[10px] flex items-center justify-center rounded-[2px] flex-shrink-0 z-10">!</div>
    <span class="z-10 font-medium whitespace-nowrap text-[#222]">Please fill out this field.</span>
    `;

    parent.appendChild(bubble);
    field.focus();

    const handleInput = () => {
        bubble.remove();
        field.removeEventListener('input', handleInput);
        field.removeEventListener('change', handleInput);
    };
    field.addEventListener('input', handleInput);
    field.addEventListener('change', handleInput);
}

// Lắng nghe sự kiện click trên *TẤT CẢ* các nút Pay Now (Cả PC lẫn Mobile)
function initFormValidation() {
    const payNowBtns = document.querySelectorAll('.btn-pay-now');

    payNowBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Tìm khung form đang hiển thị (chứa nút Pay Now vừa bấm)
            const container = btn.closest('.checkout-form-container');
            if (!container) return;

            const requiredSelectors = [
                'input[placeholder="Email Address"]',
                'select',
                'input[placeholder="First Name"]',
                'input[placeholder="Last Name"]',
                'input[placeholder="Address"]',
                'input[placeholder="City"]',
                'input[placeholder="Postal Code"]',
                'input[placeholder="Card Number"]',
                'input[placeholder="Expiration Date"]',
                'input[placeholder="Security Code"]',
                'input[placeholder="Card Holder Name"]'
            ];

            let firstInvalidField = null;

            for (const selector of requiredSelectors) {
                const field = container.querySelector(selector);
                if (!field) continue;

                const val = field.value ? field.value.trim() : '';

                if (field.tagName.toLowerCase() === 'select') {
                    if (!val || val === 'Country / Region') {
                        firstInvalidField = field;
                        break;
                    }
                } else if (!val) {
                    firstInvalidField = field;
                    break;
                }
            }

            if (firstInvalidField) {
                showErrorOnField(firstInvalidField);
                return;
            }

            removeErrorBubbles();
            alert('Payment Successful! Thank you for shopping with FASCO.');
            localStorage.removeItem(CART_STORAGE_KEY);
            window.location.href = '?page=home';
        });
    });
}

// Hỗ trợ mã giảm giá cho cả 2 giao diện
function initDiscountLogic() {
    const discountBtns = document.querySelectorAll('.btn-apply-discount');

    discountBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const container = btn.closest('.discount-container');
            if (!container) return;

            const input = container.querySelector('input');
            const code = input ? input.value.trim().toUpperCase() : '';

            if (!code) {
                alert('Please enter a discount code.');
                return;
            }

            if (code === 'FASCO10') {
                alert('Discount code FASCO10 applied successfully!');
            } else {
                alert('Invalid discount code.');
            }
        });
    });
}

function initSubscribeForm() {
    const subscribeForm = document.querySelector('section form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = subscribeForm.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                alert('Subscribed successfully!');
                emailInput.value = '';
            }
        });
    }
}