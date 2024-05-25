const usersEndpoints = {
  createUser: `/admins`,
  getAllUsers: "/admins",
  deleteUser: (id: string) => `/admins/${id}`,
  updateUser: (id: string) => `/admins/${id}`,
};

export { usersEndpoints };
