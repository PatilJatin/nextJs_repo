import { getSession } from "next-auth/react";
import { InvestingInPropertiesEndpoints } from "./InvestingInProperties.endpoints";
import { api } from "../apiService";
import { LEADS_SOURCE_RESPONSE } from "@/types/leads.types";
import {
  INVESTINGINPROPERTY_FORM_FIELDS,
  INVESTINGINPROPERTY_RESPONSE,
} from "@/types/investingInPropeties.types";

export const getAllInvestingInProperties = async () => {
  const session = await getSession();
  const res = await api.get(
    InvestingInPropertiesEndpoints.getAllInvestingInProperties,
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteInvestingInProperties = async (id: string) => {
  const session = await getSession();
  const res = await api.delete(
    InvestingInPropertiesEndpoints.deleteInvestingInProperties(id),
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );
  return res.data;
};

export const createInvestingInProperties = async (
  data: Partial<INVESTINGINPROPERTY_RESPONSE>
) => {
  const session = await getSession();
  console.log(data);

  const res = await api.post(
    InvestingInPropertiesEndpoints.createInvestingInProperties,
    data,
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );
  return res.data;
};

export const getInvestingInProperties = async (id: string) => {
  const session = await getSession();
  const res = await api.get(
    InvestingInPropertiesEndpoints.getInvestingInPropertiesById(id),
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );
  return res.data;
};

export const updateInvestingInProperties = async (
  id: string,
  data: Partial<INVESTINGINPROPERTY_FORM_FIELDS>
) => {
  const session = await getSession();
  const res = await api.patch(
    InvestingInPropertiesEndpoints.updateInvestingInProperties(id),
    {
      title: data.title,
      description: data.description,
      imageSrc: data.imageSrc,
      isImageRightSide: data.isImageRightSide,
    },
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );

  return res.data;
};
