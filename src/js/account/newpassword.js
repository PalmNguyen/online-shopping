window.initNewPasswordEvents = function () {
  const newPasswordForm = document.getElementById("new-password-form");
  const passwordInput = document.getElementById("new-password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const messageEl = document.getElementById("password-message");

  if (!newPasswordForm) return;

  // Hàm hiển thị thông báo trên UI
  function showMessage(text, isError = true) {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.classList.remove("hidden", "text-red-500", "text-green-600");
    messageEl.classList.add(isError ? "text-red-500" : "text-green-600");
  }

  // Hàm xóa thông báo lỗi
  function clearError() {
    if (messageEl) messageEl.classList.add("hidden");
    if (passwordInput) passwordInput.classList.remove("border-red-500");
    if (confirmPasswordInput) confirmPasswordInput.classList.remove("border-red-500");
  }

  // Lắng nghe sự kiện người dùng nhập lại để ẩn lỗi
  if (passwordInput) passwordInput.oninput = clearError;
  if (confirmPasswordInput) confirmPasswordInput.oninput = clearError;

  // Xử lý Submit đổi mật khẩu
  newPasswordForm.onsubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();

    const passValue = passwordInput ? passwordInput.value.trim() : "";
    const confirmPassValue = confirmPasswordInput ? confirmPasswordInput.value.trim() : "";

    clearError();

    // 1. Kiểm tra để trống
    if (!passValue || !confirmPassValue) {
      showMessage("Vui lòng nhập đầy đủ mật khẩu mới và xác nhận!");
      if (!passValue && passwordInput) passwordInput.classList.add("border-red-500");
      if (!confirmPassValue && confirmPasswordInput) confirmPasswordInput.classList.add("border-red-500");
      return false;
    }

    // 2. Kiểm tra độ dài mật khẩu (ít nhất 6 ký tự)
    if (passValue.length < 6) {
      showMessage("Mật khẩu phải chứa ít nhất 6 ký tự!");
      if (passwordInput) passwordInput.classList.add("border-red-500");
      return false;
    }

    // 3. Kiểm tra mật khẩu nhập lại có khớp không
    if (passValue !== confirmPassValue) {
      showMessage("Mật khẩu xác nhận không khớp!");
      if (confirmPasswordInput) confirmPasswordInput.classList.add("border-red-500");
      return false;
    }

    // --- CẬP NHẬT MẬT KHẨU THÀNH CÔNG ---
    // Xóa dữ liệu OTP tạm trong sessionStorage
    sessionStorage.removeItem("resetPasswordData");

    showMessage("Đặt lại mật khẩu thành công! Đang chuyển hướng...", false);

    // Chuyển hướng về trang Sign In (hoặc Home) sau 1.5 giây
    setTimeout(() => {
      window.history.pushState({}, "", "?page=home");
      if (typeof window.renderPage === "function") {
        window.renderPage();
      }
    }, 1500);

    return false;
  };
};