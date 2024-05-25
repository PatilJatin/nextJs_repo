import { getSession } from "next-auth/react";
import { leadsEndpoints } from "./leads.endpoints";
import { api } from "../apiService";
import { LEADS_SOURCE_RESPONSE } from "@/types/leads.types";

export const getAllLeadsTypes = async () => {
  const session = await getSession();
  const res = await api.get(leadsEndpoints.getAllLeadsTypes, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

export const getAllLeadsBySource = async (source: string) => {
  const session = await getSession();
  const res = await api.get(leadsEndpoints.getAllLeadsBySource(source), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

export const filterAllLeadsSource = async (filter: string, source: string) => {
  const session = await getSession();
  console.log(filter, source);

  const res = await api.get(leadsEndpoints.filterLeadsSource, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
    params: {
      q: filter,
      source,
    },
  });
  return res.data;
};

export const deleteLead = async (id: string) => {
  const session = await getSession();
  const res = await api.delete(leadsEndpoints.deleteLead(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

export const createLead = async (data: Partial<LEADS_SOURCE_RESPONSE>) => {
  const session = await getSession();
  const res = await api.post(leadsEndpoints.createLead, data, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

export const exportLeads = async (source: string) => {
  const session = await getSession();
  console.log(source);

  const res = await api.post(
    leadsEndpoints.exportLeads,
    {
      source: source,
    },
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );

  console.log(res.data);

  return res.data;
};
