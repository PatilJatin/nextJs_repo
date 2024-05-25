const { COMPANY_LOGO_URL } = process.env;
export const getFormattedEmailContent = function (
  projectInfo: any,
  userInfo: any
) {
  const attachmentsHTML = projectInfo.attachments
    .map(
      (attachment: any) =>
        `<div class="info">
       <label>${attachment.title}:</label> <span>${attachment.location}</span>
     </div>`
    )
    .join("");
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
        .info {
          margin-bottom: 15px;
        }
        .info label {
            font-weight: bold;
            color: #333;
            display: inline-block;
            width: 100px; /* Adjust width as needed */
        }
        .info span {
            color: #666;
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
    Hey ${userInfo.name},
    <br>
    <br>
  
    Please find the requested attachments for project:- "${projectInfo.name}" below
    <br>
    <br>
    ${attachmentsHTML}
   
    <br>
    <p>Thank you, CondoKharido Group</p>
    <div >
    <img  src="https://realtor-website-omlizkpf.s3.ap-south-1.amazonaws.com/450ccf4b-b0a2-48d0-8f50-89622ebe39a9.png" alt="condo-kharido-footer-logo">
    </div>
    </body>
    </html>
    `;
  return emailBody;
};
