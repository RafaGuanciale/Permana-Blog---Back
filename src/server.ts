import "dotenv/config";
import express from "express";
import { pool } from "./db.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Permana Blog API" });
});

app.get("/posts", async (req, res) => {
  const result = await pool.query(
    `SELECT id, slug, title, category, preview, author,
            reading_time, image, alt_image, published_at
     FROM posts
     ORDER BY published_at DESC`,
  );
  res.json(result.rows);
});

app.get("/posts/:slug", async (req, res) => {
  const { slug } = req.params;

  const result = await pool.query("SELECT * FROM posts WHERE slug = $1", [
    slug,
  ]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Post não encontrado" });
  }

  res.json(result.rows[0]);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});
