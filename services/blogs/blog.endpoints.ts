const blogsEndpoints = {
  createBlog: `/admins/blogs`,
  getAllBlogs: "/admins/blogs?limit=30",
  deleteBlog: (id: string) => `/admins/blogs/${id}`,
  updateBlog: (id: string) => `/admins/blogs/${id}`,
  getBlog: (id: string) => `/admins/blogs/${id}`,
};

export { blogsEndpoints };
