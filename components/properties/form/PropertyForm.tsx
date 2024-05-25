import React from "react";
import OverviewSection from "./OverviewSection";
import { useFormContext } from "react-hook-form";
import { PROPERTY_FORM_FIELDS } from "./PropertyFormProvider";
import AboutCondoSection from "./AboutCondoSection";
import FeaturesSection from "./FeaturesSection";
import AboutDeveloperSection from "./AboutDeveloperSection";
import PrimaryButton from "@/components/shared/buttons/PrimaryButton";
import UploadFilesSection from "./UploadFilesSection";
import { getPropertiesFormData } from "@/helpers/adminpanel/properties/getPropertiesFormData";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import {
  addPropertyAction,
  propertiesSelector,
  updatePropertyAction,
} from "@/redux/features/adminpanel/properties/properties.slice";
import { Toaster } from "react-hot-toast";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { useRouter } from "next/navigation";

const PropertyForm = ({
  id,
  variant,
}: {
  id: string;
  variant?: "edit" | "create";
}) => {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useFormContext<PROPERTY_FORM_FIELDS>();

  const dispatch = useAppDispatch();
  const { status } = useAppSelector(propertiesSelector);

  const isEditForm = variant === "edit";

  const router = useRouter();

  const onFormSubmit = async (data: PROPERTY_FORM_FIELDS) => {
    if (!isEditForm) {
      console.log(data);

      await dispatch(addPropertyAction(getPropertiesFormData(data)));
      if (status === "succeeded") {
        router.push(`/adminpanel/properties`);
      }
    } else {
      // update api call
      await dispatch(
        updatePropertyAction({ id, data: getPropertiesFormData(data) })
      );
      if (status === "succeeded") {
        router.push(`/adminpanel/properties`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <OverviewSection />
      <div className="border-b border-tertiary my-8"></div>
      <AboutCondoSection />
      <div className="border-b border-tertiary my-8"></div>
      <FeaturesSection />
      <div className="border-b border-tertiary my-8"></div>
      <AboutDeveloperSection />
      <div className="border-b border-tertiary my-8"></div>
      <UploadFilesSection />
      <div className="mt-14 flex justify-center">
        <div className="inline-block">
          <PrimaryButton disabled={!isValid}>
            {status === "loading" ? (
              <PrimarySpinner />
            ) : isEditForm ? (
              "Edit Property"
            ) : (
              "Add Property"
            )}
          </PrimaryButton>
        </div>
      </div>
      <Toaster />
    </form>
  );
};

export default PropertyForm;
