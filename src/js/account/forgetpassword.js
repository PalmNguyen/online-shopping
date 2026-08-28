export function initForgetPasswordEvents() {
  const forgetForm = document.getElementById("forget-password-form");
  if (!forgetForm) return;

  // Lắng nghe sự kiện submit form
  forgetForm.onsubmit = function (e) {
    // 1. Chặn reload trang mặc định
    e.preventDefault();
    e.stopPropagation();

    // 2. Lấy dữ liệu từ các ô input
    const firstName = document.getElementById("first-name")?.value.trim();
    const lastName = document.getElementById("last-name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();

    // 3. Kiểm tra validation cơ bản
    if (!firstName || !lastName || !email || !phone) {
      alert("Vui lòng điền đầy đủ các thông tin!");
      return false;
    }

    // Regex kiểm tra định dạng Email chuẩn
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không đúng định dạng!");
      return false;
    }

    // 4. Tạo mã xác nhận OTP ngẫu nhiên (6 chữ số)
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 5. Lưu thông tin người dùng vào Session Storage để dùng ở trang Confirmation
    const resetData = {
      fullName: `${firstName} ${lastName}`,
      email: email,
      phone: phone,
      code: generatedCode,
    };
    sessionStorage.setItem("resetPasswordData", JSON.stringify(resetData));

    // Thông báo cho người dùng (có hiện OTP giả lập để tiện test)
    alert(`Mã xác nhận đã gửi đến email: ${email}\n\n(Mã OTP thử nghiệm của bạn là: ${generatedCode})`);

    // 6. Chuyển sang trang confirmation mượt mà qua URL router
    window.history.pushState({}, "", "?page=confirmation");
    if (typeof window.renderPage === "function") {
      window.renderPage();
    }

    return false;
  };
}