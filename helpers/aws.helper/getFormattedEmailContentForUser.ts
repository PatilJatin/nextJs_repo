export const getFormattedEmailContentForUser = function (parsedReqBody: any) {
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
    <p>Hello ${parsedReqBody.name},</p>
    <p>Thank you for your submission, we will be in contact with you within 1 business day.</p>
    <p>Details filled by you are as follows:-</p>
    <hr>
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

    <hr>
    <br>
    <p>Please visit <a href="https://wip.condokharido.ca/">Condo Kharido</a> for more information.</p>
    <p>Thank you, CondoKharido Group</p>
    <div >
    <img  src="https://realtor-website-omlizkpf.s3.ap-south-1.amazonaws.com/450ccf4b-b0a2-48d0-8f50-89622ebe39a9.png" alt="condo-kharido-footer-logo">
    </div>
    </body>
    </html>
    `;
  return emailBody;
};
