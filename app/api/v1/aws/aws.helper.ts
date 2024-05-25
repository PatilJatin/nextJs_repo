// awsConfig.js
import AWS from "aws-sdk";

console.log("Inside AWS helper#######################################");
const { ACCESS_KEY, SECRET_KEY, REGION, SOURCE_EMAIL } = process.env;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
});

async function sendEmailFuntion(
  toAddressess: string[],
  htmlBody: string,
  subject: string
) {
  const emailParameters: any = {
    Destination: {
      ToAddresses: toAddressess,
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: SOURCE_EMAIL,
  };

  const ses = new AWS.SES();
  return await ses.sendEmail(emailParameters).promise();
}

export { AWS, sendEmailFuntion };
