# BÁO CÁO BÀI TẬP LỚN

**MÔN:** Thiết kế Web (INTE03010)
**Giảng viên phụ trách:** Võ Việt Khoa
**Tên đề tài:** Cửa hàng thời trang (E-commerce)

---

## 1. Giới thiệu dự án (Project Introduction)
Dự án là một website E-commerce thời trang (FASCO) được phát triển nhằm mô phỏng các chức năng cốt lõi của một nền tảng mua sắm trực tuyến. Website cung cấp trải nghiệm người dùng mượt mà với giao diện hiện đại, bao gồm các tính năng: xem sản phẩm, quản lý tài khoản, giỏ hàng (Cart) và thanh toán (Checkout).

---

## 2. Thông tin Nhóm - Lớp: TH1007-IT2501
Danh sách thành viên (3 người):
1. Nguyễn Hoàng Thiên Phúc (Nhóm trưởng) - Dựng cấu trúc thư mục, setup README, phát triển UI/Logic chung, login.
2. Huỳnh Phi Hùng - Phát triển giao diện & logic các trang tài khoản.
3. Bùi Trọng Sang - Rà soát hướng dẫn build/triển khai, phát triển module Cart & Checkout.

---

## 3. Liên kết dự án (Links)
* **Link Figma:** https://www.figma.com/design/FUdf8VcsUQcmQ8rCWdYpch/Online-Shopping-Website-Design---eCommerce-Store-Website---UI-Kit--Community-?node-id=0-1&p=f&m=draw
* **Link GitHub:** https://github.com/PalmNguyen/online-shopping.git
* **Link Live Demo:** https://online-shopping-iota-weld.vercel.app/

---

## 4. Công nghệ sử dụng (Tech Stack)
* **Build Tool:** Vite
* **UI/UX & Markup:** HTML5, Tailwind CSS
* **Scripting:** JavaScript (ES6 Modules)
* **Version Control & Hosting:** Git, GitHub, GitHub Pages / Vercel

---

## 5. Yêu cầu hệ thống (Prerequisites)
Để chạy dự án ở môi trường local, máy tính của bạn cần cài đặt:
* **Node.js:** phiên bản `18.x` trở lên
* **npm:** phiên bản `9.x` trở lên (đi kèm với Node.js)

---

## 6. Hướng dẫn Cài đặt, chạy Local và build

### Bước 1: Clone dự án về máy
```bash
git clone https://github.com/palmnguyen/online-shopping.git
cd online-shopping
```

### Bước 2: Cài đặt các thư viện (Dependencies)
```bash
npm install
```

### Bước 3: Chạy dự án ở môi trường phát triển (Lệnh chạy local)
```bash
npm run dev
```

### Bước 4: Đóng gói dự án (Lệnh build)
```bash
npm run build
```

---

## 7. Triển khai dự án (Deployment)
Quy trình triển khai kế thừa từ báo cáo nhóm 14, sử dụng GitHub và Vercel để tự động hóa:
1. Đảm bảo toàn bộ mã nguồn hoàn thiện đã được push lên nhánh main trên GitHub.
2. Nền tảng Vercel đã được kết nối với repository này.
3. Mỗi khi có commit mới đẩy lên nhánh main, Vercel sẽ tự động kích hoạt tiến trình chạy lệnh npm run build và public website cập nhật lên đường dẫn Live Demo.

---

## 8. Mô tả các Module chức năng chính
Đặc biệt đối với Module Cart / Checkout (Do Sang phụ trách):
* **Cart (Giỏ hàng): Quản lý trạng thái giỏ hàng của người dùng. Cho phép thêm sản phẩm, điều chỉnh số lượng (tăng/giảm), xóa sản phẩm khỏi giỏ, và tự động tính toán tổng tiền thanh toán tạm tính. Dữ liệu được quản lý linh hoạt qua LocalStorage hoặc State.
* **Checkout (Thanh toán): Cung cấp biểu mẫu (form) điền thông tin giao hàng. Xử lý xác thực dữ liệu đầu vào (Validation form) đảm bảo người dùng nhập đúng thông tin, hiển thị tóm tắt đơn hàng (Order Summary) và giả lập quy trình xác nhận đặt hàng thành công.

---

## 9. Cấu trúc thư mục (Folder Structure)

```text
online-shopping/
├── public/
│   ├── assets/
│   │   ├── fonts/
│   │   │   └── DigitalNumbers400.ttf
│   │   └── img/
│   └── components/
│       ├── account/
│       │   ├── confirmation.html
│       │   ├── forget-password.html
│       │   ├── new-password.html
│       │   ├── sign-in.html
│       │   └── sign-up.html
│       ├── header/
│       │   ├── home.html
│       │   └── sub.html
│       ├── cartpage.html
│       ├── checkout.html
│       ├── homepage.html
│       ├── productpage.html
│       └── shoppage.html
├── src/
│   ├── js/
│   │   └── account/
│   │       ├── confirmation.js
│   │       ├── forgetpassword.js
│   │       ├── newpassword.js
│   │       ├── signin.js
│   │       └── signup.js
│   └── style.css
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

---

## 10. Hệ Thống Màu Sắc (Color Palette)

### 10.1 Nền (Background Colors)
| Vị trí / Thuộc tính | Mã Hex |
| :--- | :--- |
| **Nền chính** (Background toàn trang) | `#FFFFFF` |
| **Nền phụ:** Nút bấm (Sign up, See more, Buy now,...), Nền lựa chọn | `#000000` |
| **Nền phụ:** Khối thời gian Sale | `#F8CCCC` |
| **Nền phụ:** Khối thông tin Sale | `#da3f3f` |
| **Nền phụ:** Khu vực logo nhà tài trợ | `#f8f8f8` |
| **Nền phụ:** Khung mô tả thông tin sản phẩm | `#dadada` |
| **Nền phụ:** Vùng chọn số lượng sản phẩm | `#f1f1f1` |
| **Nền lựa chọn (khác)** | `#f3f3f3` |

### 10.2 Màu Chữ (Text Colors)
#### Chữ Chính
| Vị trí / Thuộc tính | Mã Hex |
| :--- | :--- |
| **Tiêu đề** | `#484848` |
| **Page Info** | `#8a8a8a` |
| **Home page:** Tên sản phẩm, giá, số lượt bán, timer,... | `#484848` |
| **Shop page:** Tên sản phẩm, giá,... | `#000000` |
| **Filters:** Heading | `#000000` |
| **Filters:** Options | `#8a8a8a` |
| **Filters:** Option trong mục tags | `#777777` |
| **Product page:** Thời gian sale | `#ff706b` |
| **Product page:** Số lượng sản phẩm | `#666666` |

#### Chữ Phụ
| Vị trí / Thuộc tính | Mã Hex |
| :--- | :--- |
| **Trong nút background đen** | `#FFFFFF` |
| **Gợi ý điền form (Home page):** Email, tên,... | `#8a8a8a` |
| **Gợi ý điền form (Sign in page):** Email, tên,... | `#9d9d9d` |
| **Description (Mô tả sản phẩm)** | `#767676` |
| **Giá, tên, free ship** | `#000000` |
| **Đánh giá khách hàng:** Comment, tên, vai trò,... | `#484848` |
| **Liên kết (Links):** Login, resent now,... | `#5B86E5` |
| **Trạng thái sản phẩm (còn/hết hàng)** | `#ff4646` |

---

## 11. Quy Định Kiểu Chữ (Typography)

### 11.1 Font Ink
| Font Family | Ứng dụng |
| :--- | :--- |
| **Poppins** | Navigation, footer, thông tin trang, button (sign in, buy now,...), text chung, timer,... |
| **Volkhov** | Tiêu đề lớn (Heading), tên khách hàng đánh giá, minicart (price, viewcart, subtotal), free ship,... |

### 11.2 Font Muted
| Font Family | Ứng dụng |
| :--- | :--- |
| **Jost** | Thời gian vận chuyển, sale, prod_form-buttons,... |

---

## 12. Quy ước Commit (Commit Convention)
* Nhóm thống nhất sử dụng quy ước commit: (Fix, Cap nhat, Them,...) + tính năng trang đã thay đổi + tiến độ hoàn thành (Vd: Them tinh nang js phan account (90%))