function initSignInEvents() {
    const signinForm = document.getElementById('signin-form');
    const emailInput = document.getElementById('signin-email');
    const passwordInput = document.getElementById('signin-password');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const errorMessage = document.getElementById('error-message');

    // Nếu không tìm thấy form trên trang thì dừng (tránh lỗi)
    if (!signinForm) return;

    // 1. Tính năng Ẩn / Hiện mật khẩu
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePasswordBtn.classList.toggle('text-black', isPassword);
            togglePasswordBtn.classList.toggle('text-gray-400', !isPassword);
        });
    }

    // 2. Xử lý Validate Form khi bấm Sign In
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Chặn reload/chuyển trang mặc định

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // Reset lỗi ban đầu
        errorMessage.classList.add('hidden');
        emailInput.classList.remove('border-red-500');
        passwordInput.classList.remove('border-red-500');

        // Kiểm tra 1: Để trống Email hoặc Password
        if (!emailValue || !passwordValue) {
            showError('Vui lòng nhập đầy đủ Email và Mật khẩu!');
            if (!emailValue) emailInput.classList.add('border-red-500');
            if (!passwordValue) passwordInput.classList.add('border-red-500');
            return;
        }

        // Kiểm tra 2: Format Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            showError('Định dạng Email không hợp lệ!');
            emailInput.classList.add('border-red-500');
            return;
        }

        // Kiểm tra 3: Độ dài Password
        if (passwordValue.length < 6) {
            showError('Mật khẩu phải chứa ít nhất 6 ký tự!');
            passwordInput.classList.add('border-red-500');
            return;
        }

        // --- ĐĂNG NHẬP THÀNH CÔNG ---
        window.location.href = '?page=home';
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
}