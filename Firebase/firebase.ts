// import { initializeApp } from "firebase/app";
import admin from "firebase-admin";

const serviceAccountKey = {
  type: "service_account",
  project_id: "realtor-web-app",
  private_key_id: "128679e05a31f97ee972a50720cce0238e160854",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMvz/nAEMfZG49\nOptKF2UEXynOEOjDFCMPtPqRZIQZk8nsv1ohPvHsLWaLE41uJed/UHtRdWHBqdEV\nlr7GlL+ElX+6xHBfzTnSvWZTs4TqersO1NDZlRPIW2kn1cSiQtP3DXOC/n2waLjQ\nVBIElIJsa+JSDq03ACPNlI4oaEjig0pDV7m3AayL5uhWk866A7mfLgU5XwBbduYA\nPJ8ULlzg65b62wyRvCVBmy3Wfj4TPJaf7NZakK0CHbrVLFDourlsJReTpS8k7cJG\n/5GZPpuK24x68oR8foEMz+MO+RdLs2NS4mGSkMHFN3wZYLJay/ZEcetfnQjd39lZ\nJsd4LcNtAgMBAAECggEACi3i9S7d53Bki64/fLRDjS9XAnv0Ooikgpomj/Ztm+Dt\nW9QanMcGm42ZSMZQ1H5Vb062xtK9aLWy464iL3jDOcn99vDfvl+TZZ8NeJFXBRpT\ndPYPKRYgjOhAht65nzCP3btBOCzDXnMiZxca6zff8Rh/AMHiija7UPP3Clq+7uXt\nyEh5Ruz4ibbG9uc/Ywt1U4rEevDHKS7DtEA2TuPwxI2Gsu++kS1fRsEzoAyvBSrx\n5kfJnYxQCUh7o/0x6+I5sr0ROJXWbuNRQYwxAll7ORqNM1FTINPiLCLib9TO9XRc\nuDu47ll3A+SLbmKJHE0XewPs4Rg+Xb3EXT8LyP64AQKBgQD1VmumQPfufsD17v5E\nhIqHZV3/KX4+zpq7ze+wdwn8iS0niK/+9NJRvkbRW6BrfG23S0wWX9EkfEMe6Y8Q\n/cnouhyLaN445W1BmA2WBpeKzrlWwUbjmb1jjmCfc8mh7XYeLCik7YV66+JaSSn2\n3OXTbMeQpg3pnAj2r2yzv8JoAQKBgQDVpToNQxDqLGTtG0u9c+O/OCK3dMzZrJuq\n/aVMfyXvcEETvQKl/E1HkfwJ4iRQWgl/8uReDh8MQdmsFprXN6IF3tEjrUvwl8ty\nafcQzZmu46H1x51VQBgmoEYqlZt4GO9p1frgwvKx7l1qVrpWToZvhKTr9aK6dA3+\naq6BUm97bQKBgDCI0TEJp0K6NqgwiIK7icAxUIAbEEuSic/fdKx/UC1yYclxZAfX\nHQho0Q+3xaud6QKa1cmTWQeTwZ+K6u+clWYB84Ws0FGHKa8RSpbEZRRjwwyjnceG\n8Y2RbBH/UQNEu9pKOBwwlPh1U8kysieRGbJS0cQO5a+yW5+ZorKInAgBAoGAOxy1\nPDgjNPfFkQktYqTvDdhlWqc5irzEcYIuu0Su5VoE14ZDdlOhujy9JKrqa0UOPdWh\ntBhqJMUPihrTCts8vC0TZrCrQ01soCKLlp2ceRRImq15bb4HMKDF6UBtvMQBciIf\ngRLPfcW7GRIYCos9jRuBWjwjoz07Jfq0f9mkON0CgYEA068jd8sbxjl9oZQ7ZaDo\nCty24sMyH/SYTQ6Qz+PF1+ClNyGk8nD7M977m0absmR9lM325PVV3kff7y7lxDS8\nkpC/4sDDwZBBcXxILepnKybl8sdbRaaJRBfTnX+L+gNFpbmi3UPsQYIUkBgbanHD\n3ID+tGedXoDmwzKsNcv5Szw=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-gtzps@realtor-web-app.iam.gserviceaccount.com",
  client_id: "102764749643251603386",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gtzps%40realtor-web-app.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// let initialized = false;

// export const initializeFirebase = () => {
//   if (!initialized) {
//     admin.initializeApp({
//       credential: admin.credential.cert(
//         serviceAccountKey as admin.ServiceAccount
//       ),
//       // databaseURL: "https://your-project-id.firebaseio.com", // Replace with your database URL
//     });

//     initialized = true;
//   }
// };

// console.log("Inside firebase.ts file$$$$$$$$$$$$$$$$$$$$$$$$$4");
// Check if the app is already initialized
if (!admin.apps.length) {
  // Initialize the app with your service account key
  admin.initializeApp({
    credential: admin.credential.cert(
      serviceAccountKey as admin.ServiceAccount
    ),
    // databaseURL: "https://your-project-id.firebaseio.com", // Replace with your database URL
  });
}
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),

//   // databaseURL: "https://your-project-id.firebaseio.com", // Replace with your database URL
// });
export const adminAuth = admin.auth();
