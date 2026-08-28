export function initSignUpEvents() {
  const signupForm = document.getElementById("signup-form");
  const firstNameInput = document.getElementById("signup-firstname");
  const lastNameInput = document.getElementById("signup-lastname");
  const emailInput = document.getElementById("signup-email");
  const phoneInput = document.getElementById("signup-phone");
  const passwordInput = document.getElementById("signup-password");
  const confirmPasswordInput = document.getElementById("signup-confirm-password");
  const errorMessage = document.getElementById("signup-error-message");

  if (!signupForm) return;

  // Hàm hiển thị thông báo lỗi/thành công
  function showError(text, isError = true) {
    if (!errorMessage) return;
    errorMessage.textContent = text;
    errorMessage.classList.remove("hidden", "text-red-500", "text-green-600");
    errorMessage.classList.add(isError ? "text-red-500" : "text-green-600");
  }

  // Hàm xóa các highlight lỗi đỏ trên input
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

  // Lắng nghe sự kiện gõ phím để xóa lỗi chủ động
  [
    firstNameInput,
    lastNameInput,
    emailInput,
    phoneInput,
    passwordInput,
    confirmPasswordInput,
  ].forEach((input) => {
    if (input) input.oninput = clearErrors;
  });

  // Xử lý khi Submit Form đăng ký
  signupForm.onsubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();

    clearErrors();

    const firstName = firstNameInput ? firstNameInput.value.trim() : "";
    const lastName = lastNameInput ? lastNameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value.trim() : "";
    const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value.trim() : "";

    // 1. Kiểm tra trường trống
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      showError("Vui lòng điền đầy đủ tất cả các thông tin!");
      if (!firstName && firstNameInput) firstNameInput.classList.add("border-red-500");
      if (!lastName && lastNameInput) lastNameInput.classList.add("border-red-500");
      if (!email && emailInput) emailInput.classList.add("border-red-500");
      if (!phone && phoneInput) phoneInput.classList.add("border-red-500");
      if (!password && passwordInput) passwordInput.classList.add("border-red-500");
      if (!confirmPassword && confirmPasswordInput) confirmPasswordInput.classList.add("border-red-500");
      return false;
    }

    // 2. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("Định dạng Email không hợp lệ!");
      if (emailInput) emailInput.classList.add("border-red-500");
      return false;
    }

    // 3. Validate Số điện thoại (Chỉ chứa số, 9-11 ký tự)
    const phoneRegex = /^[0-9]{9,11}$/;
    if (!phoneRegex.test(phone)) {
      showError("Số điện thoại không hợp lệ (phải từ 9-11 chữ số)!");
      if (phoneInput) phoneInput.classList.add("border-red-500");
      return false;
    }

    // 4. Validate Mật khẩu (ít nhất 6 ký tự)
    if (password.length < 6) {
      showError("Mật khẩu phải chứa ít nhất 6 ký tự!");
      if (passwordInput) passwordInput.classList.add("border-red-500");
      return false;
    }

    // 5. Kiểm tra Mật khẩu nhập lại
    if (password !== confirmPassword) {
      showError("Mật khẩu xác nhận không khớp!");
      if (confirmPasswordInput) confirmPasswordInput.classList.add("border-red-500");
      return false;
    }

    // --- ĐĂNG KÝ THÀNH CÔNG ---
    // Lưu tạm thông tin tài khoản vừa đăng ký (nếu cần)
    const newUser = { firstName, lastName, email, phone };
    localStorage.setItem("userAccount", JSON.stringify(newUser));

    showError("Đăng ký tài khoản thành công! Đang chuyển đến trang đăng nhập...", false);

    setTimeout(() => {
      window.history.pushState({}, "", "?page=sign-in");
      if (typeof window.renderPage === "function") {
        window.renderPage();
      }
    }, 1500);

    return false;
  };
};