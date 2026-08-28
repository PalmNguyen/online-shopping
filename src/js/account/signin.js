function initSignInEvents() {
    const signinForm = document.getElementById('signin-form');
    const emailInput = document.getElementById('signin-email');
    const passwordInput = document.getElementById('signin-password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const errorMessage = document.getElementById('error-message');

    if (!signinForm) return;

    // 1. Tính năng Ẩn / Hiện mật khẩu
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.onclick = function() {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePasswordBtn.classList.toggle('text-black', isPassword);
            togglePasswordBtn.classList.toggle('text-gray-400', !isPassword);
        };
    }

    // 2. Xóa lỗi khi người dùng gõ lại dữ liệu
    const clearError = () => {
        if (errorMessage) errorMessage.classList.add('hidden');
        if (emailInput) emailInput.classList.remove('border-red-500');
        if (passwordInput) passwordInput.classList.remove('border-red-500');
    };

    if (emailInput) emailInput.oninput = clearError;
    if (passwordInput) passwordInput.oninput = clearError;

    // 3. Xử lý Submit Sign In
    signinForm.onsubmit = function(e) {
        e.preventDefault();
        e.stopPropagation();

        const emailValue = emailInput ? emailInput.value.trim() : '';
        const passwordValue = passwordInput ? passwordInput.value.trim() : '';

        clearError();

        // Kiểm tra 1: Để trống
        if (!emailValue || !passwordValue) {
            showError('Vui lòng nhập đầy đủ Email và Mật khẩu!');
            if (!emailValue && emailInput) emailInput.classList.add('border-red-500');
            if (!passwordValue && passwordInput) passwordInput.classList.add('border-red-500');
            return false;
        }

        // Kiểm tra 2: Format Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            showError('Định dạng Email không hợp lệ!');
            if (emailInput) emailInput.classList.add('border-red-500');
            return false;
        }

        // Kiểm tra 3: Độ dài Password
        if (passwordValue.length < 6) {
            showError('Mật khẩu phải chứa ít nhất 6 ký tự!');
            if (passwordInput) passwordInput.classList.add('border-red-500');
            return false;
        }

        // --- ĐĂNG NHẬP THÀNH CÔNG ---
        // Chuyển sang trang Home thông qua Router
        window.history.pushState({}, '', '?page=home');
        if (typeof window.renderPage === 'function') {
            window.renderPage();
        }

        return false;
    };

    function showError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.classList.remove('hidden');
        }
    }
}