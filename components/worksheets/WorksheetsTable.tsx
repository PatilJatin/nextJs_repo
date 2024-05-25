import { WORKSHEET_MODEL } from "@/types/worksheets.types";
import React, { Fragment, useState } from "react";
import TableContainer from "../shared/tables/TableContainer";
import TableHeading from "../shared/tables/TableHeading";
import { convertToDDMMYYYY } from "@/helpers/adminpanel/dateTime/convertToDDMMYYYY";
import DeleteButton from "../shared/tables/DeleteButton";
import { useAppDispatch } from "@/redux/features/hook";
import { deleteWorksheetAction } from "@/redux/features/adminpanel/worksheets/worksheets.slice";
import Modal from "../shared/modal/Modal";
import WorksheetInfo from "./WorksheetInfo";

const WorksheetsTable = ({ worksheets }: { worksheets: WORKSHEET_MODEL[] }) => {
  const [currentWorksheet, setCurrentWorksheet] =
    useState<WORKSHEET_MODEL | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentWorksheet(() => null);
  };
  const dispatch = useAppDispatch();

  const headings = [
    "Sr. No",
    "Date",
    "Name",
    "Project",
    "Phone Number",
    "Email Address",
    "",
  ];

  const handleDelete = async (id: string) => {
    await dispatch(deleteWorksheetAction(id));
    handleCloseDeleteModal();
  };

  const handleCloseModal = () => {
    setCurrentWorksheet(null);
  };

  return (
    <>
      <TableContainer>
        <table className="w-full  overflow-scroll">
          <thead>
            <tr>
              {headings.map((heading) => {
                if (heading === "Sr. No") {
                  return (
                    <th
                      key={heading}
                      className="font-Poppins font-medium text-base pb-4 w-[7%]"
                    >
                      Sr. No
                    </th>
                  );
                }

                return <TableHeading key={heading}>{heading}</TableHeading>;
              })}
            </tr>
          </thead>
          <tbody>
            {worksheets.map((sheet, index) => {
              if (worksheets.length === 0) {
                return (
                  <tr>
                    <td rowSpan={headings.length} className="text-center">
                      No Data Available!
                    </td>
                  </tr>
                );
              }

              return (
                <Fragment key={sheet._id}>
                  <tr
                    onClick={() => setCurrentWorksheet(sheet)}
                    key={sheet._id}
                    className="hover:bg-[#DBEAF6]"
                  >
                    <td className="py-3 tableData">{index + 1}</td>
                    <td className="tableData">
                      {convertToDDMMYYYY(sheet.createdAt)}
                    </td>
                    <td className="tableData capitalize">
                      {sheet.firstName} {sheet.lastName}
                    </td>
                    <td className="tableData">{sheet.projectName}</td>
                    <td className="tableData">{sheet.phoneNumber}</td>
                    <td className="tableData">{sheet.email}</td>
                    <td className="">
                      <div className="flex gap-7 items-center justify-center">
                        <DeleteButton
                          // onClick={() => handleDelete(sheet._id!)}
                          onClick={() => {
                            setCurrentWorksheet(() => sheet);
                            setIsDeleteModalOpen(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </TableContainer>

      <Modal
        visible={currentWorksheet !== null && !isDeleteModalOpen}
        closeModal={handleCloseModal}
      >
        <WorksheetInfo sheet={currentWorksheet!} />
      </Modal>
      {currentWorksheet && (
        <Modal visible={isDeleteModalOpen} closeModal={handleCloseModal}>
          <div className="flex flex-col justify-between items-center gap-5 py-10">
            <h5 className="text-3xl ">Are You Sure?</h5>
            <p>
              {
                "Are you sure you want to delete this worksheet data permanently?"
              }
            </p>
            <div className="flex justify-between items-center gap-3 mt-4">
              <button
                type="button"
                className="bg-tertiary text-white text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:px-5 rounded basis-1/3"
                onClick={handleCloseModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="bg-primary-red text-white text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:px-5 rounded basis-1/3"
                onClick={() => handleDelete(currentWorksheet._id!)}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default WorksheetsTable;
