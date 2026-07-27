import type { Request, Response } from "express";
import { pool } from "../db.js";

export async function getPosts(req: Request, res: Response) {
  const result = await pool.query(
    `SELECT id, slug, title, category, preview, author,
            reading_time, image, alt_image, published_at
     FROM posts
     ORDER BY published_at DESC`,
  );
  res.json(result.rows);
}

export async function getPostsBySlug(req: Request, res: Response) {
  const { slug } = req.params;

  const result = await pool.query(`SELECT * FROM posts WHERE slug = $1`, [
    slug,
  ]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Post não encontrado" });
  }

  res.json(result.rows[0]);
}
