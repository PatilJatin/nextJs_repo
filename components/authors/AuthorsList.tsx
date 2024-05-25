"use client";
import React, { FC, Fragment, useState } from "react";
import { Toaster } from "react-hot-toast";
import DeleteButton from "../shared/tables/DeleteButton";
import EditButton from "../shared/tables/EditButton";
import TableContainer from "../shared/tables/TableContainer";
import TableHeading from "../shared/tables/TableHeading";
import { AUTHOR_MODEL } from "@/types/authors.types";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/features/hook";
import { convertToDDMMYYYY } from "@/helpers/adminpanel/dateTime/convertToDDMMYYYY";
import { deleteAuthorAction } from "@/redux/features/adminpanel/authors/authors.slice";
import { extractUUID } from "@/helpers/adminpanel/files/extractUUID";
import { deleteImageFromAws } from "@/services/aws/aws.services";
import { Author } from "@/models/author-model";
import Modal from "../shared/modal/Modal";

type AuthorsListProps = {
  authors: AUTHOR_MODEL[];
};

const AuthorsList: FC<AuthorsListProps> = (props) => {
  const { authors } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentAuthor, setCurrentAuthor] = useState<AUTHOR_MODEL | undefined>(
    undefined
  );

  const headings = ["Sr. No.", "Author Name", "Added Date", ""];

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentAuthor(() => undefined);
  };
  const handleDelete = async (id: string, img: string) => {
    const imgKey = extractUUID(img);
    await dispatch(deleteAuthorAction(id));
    await deleteImageFromAws(imgKey);
    handleCloseDeleteModal();
  };

  return (
    <>
      <TableContainer>
        <table className="w-full table-fixed overflow-scroll">
          <thead>
            <tr>
              {headings.map((heading) => {
                return <TableHeading key={heading}>{heading}</TableHeading>;
              })}
            </tr>
          </thead>
          <tbody>
            {authors.map((author, index) => {
              if (authors.length === 0) {
                return (
                  <tr>
                    <td rowSpan={headings.length} className="text-center">
                      No Data Available!
                    </td>
                  </tr>
                );
              }

              return (
                <Fragment key={author._id}>
                  <tr key={author._id}>
                    <td className="py-3 tableData">{index + 1}</td>
                    <td className="tableData">{author.name}</td>
                    <td className="tableData">
                      {convertToDDMMYYYY(author.createdAt)}
                    </td>
                    <td className="">
                      <div className="flex gap-7 items-center justify-center">
                        <EditButton
                          onClick={() =>
                            router.push(
                              `/adminpanel/authors/edit/${author._id}`
                            )
                          }
                        />
                        <DeleteButton
                          // onClick={() => handleDelete(author._id, author.image)}
                          onClick={() => {
                            setCurrentAuthor(() => author);
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
        <Toaster />
      </TableContainer>
      {currentAuthor && (
        <Modal visible={isDeleteModalOpen} closeModal={handleCloseDeleteModal}>
          <div className="flex flex-col justify-between items-center gap-5 py-10">
            <h5 className="text-3xl ">Are You Sure?</h5>
            <p>
              {"Are you sure you want to delete this author data permanently?"}
            </p>
            <div className="flex justify-between items-center gap-3 mt-4">
              <button
                type="button"
                className="bg-tertiary text-white text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:px-5 rounded basis-1/3"
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="bg-primary-red text-white text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:px-5 rounded basis-1/3"
                onClick={() =>
                  handleDelete(currentAuthor._id, currentAuthor.image)
                }
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

export default AuthorsList;
