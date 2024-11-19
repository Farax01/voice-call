const { Vonage } = require("@vonage/server-sdk");
const { NCCOBuilder, Talk } = require("@vonage/voice");

const vonage = new Vonage({
  applicationId: "5bd2d62f-2aa9-423c-baaf-f339e98b0765",
  privateKey: './private.key',
});

const builder = new NCCOBuilder();
builder.addAction(new Talk("This is a text to speech call from Vonage"));

vonage.voice
  .createOutboundCall({
    ncco: builder.build(),
    to: [
      {
        type: "phone",
        number: "(+1) 4242694686",
      },
      {
        type: "phone",
        number: "(+1) 4242694686",
      },
    ],
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));