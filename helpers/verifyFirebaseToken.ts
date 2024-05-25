import { adminAuth } from "@/Firebase/firebase";

export const verifyFirebaseToken = async (token: any) => {
  const decodedToken = await adminAuth.verifyIdToken(token);
  return decodedToken;
};
