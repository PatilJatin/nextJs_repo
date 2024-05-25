"use client";
import InvPropFormProvider from "@/components/investing-properties/form/InvPropFormProvider";
import EditPodcastPage from "@/components/pages/adminpanel/EditPodcastPage";
import Header from "@/components/shared/header/Header";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { mapInvestingInPropertiesToModel } from "@/redux/features/adminpanel/InvestingInProperties/InvestingInProperties.mapper";
import {
  getInvestingInPropertiesAction,
  investingInPropertiesSelector,
} from "@/redux/features/adminpanel/InvestingInProperties/InvestingInProperties.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { INVESTINGINPROPERTY_RESPONSE } from "@/types/investingInPropeties.types";
import React, { useEffect, useState } from "react";

const EditPodcast = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const dispatch = useAppDispatch();
  //   const { status } = useAppSelector(investingInPropertiesSelector);
  const [invProp, setInvProp] = useState<INVESTINGINPROPERTY_RESPONSE>();
  useEffect(() => {
    const fetch = async () => {
      const res = await dispatch(getInvestingInPropertiesAction(id));
      console.log(res.payload.data);
      setInvProp(res.payload.data);
    };
    fetch();
  }, []);
  return (
    <>
      <Header
        description="Edit investing-properties here"
        heading={`Edit investing-properties`}
        backBtn="/adminpanel/investing-properties"
      ></Header>

      <div className="border-b border-tertiary mb-8"></div>

      {status === "loading" ? (
        <div className="h-[50vh]">
          <PrimarySpinner />
        </div>
      ) : (
        invProp && (
          <InvPropFormProvider
            id={id}
            variant="edit"
            editData={mapInvestingInPropertiesToModel(invProp)}
          />
        )
      )}
    </>
  );
};

export default EditPodcast;
