import NextAuth from "next-auth/next";

const { COMPANY_LOGO_URL, NEXTAUTH_URL } = process.env;
export const getFormattedEmailContent = function (token: any) {
  const emailBody = `
  <html>
  <head>
    <style>
      body {
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          background-color: #f2f2f2; /* Grey background */
          padding: 20px;
          color: #000; /* Black text */
      }
      .unsubscribe-link {
          color: #007bff; /* Blue color for the unsubscribe link */
          text-decoration: none;
      }
      .unsubscribe-link:hover {
          text-decoration: underline; /* Underline on hover */
      }
       .logo-container {
        text-align: center;
      }
      .logo {
        width: 200px; 
        height: auto; 
      }
     
    </style>
  </head>
  <body>
  <div class="logo-container">
    <img class="logo" src=${COMPANY_LOGO_URL} alt="condo-kharido-logo">
  </div>
    <p>Hey,</p>
    <p>We noticed that you have subscribed to our service.</p>
    <p>If you have any questions or concerns, feel free to reply at: <b>sales@sanjaygupta.me</b>. We're here to help!</p>
   <p>Thank you, CondoKharido Group</p>
    <div >
    <img  src="https://realtor-website-omlizkpf.s3.ap-south-1.amazonaws.com/450ccf4b-b0a2-48d0-8f50-89622ebe39a9.png" alt="condo-kharido-footer-logo">
    </div>
    <hr> <!-- Separator line -->
    <p style="font-size: smaller;">If you wish to unsubscribe from our service, simply click <a class="unsubscribe-link" href="${NEXTAUTH_URL}/api/v1/subscribedUsers/removeUser/?token=${token}">here</a>.</p>
  </body>
  </html>
  
    `;
  return emailBody;
};
