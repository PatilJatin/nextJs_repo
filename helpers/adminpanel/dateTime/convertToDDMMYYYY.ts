import moment from "moment";

export const convertToDDMMYYYY = (dateString: string) => {
  const formattedDate = moment(dateString).format("DD-MM-YYYY");

  return formattedDate;
};
