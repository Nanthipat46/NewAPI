const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // สำหรับแปลง JSON ที่รับเข้ามา

// ตัวอย่างข้อมูลหนังสือ
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
];

// GET: ดูข้อมูลหนังสือทั้งหมด
app.get("/api/books", (req, res) => {
  res.json(books);
});

// GET: ดูข้อมูลหนังสือตาม ID
app.get("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// POST: เพิ่มหนังสือใหม่
app.post("/api/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT: แก้ไขข้อมูลหนังสือตาม ID
app.put("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    book.title = req.body.title;
    book.author = req.body.author;
    res.json(book);
  } else {
    res.status(404).send("Book not found");
  }
});

// DELETE: ลบหนังสือตาม ID
app.delete("/api/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  books = books.filter((b) => b.id !== bookId);
  res.status(204).send();
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}/api/books`);
});
