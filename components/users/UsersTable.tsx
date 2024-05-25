"use client";
import React, { FC, Fragment, useState } from "react";
import TableContainer from "../shared/tables/TableContainer";
import TableHeading from "../shared/tables/TableHeading";
import { USER } from "@/types/user.types";
import EditButton from "../shared/tables/EditButton";
import DeleteButton from "../shared/tables/DeleteButton";
import { deleteUser } from "@/services/users/userServices";
import Modal from "../shared/modal/Modal";
import UserForm from "./forms/UserForm";
import { useAppDispatch } from "@/redux/features/hook";
import {
  deleteUserAction,
  getAllUsersAction,
  updateUserAction,
} from "@/redux/features/adminpanel/user/user.slice";
import { getEditUserData } from "@/helpers/adminpanel/users/getEditUserData";
import { debounce } from "lodash";
import DeleteModal from "../shared/modal/DeleteModal";
import { Boolean } from "aws-sdk/clients/cloudtrail";

type UsersTable = {
  users: USER[];
};

const UsersTable: FC<UsersTable> = (props) => {
  const { users } = props;

  const dispatch = useAppDispatch();
  const [userList, setUserList] = useState<USER[]>(users);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<USER | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const handleCloseModal = () => {
    setIsOpen(false);
    setCurrentUser(() => undefined);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentUser(() => undefined);
  };

  const handleOpenModal = (user: USER) => {
    setCurrentUser(() => user);
    setIsOpen(true);
  };

  const headings = ["Sr. No.", "Name", "Email Address", "Status", ""];

  const handleDeleteUser = async (id: string) => {
    console.log("called", id);

    const res = await dispatch(deleteUserAction(id));
    await dispatch(getAllUsersAction());

    handleCloseModal();
    handleCloseDeleteModal();
  };

  const handleStatus = debounce((id: string, isActive: boolean) => {
    const updatedUsers = userList.map((user) =>
      user._id === id ? { ...user, isActive } : user
    );
    setUserList(updatedUsers);
    dispatch(updateUserAction({ id, data: { isActive } }));
  }, 200);

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
            {userList.map((user, index) => {
              return (
                <Fragment key={user._id}>
                  <tr key={user._id}>
                    <td className="py-3">{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="flex items-center">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            id="switch"
                            type="checkbox"
                            checked={user.isActive}
                            className="peer sr-only"
                            onChange={(e) =>
                              handleStatus(user._id, e.target.checked)
                            }
                          />
                          <label htmlFor="switch" className="hidden"></label>
                          <div className="peer h-6 w-9 rounded-full border bg-[#C0CAD5] after:absolute after:left-[2px] after:top-1/2 after:bottom-1/2 after:-translate-y-1/2 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-green peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                        </label>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex gap-7 items-center justify-center">
                        <EditButton onClick={() => handleOpenModal(user)} />
                        <DeleteButton
                          // onClick={() => handleDeleteUser(user._id)}
                          onClick={() => {
                            setCurrentUser(() => user);
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

      {/* Edit Form */}
      <Modal visible={isOpen} closeModal={handleCloseModal}>
        <UserForm
          variant="edit"
          editId={currentUser?._id}
          editData={currentUser && getEditUserData(currentUser)}
          closeForm={handleCloseModal}
        />
      </Modal>
      {currentUser && (
        <Modal visible={isDeleteModalOpen} closeModal={handleCloseDeleteModal}>
          <div className="flex flex-col justify-between items-center gap-5 py-10">
            <h5 className="text-3xl ">Are You Sure?</h5>
            <p>
              {"Are you sure you want to delete this admin data permanently?"}
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
                onClick={() => handleDeleteUser(currentUser._id)}
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

export default UsersTable;
