import { Blog } from "../model/blog.model.js";
import { ErrorHandler } from "../utils/utility.js";


const getAllBlogs = async (req, res,next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBlogById = async (req, res,next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return next(new ErrorHandler("Blog not found", 404));
    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog by ID:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const createBlog = async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  if (!user) {
    return res.next(new ErrorHandler('Unauthorized user or Please Login to access...',404));
  }
  try {
    const blog = new Blog({ title, content, tags, status: 'published' });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('Error publishing blog:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const saveDraft = async (req, res) => {
  const { title, content, tags } = req.body;
   const user = req.user; 
  if (!user) {
    return res.next(new ErrorHandler('Unauthorized user or Please Login to access...',404));
  }
  try {
    const blog = new Blog({ title, content, tags, status: 'draft' });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('Error saving draft:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getAllBlogs,
  getBlogById,
  createBlog,
  saveDraft,
};
