export const worksheetsEndpoints = {
  getAllWorksheets: `/worksheets`,
  getWorksheetById: (id: string) => `/worksheets/${id}`,
  deleteWorksheet: (id: string) => `/worksheets/${id}`,
  filterNewToOld: `/worksheets/new-to-old`,
  filterOldToNew: `/worksheets/old-to-new`,
  exportWorksheet: `/worksheets/export`,
};
