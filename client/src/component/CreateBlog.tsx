import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateBlogMutation,
  useSaveDraftMutation,
} from "../redux/api/api";
import { setBlogs } from "../redux/reducers/blog";
import toast from "react-hot-toast";
import type { RootState } from "../redux/store";

const AUTO_SAVE_INTERVAL = 30000;
const INACTIVITY_DEBOUNCE = 5000; 

const CreateBlogForm: React.FC = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state: RootState) => state.blog);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [createBlog, { data: blogData, isLoading: isPublishing }] =
    useCreateBlogMutation();
  const [saveDraft, {data:draftData ,isLoading: isSavingDraft }] = useSaveDraftMutation();

  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoSaveInterval = useRef<ReturnType<typeof setTimeout> | null>(null);


  const saveDraftToBackend = async () => {
    if (!formData.title && !formData.content && !formData.tags) return; 
    try {
      await saveDraft(formData).unwrap();
      toast.success("Draft saved");
    } catch {
      toast.error("Failed to save draft");
    }
  };


  useEffect(() => {
    autoSaveInterval.current = setInterval(() => {
      saveDraftToBackend();
    }, AUTO_SAVE_INTERVAL);

    return () => {
      if (autoSaveInterval.current) clearInterval(autoSaveInterval.current);
    };
  }, [formData]); 


  useEffect(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

    inactivityTimer.current = setTimeout(() => {
      saveDraftToBackend();
    }, INACTIVITY_DEBOUNCE);

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [formData]); 

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveDraft = async () => {
    toast.loading("Saving draft...");
    try {
      await saveDraftToBackend();
      if (draftData) {
        dispatch(setBlogs([...(blogs ?? []), draftData]));
      }
    } finally {
      toast.dismiss();
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Publishing blog...");
    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    try {
      await createBlog({
        title: formData.title,
        content: formData.content,
        tags: tagsArray.join(","),
      }).unwrap();

      setFormData({ title: "", content: "", tags: "" });
      toast.success("Blog published!");
    } catch {
      toast.error("Failed to publish blog.");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  useEffect(() => {
    if (blogData) {
      dispatch(setBlogs([...(blogs ?? []), blogData]));
    }
  }, [blogData, dispatch, blogs]);

  return (
    <form onSubmit={handlePublish} className="space-y-3 bg-white p-4">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
        className="border p-2 w-full h-24"
        required
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={isSavingDraft}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          {isSavingDraft ? "Saving..." : "Save Draft"}
        </button>

        <button
          type="submit"
          disabled={isPublishing}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isPublishing ? "Publishing..." : "Publish"}
        </button>
      </div>
    </form>
  );
};

export default CreateBlogForm;

