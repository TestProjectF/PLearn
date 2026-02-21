# SRS cho PLearn

## 1. Giới thiệu
- Tên dự án: PLearn – Quản lý khóa học Công nghệ phần mềm.
- Mô tả: Dựa trên slide CNPM.pptx, quản lý khóa học với chương từ 1-9, mục tiêu, đánh giá.
- Mô hình: Iterative Incremental.

## 2. Yêu cầu chức năng
- Đăng ký/Đăng nhập (Giảng viên/Sinh viên).
- Quản lý khóa học: Thêm/sửa/xóa chương (từ slide).
- Theo dõi tiến độ: Sinh viên mark hoàn thành chương.
- Bài tập: Giảng viên assign, sinh viên submit.
- Tài liệu: Upload slide CNPM.pptx.

## 3. Yêu cầu phi chức năng
- Rollback: Transaction DB.
- Recovery: Backup DB hàng ngày.
- Performance: Load < 5s.

## 4. UML Diagrams (sẽ vẽ sau).