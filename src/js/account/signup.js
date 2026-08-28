document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const firstNameInput = document.getElementById("signup-firstname");
    const lastNameInput = document.getElementById("signup-lastname");
    const emailInput = document.getElementById("signup-email");
    const phoneInput = document.getElementById("signup-phone");
    const passwordInput = document.getElementById("signup-password");
    const confirmPasswordInput = document.getElementById("signup-confirm-password");
    const errorMessage = document.getElementById("signup-error-message");

    if (!signupForm) return;

    // Hiển thị thông báo
    function showMessage(text, isError = true) {
        if (!errorMessage) return;
        errorMessage.textContent = text;
        errorMessage.classList.remove("hidden", "text-red-500", "text-green-600");
        errorMessage.classList.add(isError ? "text-red-500" : "text-green-600");
    }

    // Xóa các trạng thái lỗi
    function clearErrors() {
        if (errorMessage) errorMessage.classList.add("hidden");
        const inputs = [
            firstNameInput,
            lastNameInput,
            emailInput,
            phoneInput,
            passwordInput,
            confirmPasswordInput,
        ];
        inputs.forEach((input) => {
            if (input) input.classList.remove("border-red-500");
        });
    }

    // Tự động xóa lỗi khi người dùng bắt đầu gõ
    [
        firstNameInput,
        lastNameInput,
        emailInput,
        phoneInput,
        passwordInput,
        confirmPasswordInput,
    ].forEach((input) => {
        if (input) {
            input.addEventListener("input", clearErrors);
        }
    });

    // Validate form khi bấm Create Account
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        const firstName = firstNameInput ? firstNameInput.value.trim() : "";
        const lastName = lastNameInput ? lastNameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const password = passwordInput ? passwordInput.value.trim() : "";
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value.trim() : "";

        // 1. Kiểm tra các ô trống
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            showMessage("Vui lòng nhập đầy đủ thông tin!");
            if (!firstName && firstNameInput) firstNameInput.classList.add("border-red-500");
            if (!lastName && lastNameInput) lastNameInput.classList.add("border-red-500");
            if (!email && emailInput) emailInput.classList.add("border-red-500");
            if (!phone && phoneInput) phoneInput.classList.add("border-red-500");
            if (!password && passwordInput) passwordInput.classList.add("border-red-500");
            if (!confirmPassword && confirmPasswordInput) confirmPasswordInput.classList.add("border-red-500");
            return;
        }

        // 2. Định dạng Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage("Email không hợp lệ!");
            if (emailInput) emailInput.classList.add("border-red-500");
            return;
        }

        // 3. Định dạng Số điện thoại (chỉ chứa số, độ dài 9-11 chữ số)
        const phoneRegex = /^[0-9]{9,11}$/;
        if (!phoneRegex.test(phone)) {
            showMessage("Số điện thoại không hợp lệ!");
            if (phoneInput) phoneInput.classList.add("border-red-500");
            return;
        }

        // 4. Mật khẩu tối thiểu 6 ký tự
        if (password.length < 6) {
            showMessage("Mật khẩu phải từ 6 ký tự trở lên!");
            if (passwordInput) passwordInput.classList.add("border-red-500");
            return;
        }

        // 5. Khớp mật khẩu xác nhận
        if (password !== confirmPassword) {
            showMessage("Mật khẩu xác nhận không khớp!");
            if (confirmPasswordInput) confirmPasswordInput.classList.add("border-red-500");
            return;
        }

        // Đăng ký thành công
        showMessage("Đăng ký thành công! Đang chuyển hướng...", false);

        setTimeout(() => {
            window.location.href = "?page=home";
        }, 1200);
    });
});