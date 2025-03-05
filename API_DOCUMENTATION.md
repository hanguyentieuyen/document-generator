1. **Tổng quan**

   Giới thiệu về API là một dịch vụ web có các endpoint (uri) được sử dụng để giao tiếp giữa các phần mềm nhau.

   **API trong trường hợp này là:** API cho quản lý danh sách người dùng.

   Hãy đọc tài liệu bên dưới để biết thêm chi tiết về các endpoint trong API này.

   ----------------------------------------

   **2. Danh sách Endpoint**

   | HTTP Method | Endpoint URL | Mô tả chức năng                  | Tham số đầu vào                     | Ví dụ request & response            |
   |------------|-------------|----------------------------------|-----------------------------------|------------------------------------|
   | POST       | /users      | Tạo một người dùng mới             | Body: { name, email, phone }       | Request: `POST /users`, Response: ...  |
   | GET        | /users      | Lấy danh sách các người dùng         | Không có                           | Request: `GET /users`, Response: ... |
   | PUT        | /users/:id  | Cập nhật thông tin của một người dùng | Body: { name, email, phone }, Params: id | Request: `PUT /users/1`, Response: ...|
   | DELETE     | /users/:id  | Xóa một người dùng                    | Params: id                         | Request: `DELETE /users/1`, Response: ...|
   | GET        | /generate-docs | Tạo tài liệu API documentation       | Không có                           | Request: `GET /generate-docs`, Response: ... |
   ----------------------------------------

   **3. Cách sử dụng**

   Hãy sử dụng các trình soạn thảo hoặc công cụ API testing như Postman để gọi đến API và kiểm tra kết quả trả về.
```