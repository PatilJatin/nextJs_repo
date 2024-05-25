const { COMPANY_LOGO_URL } = process.env;
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
    .reset-link {
        color: #007bff; /* Blue color for the reset link */
        text-decoration: none;
    }
    .reset-link:hover {
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
  <p>Dear User,</p>
  <p>We received a request to reset the password associated with your email address. If you made this request, please click the button below to reset your password:</p>
  <button><a class="reset-link" href="http://localhost:3000/api/v1/admins/reset-password?token=${token}">Reset Password</a></button>
  <p>If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
  <p>This link is valid for 15 minutes only. If you encounter any issues or need further assistance, please don't hesitate to contact us at: <b>sales@sanjaygupta.me.<b></p>
  <p>Best regards,<br>Condo-Kharido</p>
</body>
</html>
    `;
  return emailBody;
};
