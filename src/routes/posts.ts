import { Router } from "express";
import { getPosts, getPostsBySlug } from "../controllers/posts.js";

const router = Router();

router.get('/', getPosts);
router.get('/:slug', getPostsBySlug);

export default router;
