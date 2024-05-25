"use client";

import React, { FC, Fragment, useEffect, useState } from "react";
import DeleteButton from "../shared/tables/DeleteButton";
import EditButton from "../shared/tables/EditButton";
import TableContainer from "../shared/tables/TableContainer";
import TableHeading from "../shared/tables/TableHeading";
import { PROJECT_MODEL } from "@/types/properties.types";
import { convertToDDMMYYYY } from "@/helpers/adminpanel/dateTime/convertToDDMMYYYY";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useAppDispatch } from "@/redux/features/hook";
import {
  deletePropertyAction,
  getAllPropertiesAction,
  updatePropertyAction,
} from "@/redux/features/adminpanel/properties/properties.slice";
import { PROPERTY_FORM_FIELDS } from "./form/PropertyFormProvider";
import Modal from "../shared/modal/Modal";
import { debounce } from "lodash";

type PropertiesListProps = {
  properties: PROJECT_MODEL[];
};

const PropertiesListTable: FC<PropertiesListProps> = (props) => {
  const { properties } = props;
  console.log(properties);

  const [propertyList, setPropertyList] = useState<PROJECT_MODEL[]>(properties);

  const dispatch = useAppDispatch();
  const [currentProject, setCurrentProject] = useState<
    PROJECT_MODEL | undefined
  >(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const headings = [
    "Sr. No.",
    "Posted Date",
    "Project Name",
    "Location",
    "Developer Name",
    "Status",
  ];

  useEffect(() => {
    setPropertyList(properties);
  });
  const handleDelete = async (id: string) => {
    await dispatch(deletePropertyAction(id));
  };
  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentProject(() => undefined);
  };
  const handleStatus = debounce((id: string, isHidden: boolean) => {
    console.log(id, isHidden);
    const updated = propertyList.map((property) =>
      property._id === id ? { ...property, isHidden } : property
    );
    setPropertyList(updated);
    dispatch(updatePropertyAction({ id, data: { isHidden } }));

    // dispatch(getAllPropertiesAction());
  }, 200);
  //  const handleStatus = debounce((id: string, isActive: boolean) => {
  //    const updatedUsers = userList.map((user) =>
  //      user._id === id ? { ...user, isActive } : user
  //    );
  //    setUserList(updatedUsers);
  //    dispatch(updateUserAction({ id, data: { isActive } }));
  //  }, 200);
  return (
    <>
      <TableContainer>
        <table className="w-full overflow-scroll">
          <thead>
            <tr>
              {headings.map((heading) => {
                return <TableHeading key={heading}>{heading}</TableHeading>;
              })}
            </tr>
          </thead>
          <tbody>
            {propertyList.map((property, index) => {
              if (propertyList.length === 0) {
                return (
                  <tr>
                    <td rowSpan={headings.length} className="text-center">
                      No Data Available!
                    </td>
                  </tr>
                );
              }

              return (
                <Fragment key={property._id}>
                  <tr key={property._id}>
                    <td className="py-3 tableData">{index + 1}</td>
                    <td className="tableData">
                      {convertToDDMMYYYY(property.createdAt)}
                    </td>
                    <td className="tableData">{property.name}</td>
                    <td className="tableData">{property.neighborhood}</td>
                    <td className="tableData">{property.developerName}</td>
                    <td className="tableData">
                      <div className="flex items-center">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            id="switch"
                            type="checkbox"
                            checked={property.isHidden}
                            className="peer sr-only"
                            onChange={(e) =>
                              handleStatus(property._id, e.target.checked)
                            }
                          />
                          <label htmlFor="switch" className="hidden"></label>
                          <div className="peer h-6 w-9 rounded-full border bg-[#C0CAD5] after:absolute after:left-[2px] after:top-1/2 after:bottom-1/2 after:-translate-y-1/2 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-green peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                        </label>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex gap-7 items-center justify-center">
                        <EditButton
                          onClick={() =>
                            router.push(
                              `/adminpanel/properties/edit/${property._id}`
                            )
                          }
                        />
                        <DeleteButton
                          // onClick={() => handleDelete(property._id!)}
                          onClick={() => {
                            setCurrentProject(() => property);
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
        {/* <Toaster /> */}
      </TableContainer>
      {currentProject && (
        <Modal visible={isDeleteModalOpen} closeModal={handleCloseModal}>
          <div className="flex flex-col justify-between items-center gap-5 py-10">
            <h5 className="text-3xl ">Are You Sure?</h5>
            <p>
              {"Are you sure you want to delete this project data permanently?"}
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
                onClick={() => handleDelete(currentProject._id!)}
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

export default PropertiesListTable;
