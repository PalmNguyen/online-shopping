# ☕ Elite Food Restaurant & Coffee - Website

Dự án thiết kế & phát triển website nhà hàng - quán cà phê dựa trên thiết kế Figma **Elite - Food Restaurant - Coffee**.

* **Figma Template:** [Link Figma](https://www.figma.com/design/nqrruaorziUuHMjzz773DG/Elite---Food-Restaurant---Coffee-Free-Figma-Template--Community---Community-?node-id=308-10309)
* **Công nghệ sử dụng:** HTML5, Tailwind CSS, JavaScript (ES6), Git/GitHub.

---

## 🎨 1. Design System (Quy chuẩn Thiết kế)

### 🔴 Bảng màu (Color Palette)

#### 1. Màu thương hiệu (Brand Colors - Cà phê / Vàng kim)
* `brand-100`: `#FFF7ED`
* `brand-300`: `#FDE68A`
* `brand-500`: `#D4AF37` *(Màu chủ đạo chính)*
* `brand-600`: `#B49127`
* `brand-700`: `#8C6D18`

#### 2. Màu nhấn (Accent Colors - Điểm nhấn UI/Button)
* `accent-100`: `#FEF3C7`
* `accent-300`: `#FCD34D`
* `accent-500`: `#F59E0B` *(Màu nhấn chính)*
* `accent-600`: `#D97706`
* `accent-700`: `#B45309`

#### 3. Màu chữ (Ink) & Muted
* `ink-100`: `#FAFAFA` | `ink-300`: `#D4D4D8` | `ink-500`: `#71717A` | `ink-700`: `#3F3F46` | `ink-900`: `#18181B`
* `muted-300`: `#D4D4D8` | `muted-400`: `#A1A1AA` | `muted-500`: `#71717A` | `muted-600`: `#52525B`

#### 4. Đường viền (Line) & Bề mặt (Surface)
* `line-100`: `#F4F4F5` | `line-200`: `#E4E4E7` | `line-300`: `#D4D4D8` | `line-700`: `#3F3F46`
* `surface-50`: `#FAFAFA` | `surface-100`: `#F4F4F5` | `surface-200`: `#E4E4E7` | `surface-900`: `#111111` | `surface-950`: `#0A0A0A`

---

### 🔤 2. Font chữ & Cỡ chữ (Typography)

* **Font Tiêu đề (Display):** `"Playfair Display"`, serif, system-ui
* **Font Văn bản (Body):** `"Inter"`, sans-serif, system-ui

#### Kích thước Heading
* `h1`: `48px` (`text-[48px]`)
* `h2`: `36px` (`text-[36px]`)
* `h3`: `28px` (`text-[28px]`)

#### Kích thước Body
* `text-lg`: `20px`
* `text-base`: `16px`
* `text-sm`: `14px`
* `text-xs`: `12px`

---

### 📐 3. Bo góc (Border Radius) & Spacing

* **Radius Card:** `0.875rem` (14px)
* **Radius Pill (Button/Badge):** `0.5rem` (8px)
* **Padding Dọc Section:** `96px` (`py-section` / `py-[96px]`)

#### Bảng Quy Đổi Tailwind CSS
| Figma | Tailwind CSS Class |
| :--- | :--- |
| `2px` | `rounded-sm` |
| `4px` | `rounded` |
| `6px` | `rounded-md` |
| `8px` | `rounded-lg` *(Pill)* |
| `12px` | `rounded-xl` |
| `14px` | `rounded-card` *(0.875rem)* |
| `16px` | `rounded-2xl` |
| `24px` | `rounded-3xl` |
| `999px` | `rounded-full` |

---

## 👥 4. Phân công Công việc (Task Division)

| Thành viên | Trang phụ trách | Tính năng JS phụ trách |
| :--- | :--- | :--- |
| **Thành viên A** | Trang chủ (Home), Về chúng tôi (About) | Responsive Navigation Menu (Mobile Menu), Banner Slider |
| **Thành viên B** | Thực đơn (Menu), Chi tiết món | Bộ lọc danh mục (Cà phê/Trà/Bánh), Slider ảnh không gian |
| **Thành viên C** | Đặt bàn (Reservation), Liên hệ, Tin tức | Validate Form Đặt bàn & Form Liên hệ |

---

## 🛠️ 5. Quy trình Git & Workflow

1. **Không push trực tiếp vào `main`.**
2. Trước khi làm task mới, luôn lấy code mới nhất từ `main`:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/ten-tinh-nang