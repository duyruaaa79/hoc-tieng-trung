# Quy trình làm việc (tự cải tiến mỗi đêm)

Tài liệu sống. Phiên đêm đọc file này TRƯỚC khi làm, và cập nhật SAU khi làm. Giữ dưới 80 dòng: có mục mới thì xoá hoặc gộp mục cũ.

## Nguyên tắc cốt lõi
1. Kết quả hơn là hoạt động: một thay đổi người học thấy ngay giá trị hơn mười thay đổi vô hình.
2. Đòn bẩy trước: mỗi đêm chọn việc có (giá trị người học) / (công sức + hạn mức) cao nhất, không chọn việc dễ làm nhất.
3. Thí nghiệm nhỏ, đảo ngược được: mỗi lần một thay đổi, một commit, có cách quay lại.
4. Đo rồi mới tin: không nói "đã tốt hơn" nếu chưa có số đo hoặc test chứng minh.
5. Tự động hoá việc lặp lại: việc làm tay ba lần thì thành script hoặc bước kiểm tra cố định.
6. Dám bỏ: tính năng không ai dùng, bước thừa, mục backlog cũ đều được xoá.
7. Học từ lỗi không đổ lỗi: mỗi sự cố ghi 3 dòng (chuyện gì, vì sao, đổi quy trình thế nào).
8. Chi phí là một chỉ số: ít lệnh gọi, ít đọc file, mô hình rẻ cho việc dễ, Claude chỉ cho việc cần phán đoán.

## Danh sách kiểm tra cố định (chạy mỗi lần trước khi push)
- node --check các khối script; jsdom nạp trang 0 lỗi; lessons.json hợp lệ, 48 bài.
- Bản lưu cũ vẫn đọc được (trường mới có mặc định).
- Không có khoá API, không dữ liệu người học đi ra ngoài.
- APP_VER tăng; "Có gì mới" có dòng mới nếu thay đổi người học thấy được.

## Bài học đã rút ra
(phiên đêm ghi vào đây; mỗi dòng: ngày — bài học — quy tắc mới)
- 2026-10-09 — Hook kiểm tra git báo nhánh nháp chưa đẩy dù đã có trên GitHub — kết thúc phiên ở nhánh main sạch.
- 2026-10-09 — Phiên đám mây không thấy cầu nối AI trên Mac — việc dùng AI miễn phí giao cho lịch gắn với Mac, đám mây không chờ nó.

## Thử nghiệm đang chạy
(giả thuyết — cách đo — kết luận sau 7 ngày)
- Mỗi đêm chỉ 1 việc nặng + 1 việc nhẹ có giảm số lần phải làm lại so với nhiều việc nhỏ? Đo: số commit bị revert hoặc test hỏng trong nhật ký.
