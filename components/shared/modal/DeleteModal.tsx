import { icons } from "@/public/assets/icons";
import Image from "next/image";
import React, { FC, ReactNode } from "react";

type ModalProps = {
  visible: boolean;
  message: string;
  id: string;
  closeModal: () => void;
  deleteFunc: () => void;
};

const DeleteModal: FC<ModalProps> = (props) => {
  const { visible, closeModal, message, id, deleteFunc } = props;

  if (!visible) return null;

  return (
    <div className="z-[10000] h-screen scrollbar-prop fixed inset-0 bg-black  bg-opacity-50 flex justify-center items-center ">
      <div className="bg-[#F8FBFF] min-w-[40.138%] max-w-2xl relative rounded-xl">
        <div className="flex justify-end w-full sticky top-0 p-2">
          <button onClick={closeModal}>
            <Image src={icons.closeBtn} height={24} width={24} alt="Close" />
          </button>
        </div>

        <div className="max-h-[90vh] flex flex-col justify-between items-center gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-primary">
          <h5 className="text-3xl ">Are You Sure?</h5>
          <p>{message}</p>
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              className="bg-tertiary text-black text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:px-5 rounded basis-1/3"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              type="button"
              className="bg-primary-red text-white text-sm leading-5 md:text-base
            font-medium text-center py-2 md:py-3 px-4 md:px-5 rounded basis-1/3"
              onClick={deleteFunc}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
