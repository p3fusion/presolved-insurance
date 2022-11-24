/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_PSEMAILBUCKET_BUCKETNAME
Amplify Params - DO NOT EDIT */ const {
  downloadMessage,
} = require("/opt/downloadMessage");
const { getAttachments } = require("/opt/getAttachments");
const { downloadAttachment } = require("/opt/downloadAttachment");
const { markEmailRead } = require("/opt/markEmailRead");
const AWS = require("aws-sdk");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  let clientId = "32c21b01-f645-4433-8726-456c9f46958e";
  let tenantId = "b0a714c6-6ab2-43b2-aae0-5e855bb3752f";
  let region = "us-east-1";
  let secretName = "presolved/dev/email/p3fusion";

  //Get Message Id from event
  let message = event.detail;
  console.log("Message Id: ", message.messageId);
  let messageId = message.messageId;

  const messagePage = await downloadMessage(
    "presolved-support@p3fusion.com",
    clientId,
    secretName,
    region,
    tenantId,
    messageId
  );

  console.log("Message: ", messagePage);

  let content = messagePage.body.content;

  let attachments = await getAttachments(
    "presolved-support@p3fusion.com",
    clientId,
    secretName,
    region,
    tenantId,
    messageId
  );

  console.log("Attachments: ", attachments);

  //reg ex expression to get the src of image
  let regex = /src="([^"]*)"/g;

  // Replace cid:image in the email body with the actual image URL
  let cidImage = content.match(regex);
  if (cidImage) {
    cidImage.forEach((image) => {
      console.log("Cid", image);
      let matchingAttachment = attachments.value.find(
        (attachment) =>
          image.indexOf(attachment.name) > -1 && attachment.isInline === true
      );
      console.log("Matching Attachment", matchingAttachment);
      let newSrc = `src="${matchingAttachment.name}"`;
      content = content.replace(image, newSrc);
    });
  }

  //Write the Email Body to S3
  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.STORAGE_PSEMAILBUCKET_BUCKETNAME,
    Key: `${messageId}/message.html`,
    Body: content,
  };

  s3.putObject(params, function (err, data) {
    if (err) console.log("Error writing email to S3", err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });

  //Download Attachments
  attachments.value.forEach(async (attachmentItem) => {
    let attachment = await downloadAttachment(
      "presolved-support@p3fusion.com",
      clientId,
      secretName,
      region,
      tenantId,
      messageId,
      attachmentItem.id
    );
    //Save ms graph attachment to a file
    console.log("Attachment: ", attachment);

    attachment.arrayBuffer().then((buffer) => {
      //Write attachment to S3
      const s3 = new AWS.S3();
      const params = {
        Bucket: process.env.STORAGE_PSEMAILBUCKET_BUCKETNAME,
        Key: `${messageId}/${attachmentItem.name}`,
        Body: Buffer.from(buffer),
      };

      s3.putObject(params, function (err, data) {
        if (err) console.log(err, err.stack);
        // an error occurred
        else console.log(data); // successful response
      });
    });
  });

  //Mark Email as Read
  let markEmail = await markEmailRead(
    "presolved-support@p3fusion.com",
    clientId,
    secretName,
    region,
    tenantId,
    messageId
  );

  console.log("Mark Email: ", markEmail);

  return {
    statusCode: 200,
    messages: markEmail,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify(markEmail),
  };
};
