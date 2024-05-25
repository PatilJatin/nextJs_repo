export const propertyEndpoints = {
  getAllProperties: `/projects?limit=1000`,
  addProject: "/projects",
  getProjectById: (id: string) => `/projects/${id}`,
  updateProject: (id: string) => `/projects/${id}`,
  deleteProject: (id: string) => `/projects/${id}`,
  filterByCategory: (filter: string) => `/projects/having-category/${filter}`,
  filterByClosingIn: (year: number) => `/projects/closing-in/${year}`,
};
