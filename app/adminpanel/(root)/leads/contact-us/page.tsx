import LeadCard from "@/components/reusable/LeadCard";
import Lead from "@/models/lead-model";
import Image from "next/image";
import React from "react";
interface lead {
  id: 1;
  email: string;
  content: string;
  createdDate: string;
}
const contactUsLeads = () => {
  const contactLeads: lead[] = [
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
    {
      id: 1,
      email: "abc@gmail.com",
      createdDate: "20 Sept 2023",
      content:
        "Lorem ipsum dolor sit amet con sectetur. Fermentum biben um dolor at tempor massa ut. Pretiu meu sed eleme ntum egestas. Vehicula vitae viverr.",
    },
  ];
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-end ">
          {/* todo: add dynamic */}
          <p className="font-medium text-base leading-5 ">Contact Us</p>
          <p className=" font-normal text-base leading-5 text-tertiary pt-2">
            Welcome to leads page
          </p>
        </div>
        <div className="flex justify-start items-stretch gap-4">
          <button
            type="button"
            className="primary-button flex justify-start gap-2 items-center"
          >
            <p>Export</p>
            <Image
              src={"/assets/other/upload-logo.svg"}
              alt="logo"
              width={24}
              height={24}
              className=""
            />
          </button>
          <div className="border-[1px] rounded py-3 px-4 border-primary flex-1 ">
            Filter
          </div>
        </div>
      </div>
      <div className="pt-10 w-full grid grid-cols-4 gap-5">
        {contactLeads.map((lead, index) => (
          <LeadCard
            // openOptions={() => {}}
            key={index}
            content={lead.content}
            createdDate={lead.createdDate}
            email={lead.email}
          />
        ))}
      </div>
    </div>
  );
};

export default contactUsLeads;
