export const InvestingInPropertiesEndpoints = {
  getAllInvestingInProperties: `/investingInProperties`,
  getInvestingInPropertiesById: (id: string) => `/investingInProperties/${id}`,
  createInvestingInProperties: `/investingInProperties`,
  updateInvestingInProperties: (id: string) => `/investingInProperties/${id}`,
  deleteInvestingInProperties: (id: string) => `/investingInProperties/${id}`,
};
