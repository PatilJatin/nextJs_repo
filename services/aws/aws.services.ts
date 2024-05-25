import { File } from "buffer";
import { api } from "../apiService";
import { awsEndpoints } from "./aws.endpoints";

const getPreSignedUrl = async (fileName: string) => {
  const res = await api.post(awsEndpoints.getPreSignedUrl, {
    fileType: fileName,
  });
  return res.data;
};

const uploadFileToAws = async (preSignedUrl: string, file: any) => {
  const res = await api.put(preSignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  return res.data;
};

const deleteImageFromAws = async (key: string) => {
  const res = await api.delete(awsEndpoints.deleteImage, {
    data: {
      key: key,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export { getPreSignedUrl, uploadFileToAws, deleteImageFromAws };
