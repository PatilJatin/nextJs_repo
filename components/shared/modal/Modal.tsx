import { icons } from "@/public/assets/icons";
import Image from "next/image";
import React, { FC, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  visible: boolean;
  closeModal: () => void;
};

const Modal: FC<ModalProps> = (props) => {
  const { children, visible, closeModal } = props;

  if (!visible) return null;

  return (
    <div className="z-[10000] h-screen scrollbar-prop fixed inset-0 bg-black  bg-opacity-50 flex justify-center items-center ">
      <div className="bg-[#F8FBFF] min-w-[40.138%] max-w-2xl relative rounded-xl">
        <div className="flex justify-end w-full sticky top-0 p-2">
          <button onClick={closeModal}>
            <Image src={icons.closeBtn} height={24} width={24} alt="Close" />
          </button>
        </div>

        <div className="max-h-[90vh]  overflow-y-auto scrollbar-thin scrollbar-thumb-primary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
