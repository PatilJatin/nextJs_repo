export const leadsEndpoints = {
  getAllLeadsTypes: `/leads`,
  getAllLeadsBySource: (source: string) => `/leads/source/${source}`,
  filterLeadsSource: `/leads/filter`,
  deleteLead: (id: string) => `/leads/${id}`,
  createLead: "/leads",
  exportLeads: `/leads/export`,
};
