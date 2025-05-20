import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { createBlog, getAllBlogs, getBlogById, saveDraft } from '../controller/blog.controller.js';

const router = express.Router();

router.get("/",getAllBlogs)
router.get("/:id",getBlogById)

router.use(authenticate);
router.post("/publish",createBlog)
router.post("/save-draft",saveDraft)

export default router;
