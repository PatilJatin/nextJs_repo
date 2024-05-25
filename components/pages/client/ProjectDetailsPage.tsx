"use client";
import DownloadPDFForm from "@/components/properties/form/DownloadPDFForm";
import RequestFromInformation from "@/components/properties/form/RequestFromInformation";
import GlobalSearch from "@/components/reusable/GlobalSearch";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import Modal from "@/components/shared/modal/Modal";
import {
  getPropertyByIdAction,
  propertiesSelector,
} from "@/redux/features/adminpanel/properties/properties.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

// Inside your functional component
type Props = {
  id: string;
};

function ProjectDetailsPage(prop: Props) {
  const dispatch = useAppDispatch();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { project, status } = useAppSelector(propertiesSelector);
  useEffect(() => {
    setLoading(() => true);
    dispatch(getPropertyByIdAction(prop.id))
      .then(() => setLoading(() => false))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (status === "failure") {
      router.push("/not-found"); // Replace '/not-found' with the actual path to your not-found page
    }
  }, [status]);
  return (
    <section className="">
      <div className="px-4 md:px-10 ">
        <GlobalSearch />
      </div>
      {!loading && "failure" !== status && (
        <>
          <div className="section-padding ">
            <div>
              <h3 className="project-details-h3 md:text-center w-full">
                {project.name}
              </h3>

              <p
                className="text-left md:text-center text-sm leading-5 line-clamp-4 text-tertiary lg:line-clamp-1 lg:text-base lg:leading-5"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>
            <div className=" mt-6 lg:mt-14 flex  flex-col lg:flex-row  justify-between lg:justify-start  items-stretch gap-6 lg:gap-14">
              <div className="flex flex-col justify-between items-center lg:w-[55%]">
                <div className="w-full ">
                  <div className="project-details-table-row">
                    <p className="project-details-table-head">Developer</p>
                    <p className="project-details-table-value">
                      {project.developerName}
                    </p>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="project-details-table-row">
                    <p className="project-details-table-head">Address</p>
                    <p className="project-details-table-value">
                      {project.address}
                    </p>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="project-details-table-row">
                    <p className="project-details-table-head">Neighborhood</p>
                    <p className="project-details-table-value">
                      {project.neighborhood}
                    </p>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="project-details-table-row">
                    <p className="project-details-table-head">
                      Number of Storeys
                    </p>
                    <p className="project-details-table-value">
                      {project.numberOfStoreys}
                    </p>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="project-details-table-row">
                    <p className="project-details-table-head">
                      Number of Units
                    </p>
                    <p className="project-details-table-value">
                      {project.numberOfUnits}
                    </p>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="project-details-table-row">
                    <p className="project-details-table-head">Occupancy Date</p>
                    <p className="project-details-table-value">
                      {project.occupancyDate}
                    </p>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="project-details-table-row">
                    <p className="project-details-table-head">
                      Maintenance Fees
                    </p>
                    <p className="project-details-table-value">
                      {project.maintenanceFees}
                    </p>
                  </div>
                </div>
                <div className="w-full ">
                  <div className="project-details-table-row">
                    <p className="project-details-table-head">Priced From</p>
                    <p className="project-details-table-value">
                      {project.pricedFrom}
                    </p>
                  </div>
                </div>
                {project.attachments.map((attachment, index) => (
                  <div className="w-full " key={index}>
                    <div className="project-details-table-row">
                      <p className="project-details-table-head">
                        {attachment.title}
                      </p>
                      <div
                        onClick={() => setIsOpenModal(() => true)}
                        className=" cursor-pointer w-[50%] lg:w-[40%]  flex justify-start items-center gap-1"
                      >
                        <p className="text-primary font-medium underline underline-offset-2">
                          Download PDF
                        </p>
                        <Image
                          src={"/assets/projects/download.svg"}
                          alt="download"
                          width={18}
                          height={18}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className=" flex flex-col gap-5 justify-center items-center lg:w-[50%]">
                <div className="w-full lg:h-[547px] project-shadow rounded overflow-clip">
                  <Image
                    src={project.overViewImages?.[0]}
                    alt="project-image"
                    width={358}
                    height={358}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Link
                  href={"/reserve-your-unit"}
                  target="_blank"
                  className="primary-button w-full"
                >
                  Reserve Your Unit Now!
                </Link>
              </div>
            </div>
          </div>
          <div className="section-padding">
            <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-6">
              <div className="flex flex-col gap-3 lg:gap-10 lg:w-[52%] justify-start">
                <h3 className="project-details-h3 text-left">About Condo</h3>

                <p
                  className="project-details-p"
                  dangerouslySetInnerHTML={{ __html: project.aboutProject }}
                />
              </div>
              <div className="w-full lg:w-[45%] lg:h-[547px] object-cover project-shadow rounded overflow-clip">
                <Image
                  src={project.aboutImages?.[0]}
                  alt="img"
                  width={358}
                  height={358}
                  className="w-full h-full "
                />
              </div>
            </div>
          </div>
          <div className="section-padding">
            <h3 className="project-details-h3 text-left mb-6 lg:mb-10">
              Features and Finishes
            </h3>
            <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-6">
              <div className="flex flex-col gap-3 lg:gap-10 lg:w-[45%] justify-start">
                <div className="w-full  lg:h-[345px] object-cover project-shadow rounded overflow-clip">
                  <Image
                    src={project.featureImages?.[0]}
                    alt="img"
                    width={358}
                    height={358}
                    className="w-full h-full "
                  />
                </div>
              </div>
              <div className="w-full lg:w-[52%]">
                <p
                  className="project-details-p"
                  dangerouslySetInnerHTML={{
                    __html: project.featuresAndFinishes,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="section-padding">
            <h3 className="project-details-h3 text-left mb-6 lg:mb-10">
              About Developer
            </h3>
            <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-6">
              <div className="flex flex-col gap-3 lg:gap-10 lg:w-[55%] justify-start">
                <h4 className="text-lg leading-7 font-medium lg:text-3xl lg:leading-10">
                  {project.developerName}
                </h4>

                <p
                  className="project-details-p"
                  dangerouslySetInnerHTML={{
                    __html: project.aboutDeveloper,
                  }}
                />
              </div>
              <div className="w-full lg:w-[30%]">
                <div className="w-full  lg:h-[345px] project-shadow  object-cover rounded overflow-clip">
                  <Image
                    src={project.developerImages?.[0]}
                    alt="img"
                    width={358}
                    height={358}
                    className="w-full h-full "
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {loading && (
        // <div className="w-full flex justify-center items-center">
        //   <PrimarySpinner />
        // </div>
        <>
          <div className="section-padding ">
            <div>
              {/* Shimmer effect for project name */}
              <div className="animate-pulse w-3/4 h-6 bg-gray-300 rounded mb-4"></div>

              {/* Shimmer effect for project description */}
              <div className="animate-pulse w-full h-20 bg-gray-300 rounded mb-6"></div>
            </div>
            <div className=" mt-6 lg:mt-14 flex  flex-col lg:flex-row  justify-between lg:justify-start  items-stretch gap-6 lg:gap-14">
              {/* Left side */}
              <div className="flex flex-col justify-between items-center lg:w-[55%]">
                {/* Shimmer effect for project details */}
                <div className="w-full animate-pulse h-10 bg-gray-300 rounded mb-4"></div>
                <div className="w-full animate-pulse h-10 bg-gray-300 rounded mb-4"></div>
                <div className="w-full animate-pulse h-10 bg-gray-300 rounded mb-4"></div>
                <div className="w-full animate-pulse h-10 bg-gray-300 rounded mb-4"></div>
                <div className="w-full animate-pulse h-10 bg-gray-300 rounded mb-4"></div>
                <div className="w-full animate-pulse h-10 bg-gray-300 rounded mb-4"></div>
                <div className="w-full animate-pulse h-10 bg-gray-300 rounded mb-4"></div>
                {/* Shimmer effect for attachments */}
                <div className="w-full animate-pulse h-10 bg-gray-300 rounded mb-4"></div>
              </div>

              {/* Right side */}
              <div className="flex flex-col gap-5 justify-center items-center lg:w-[50%]">
                {/* Shimmer effect for project image */}
                <div className="w-full animate-pulse h-[547px] bg-gray-300 rounded mb-4"></div>
                {/* Shimmer effect for reserve button */}
                <div className="w-1/2 animate-pulse h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

          {/* Shimmer effect for "About Condo" section */}
          <div className="section-padding">
            <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-6">
              {/* Left side */}
              <div className="flex flex-col gap-3 lg:gap-10 lg:w-[52%] justify-start">
                <div className="w-full animate-pulse h-6 bg-gray-300 rounded mb-4"></div>
                <div className="w-full animate-pulse h-20 bg-gray-300 rounded mb-6"></div>
              </div>
              {/* Right side */}
              <div className="w-full lg:w-[45%] lg:h-[547px] bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Shimmer effect for "Features and Finishes" section */}
          <div className="section-padding">
            <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-6">
              {/* Left side */}
              <div className="flex flex-col gap-3 lg:gap-10 lg:w-[45%] justify-start">
                <div className="w-full animate-pulse h-80 bg-gray-300 rounded mb-4"></div>
              </div>
              {/* Right side */}
              <div className="w-full lg:w-[52%] animate-pulse h-80 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Shimmer effect for "About Developer" section */}
          <div className="section-padding">
            <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-6">
              {/* Left side */}
              <div className="flex flex-col gap-3 lg:gap-10 lg:w-[55%] justify-start">
                <div className="w-full animate-pulse h-6 bg-gray-300 rounded mb-4"></div>
                <div className="w-full animate-pulse h-20 bg-gray-300 rounded mb-6"></div>
              </div>
              {/* Right side */}
              <div className="w-full lg:w-[30%] animate-pulse h-[345px] bg-gray-300 rounded"></div>
            </div>
          </div>
        </>
      )}
      <div className="section-padding">
        <h4 className="project-details-h3 text-left mb-6 lg:mb-10">
          Request more information
        </h4>
        <div>
          <RequestFromInformation Project={project} />
        </div>
      </div>
      {isOpenModal && (
        <Modal visible={isOpenModal} closeModal={handleCloseModal}>
          <DownloadPDFForm Project={project} closeForm={handleCloseModal} />
        </Modal>
      )}
      <Toaster />
    </section>
  );
}

export default ProjectDetailsPage;
