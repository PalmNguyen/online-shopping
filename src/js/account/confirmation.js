export function initConfirmationEvents() {
  const confirmForm = document.getElementById("confirmation-form");
  const codeInput = document.getElementById("confirmation-code");
  const resendBtn = document.getElementById("resend-btn");
  const otpMsg = document.getElementById("otp-message");

  if (!confirmForm) return;

  const resetDataRaw = sessionStorage.getItem("resetPasswordData");
  const resetData = resetDataRaw ? JSON.parse(resetDataRaw) : null;

  let countdownTimer = null;
  const COOLDOWN_TIME = 30;

  // Hàm hiển thị thông báo ngay trên UI
  function showMessage(text, isError = true) {
    if (!otpMsg) return;
    otpMsg.textContent = text;
    otpMsg.classList.remove("hidden", "text-red-500", "text-green-600");
    otpMsg.classList.add(isError ? "text-red-500" : "text-green-600");
  }

  // Hàm đếm ngược Resend
  function startResendCountdown() {
    if (!resendBtn) return;

    let timeLeft = COOLDOWN_TIME;
    resendBtn.disabled = true;
    resendBtn.classList.add("opacity-50", "cursor-not-allowed", "no-underline");

    if (countdownTimer) clearInterval(countdownTimer);
    resendBtn.textContent = `Resend in ${timeLeft}s`;

    countdownTimer = setInterval(() => {
      timeLeft--;
      if (timeLeft > 0) {
        resendBtn.textContent = `Resend in ${timeLeft}s`;
      } else {
        clearInterval(countdownTimer);
        resendBtn.disabled = false;
        resendBtn.textContent = "Resend Now";
        resendBtn.classList.remove("opacity-50", "cursor-not-allowed", "no-underline");
      }
    }, 1000);
  }

  // Khởi chạy đếm ngược lần đầu & hiển thị gợi ý OTP giả lập
  startResendCountdown();
  if (resetData && resetData.code) {
    showMessage(`Mã OTP thử nghiệm của bạn là: ${resetData.code}`, false);
  }

  // Xử lý khi click Resend
  if (resendBtn) {
    resendBtn.onclick = function (e) {
      e.preventDefault();
      if (resendBtn.disabled) return;

      startResendCountdown();

      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      if (resetData) {
        resetData.code = newCode;
        sessionStorage.setItem("resetPasswordData", JSON.stringify(resetData));
      }

      showMessage(`Mã OTP mới của bạn là: ${newCode}`, false);
    };
  }

  // Xử lý Submit kiểm tra mã
  confirmForm.onsubmit = function (e) {
    e.preventDefault();
    e.stopPropagation();

    const enteredCode = codeInput ? codeInput.value.trim() : "";

    if (!enteredCode) {
      showMessage("Vui lòng nhập mã xác nhận!");
      return false;
    }

    if (!resetData || !resetData.code) {
      showMessage("Phiên làm việc đã hết hạn. Đang quay lại trang trước...");
      setTimeout(() => {
        window.history.pushState({}, "", "?page=forget-password");
        if (typeof window.renderPage === "function") window.renderPage();
      }, 1500);
      return false;
    }

    if (enteredCode === resetData.code) {
      if (countdownTimer) clearInterval(countdownTimer);
      showMessage("Xác nhận thành công! Đang chuyển trang...", false);
      
      setTimeout(() => {
        window.history.pushState({}, "", "?page=new-password");
        if (typeof window.renderPage === "function") window.renderPage();
      }, 1000);
    } else {
      showMessage("Mã xác nhận không chính xác!");
    }

    return false;
  };
};