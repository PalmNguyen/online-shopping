# BÁO CÁO BÀI TẬP LỚN

**MÔN:** Thiết kế Web (INTE03010)

**Giảng viên phụ trách:** Võ Việt Khoa

**Tên đề tài:** Cửa hàng thời trang (E-commerce)

---

## 1. Thông tin Nhóm - Lớp: TH1007-IT2501
Danh sách thành viên (3 người):
1. Nguyễn Hoàng Thiên Phúc (Nhóm trưởng)
2. Huỳnh Phi Hùng
3. Bùi Trọng Sang

## 2. Liên kết dự án (Links)
* **Link Figma:** https://www.figma.com/design/FUdf8VcsUQcmQ8rCWdYpch/Online-Shopping-Website-Design---eCommerce-Store-Website---UI-Kit--Community-?node-id=0-1&p=f&m=draw
* **Link GitHub:** https://palmnguyen.github.io/online-shopping/

## 3. Cấu trúc thư mục (Folder Structure)
online-shopping/
├── dist/
├── node_modules/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   └── img/
│   ├── components/
│   │   ├── account/
│   │   │   ├── confirmation.html
│   │   │   ├── forget-password.html
│   │   │   ├── new-password.html
│   │   │   ├── sign-in.html
│   │   │   └── sign-up.html
│   │   ├── header/
│   │   │   ├── home.html
│   │   │   └── sub.html
│   │   ├── cartpage.html
│   │   ├── checkout.html
│   │   ├── homepage.html
│   │   ├── productpage.html
│   │   └── shoppage.html
│   ├── js/
│   └── style.css
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

## 4. Hệ Thống Màu Sắc (Color Palette)

### 4.1 Nền (Background Colors)
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

### 4.2 Màu Chữ (Text Colors)
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

## 5. Quy Định Kiểu Chữ (Typography)

### 5.1 Font Ink
| Font Family | Ứng dụng |
| :--- | :--- |
| **Poppins** | Navigation, footer, thông tin trang, button (sign in, buy now,...), text chung, timer,... |
| **Volkhov** | Tiêu đề lớn (Heading), tên khách hàng đánh giá, minicart (price, viewcart, subtotal), free ship,... |

### 5.2 Font Muted
| Font Family | Ứng dụng |
| :--- | :--- |
| **Jost** | Thời gian vận chuyển, sale, prod_form-buttons,... |