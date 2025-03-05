import express from "express";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ollama from "ollama";

const app = express();
const PORT = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

let users = [];

// 📌 CREATE - Thêm người dùng mới
app.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).json({ message: "User created", user });
});

// 📌 READ - Lấy danh sách người dùng
app.get("/users", (req, res) => {
  res.json(users);
});

// 📌 UPDATE - Cập nhật thông tin người dùng
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  users = users.map((user) => (user.id === id ? updatedUser : user));
  res.json({ message: "User updated", updatedUser });
});

// 📌 DELETE - Xóa người dùng
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => user.id !== id);
  res.json({ message: "User deleted" });
});

// 📌 Tạo tài liệu Markdown tự động từ code
app.get("/generate-docs", async (req, res) => {
  try {
    const apiCode = await fs.readFile(__filename, "utf-8");

    const prompt = `
Bạn là một trợ lý chuyên viết tài liệu API. Hãy đọc đoạn code dưới đây và tạo tài liệu Markdown đầy đủ với nội dung:
1. **Tổng quan**: Giới thiệu về API
2. **Danh sách Endpoint**: Mô tả từng API endpoint với:
   - HTTP Method (GET, POST, PUT, DELETE)
   - Endpoint URL
   - Mô tả chức năng
   - Tham số đầu vào (body, query, params)
   - Ví dụ request & response
3. **Cách sử dụng**: Hướng dẫn gọi API

\`\`\`javascript
${apiCode}
\`\`\`
`;

    const response = await ollama.chat({
      model: "mistral",
      messages: [{ role: "user", content: prompt }],
    });

    const markdownDocs = response.message.content;

    await fs.writeFile(`${__dirname}/API_DOCUMENTATION.md`, markdownDocs);

    res.json({
      message: "Tài liệu đã được tạo!",
      file: "API_DOCUMENTATION.md",
    });
  } catch (error) {
    console.error("Lỗi khi tạo tài liệu:", error);
    res.status(500).json({ error: "Lỗi khi tạo tài liệu" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
