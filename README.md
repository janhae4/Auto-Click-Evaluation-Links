# 🧠 Auto Click Evaluation Links - TDTU

Một script được viết cho [Tampermonkey](https://tampermonkey.net/) giúp **tự động đánh giá giảng viên** trên hệ thống Teaching Quality Survey của **Đại học Tôn Đức Thắng (TDTU)**.

> ✅ Đánh giá tự động 5 sao toàn bộ môn học chỉ bằng một cú click!

---

## 🚀 Tính năng

- Tự động tìm và click vào các môn **chưa đánh giá**
- Chọn **tự động mức 5 sao** cho tất cả các tiêu chí
- Nhấn **"Tiếp tục"** và **"Xác nhận đánh giá"** mà không cần thao tác tay
- Tự động tiếp tục tới môn học tiếp theo

---

## 🛠 Cài đặt

### Bước 1: Cài đặt Tampermonkey

- Truy cập: https://tampermonkey.net/ hoặc tải trên chromestore
- Chọn trình duyệt bạn đang dùng (Chrome, Firefox, Edge, Brave...)
- Cài đặt Extension

### Bước 2: Cài đặt Script

- Vào Tampermonkey Dashboard > `Create a new script`
- Dán toàn bộ nội dung từ script.js trong folder Auto Click Evaluation Links 
- **Lưu lại (`Ctrl+S`)**

---

## 🖥 Cách sử dụng

1. Truy cập vào hệ thống đánh giá:  
   👉 https://teaching-quality-survey.tdtu.edu.vn/choosesurvey.aspx

2. Script sẽ tự động thực thi và bắt đầu đánh giá từng môn.

3. Ngồi chơi, chờ hệ thống chạy hết các môn cần đánh giá 😎

---

## 📂 Cấu trúc Script

```js
@match        *://teaching-quality-survey.tdtu.edu.vn/choosesurvey.aspx*
@match        *://teaching-quality-survey.tdtu.edu.vn/Survey.aspx*
@match        *://teaching-quality-survey.tdtu.edu.vn/Result.aspx*
