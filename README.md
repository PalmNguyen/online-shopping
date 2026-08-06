# ☕ Elite Food Restaurant & Coffee - Website

Dự án thiết kế & phát triển website nhà hàng - quán cà phê dựa trên thiết kế Figma **Elite - Food Restaurant - Coffee**.

* **Figma Template:** [Link Figma](https://www.figma.com/design/nqrruaorziUuHMjzz773DG/Elite---Food-Restaurant---Coffee-Free-Figma-Template--Community---Community-?node-id=308-10309)
* **Công nghệ sử dụng:** HTML5, Tailwind CSS, JavaScript (ES6), Git/GitHub.

---

## 🎨 1. Design System (Quy chuẩn Thiết kế)

### 🔴 Bảng màu (Color Palette)

#### 1. Màu thương hiệu (Brand Colors - Cà phê / Vàng kim)
--color-brand-100: #F7EBD9;
--color-brand-300: #E2C299;
--color-brand-500: #BC9A6C;
--color-brand-600: #9E7D51;
--color-brand-700: #7A5E39;

#### 2. Màu nhấn (Accent Colors - Điểm nhấn UI/Button)
--color-accent-100: #FDF3E7;
--color-accent-300: #F4C286;
--color-accent-500: #AF872F;
--color-accent-600: #8C6A21;
--color-accent-700: #684D14;

#### 3. Màu chữ (Ink) & Muted
--color-ink-100: #FFFFFF;
--color-ink-300: #E0E0E0;
--color-ink-500: #4F4F4F;
--color-ink-700: #1D1D1D;
--color-ink-900: #0D0D0D;

--color-muted-300: #E0E0E0;
--color-muted-400: #828282;
--color-muted-500: #4F4F4F;
--color-muted-600: #333333;

#### 4. Đường viền (Line) & Bề mặt (Surface)
--color-line-100: #F2F2F2;
--color-line-200: #E0E0E0;
--color-line-300: #BDBDBD;
--color-line-700: #4F4F4F;

--color-surface-50: #FFFFFF;
--color-surface-100: #F8F8F8;
--color-surface-200: #E5E5E5;
--color-surface-900: #1D1D1D;
--color-surface-950: #0D0D0D;



### 🔤 2. Font chữ & Cỡ chữ (Typography)

--font-display: "Miniver", "Great Vibes", cursive, sans-serif;
--font-body: "Inter", "Helvetica", system-ui, sans-serif;

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

Bo góc (1rem = 16px):
--radius-card: 0.5rem;
--radius-pill: 0.375rem;

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