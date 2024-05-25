"use client";

import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import Header from "@/components/shared/header/Header";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import Modal from "@/components/shared/modal/Modal";
import UsersTable from "@/components/users/UsersTable";
import UserForm from "@/components/users/forms/UserForm";
import {
  getAllUsersAction,
  userSelector,
} from "@/redux/features/adminpanel/user/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const AdminsPage = () => {
  const dispatch = useAppDispatch();
  const { users, status } = useAppSelector(userSelector);

  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, []);

  return (
    <div className="h-full ">
      <Header
        heading="Hello Super Admin!"
        description="Welcome to Admin List Page"
      >
        <div className="flex items-center gap-[1.125rem]">
          <PrimaryButton type="button" onClick={handleOpenModal}>
            Add Admin
          </PrimaryButton>
        </div>
      </Header>

      {status === "loading" ? <PrimarySpinner /> : <UsersTable users={users} />}

      <Modal visible={isOpen} closeModal={handleCloseModal}>
        <UserForm variant="add" closeForm={handleCloseModal} />
      </Modal>

      <Toaster />
    </div>
  );
};

export default AdminsPage;
