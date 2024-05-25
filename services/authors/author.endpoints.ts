export const authorEndpoints = {
  getAllAuthors: `/admins/authors`,
  getAuthorById: (id: string) => `/admins/authors/${id}`,
  createAuthor: `/admins/authors`,
  updateAuthor: (id: string) => `/admins/authors/${id}`,
  deleteAuthor: (id: string) => `/admins/authors/${id}`,
};
