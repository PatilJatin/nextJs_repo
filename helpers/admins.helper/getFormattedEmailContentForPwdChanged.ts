const { COMPANY_LOGO_URL } = process.env;

export const getFormattedEmailContent = function () {
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
  <p>Your password has been successfully changed.</p>
  <p>If you did not initiate this change or believe your account has been compromised, please contact our support team immediately.</p>
  <p>If you have any questions or need further assistance, feel free to reach out to us at: <b>sales@sanjaygupta.me</b>.</p>
  <p>Best regards,<br>Condo-Kharido</p>
</body>
</html>
    `;
  return emailBody;
};
