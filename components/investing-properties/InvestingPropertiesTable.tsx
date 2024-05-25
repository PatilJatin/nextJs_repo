"use client";

import { INVESTINGINPROPERTY_MODEL } from "@/types/investingInPropeties.types";
import React, { useState } from "react";
import TableContainer from "../shared/tables/TableContainer";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import Modal from "../shared/modal/Modal";
import { deleteInvestingInPropertiesAction } from "@/redux/features/adminpanel/InvestingInProperties/InvestingInProperties.slice";

type Props = {};

const InvestingPropertiesTable = ({
  invProps,
}: {
  invProps: INVESTINGINPROPERTY_MODEL[];
}) => {
  console.log(invProps);
  const dispatch = useAppDispatch();
  const [currentProps, setCurrentProps] = useState<
    INVESTINGINPROPERTY_MODEL | undefined
  >(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const deletePodcastHandler = async (id: string) => {
       await dispatch(deleteInvestingInPropertiesAction(id));
    handleCloseDeleteModal();
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentProps(() => undefined);
  };
  return (
    <>
      <TableContainer>
        {/* <div className=" h-[78vh] overflow-auto scrollbar-prop  border border-tertiary rounded-lg py-6 px-4 mt-5"> */}
        <table className="w-full ">
          <thead className="w-full">
            <tr className="font-medium text-base leading-7">
              <th className="text-left">Sr. No.</th>

              <th className="text-left">Title</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {invProps.map((podcast, index) => {
              if (invProps.length <= 0) {
                return (
                  <tr>
                    <td>No data found</td>
                  </tr>
                );
              }

              return (
                <tr key={index} className="text-sm leading-5">
                  <td className="text-left tableData">{index + 1}</td>

                  <td className="text-left tableData capitalize">
                    {podcast.title || "NA"}
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td className="font-medium text-base text-right underline text-primary leading-6 capitalize">
                    <Link
                      href={`/adminpanel/investing-properties/edit/${podcast._id}`}
                    >
                      Edit
                    </Link>
                  </td>
                  <td className="font-medium text-base  text-center underline text-primary-red leading-6 ">
                    <button
                      type="button"
                      // onClick={() => deletePodcastHandler(podcast._id)}
                      onClick={() => {
                        setCurrentProps(() => podcast);
                        setIsDeleteModalOpen(true);
                      }}
                      className="underline capitalize"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableContainer>
      {currentProps && (
        <Modal visible={isDeleteModalOpen} closeModal={handleCloseDeleteModal}>
          <div className="flex flex-col justify-between items-center gap-5 py-10">
            <h5 className="text-3xl ">Are You Sure?</h5>
            <p>
              {
                "Are you sure you want to delete this investing-properties data permanently?"
              }
            </p>
            <div className="flex justify-between items-center gap-3 mt-4">
              <button
                type="button"
                className="bg-tertiary text-white text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:psx-5 rounded basis-1/3"
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="bg-primary-red text-white text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:px-5 rounded basis-1/3"
                onClick={() => deletePodcastHandler(currentProps._id)}
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

export default InvestingPropertiesTable;
