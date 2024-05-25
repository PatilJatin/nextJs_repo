export const getFormattedEmailContentForOwner = function (parsedReqBody: any) {
  const queryContent = parsedReqBody.query
    ? `<div class="info"><label>Query:</label> <span>${parsedReqBody.query}</span></div>`
    : "";
  const { COMPANY_LOGO_URL } = process.env;
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
    <p>Hey,</p>
    <p>A user has tried to contact you. Here are the details:</p>
    <div class="info">
    <label>Name:</label> <span>${parsedReqBody.name}</span>
    </div>
    <div class="info">
    <label>Email:</label> <span>${parsedReqBody.email}</span>
    </div>
    <div class="info">
    <label>Contact No:</label> <span>${parsedReqBody.phoneNo}</span>
    </div>
    ${queryContent}
    <p>Please follow up with the user as soon as possible.</p>
    <p>Thank you, CondoKharido Group</p>
    <div >
    <img  src="https://realtor-website-omlizkpf.s3.ap-south-1.amazonaws.com/450ccf4b-b0a2-48d0-8f50-89622ebe39a9.png" alt="condo-kharido-footer-logo">
    </div>
    </body>
    </html>
    `;
  return emailBody;
};
