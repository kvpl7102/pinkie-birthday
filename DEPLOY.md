# Hướng dẫn Deploy lên GitHub Pages

## Vấn đề đã sửa

Khi deploy Next.js lên GitHub Pages với repository name (không phải `username.github.io`), các đường dẫn hình ảnh bị sai:

- ❌ `https://username.github.io/img/...` (sai)
- ✅ `https://username.github.io/pinkie-birthday/img/...` (đúng)

## Nguyên nhân

Next.js Image component với `unoptimized: true` **KHÔNG tự động** thêm `basePath` vào image paths. Chỉ có CSS/JS files trong `_next/` mới được tự động xử lý.

**Tại sao desktop có cache nhưng mobile không?**
- Desktop browser có cache mạnh hơn → có thể vẫn hiển thị ảnh từ localhost cũ
- Mobile browser thường clear cache thường xuyên hơn → lỗi thể hiện rõ ràng

## Các thay đổi đã thực hiện

1. **Cấu hình [`next.config.js`](next.config.js:1)**:
   - Thêm `output: 'export'` để export static files
   - Thêm `basePath` và `assetPrefix` với `/pinkie-birthday`
   - Bật `images.unoptimized` cho static export

2. **Tạo helper function [`src/app/utils/paths.ts`](src/app/utils/paths.ts:1)**:
   - Function `getImagePath()` tự động thêm basePath khi production
   - Giữ nguyên path khi development

3. **Cập nhật [`src/app/components/HorizontalCarousel.tsx`](src/app/components/HorizontalCarousel.tsx:1)**:
   - Import và sử dụng `getImagePath()` cho tất cả images
   - Đảm bảo mọi image path đều có basePath khi deploy

4. **Tạo GitHub Actions workflow** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml:1)):
   - Tự động build và deploy khi push lên `main` branch
   - Sử dụng `actions/deploy-pages@v4`

5. **Tạo [`public/.nojekyll`](public/.nojekyll:1)**:
   - Ngăn GitHub Pages bỏ qua các file Next.js (bắt đầu với `_`)

6. **Cập nhật [`.gitignore`](.gitignore:1)**:
   - Thêm folder `out` và các build files khác

## Cách deploy

### Bước 1: Cấu hình GitHub Repository

1. Vào repository trên GitHub: `https://github.com/kvpl7102/pinkie-birthday`
2. Chọn **Settings** → **Pages**
3. Trong phần **Build and deployment**:
   - **Source**: Chọn **GitHub Actions**
4. Lưu lại

### Bước 2: Push code lên GitHub

```bash
git add .
git commit -m "Fix image paths for GitHub Pages deployment"
git push origin main
```

### Bước 3: Kiểm tra deployment

1. Vào tab **Actions** trên GitHub
2. Xem workflow "Deploy to GitHub Pages" đang chạy
3. Sau khi hoàn tất (✅), website sẽ có tại:
   - **URL**: `https://kvpl7102.github.io/pinkie-birthday/`

## Test local trước khi deploy

```bash
# Build với production mode
npm run build

# Serve static files để test
npx serve@latest out
```

Sau đó mở: `http://localhost:3000/pinkie-birthday/`

## Về folder `out`

**CÓ, bạn NÊN thêm `out` vào `.gitignore`!**

- Folder `out` là **build output** - được tạo tự động
- GitHub Actions sẽ tự động build lại khi deploy
- **KHÔNG ảnh hưởng** đến deployment

Nếu đã commit `out` trước đó, xóa khỏi Git:
```bash
git rm -r --cached out
git add .gitignore  
git commit -m "Remove out folder from Git tracking"
git push origin main
```

## Lưu ý

- ✅ Hình ảnh giờ sẽ hiển thị đúng trên cả mobile và desktop
- ✅ Helper function tự động xử lý basePath cho images  
- ✅ Mỗi lần push lên `main` branch sẽ tự động deploy
- ✅ Có thể deploy thủ công từ tab **Actions** → **Deploy to GitHub Pages** → **Run workflow**

## Kiểm tra kết quả

Sau khi deploy, mở browser console (F12) và kiểm tra:
```javascript
// Image paths phải có basePath
document.querySelector('img').src
// Kết quả phải là: "https://kvpl7102.github.io/pinkie-birthday/img/..."