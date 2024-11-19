// const express = require("express");
// const bodyParser = require("body-parser");
// const axios = require("axios");

// const app = express();
// const port = 3000;

// // Retell AI API credentials
// const retellApiKey = "YOUR_RETELL_API_KEY";

// // Middleware to parse JSON payloads
// app.use(bodyParser.json());

// // Webhook route that Vonage will send call events to
// app.post("/vonage-webhook", async (req, res) => {
//   try {
//     const recordingUrl = req.body.recording_url; // Vonage will send the recording URL in the webhook payload
//     console.log("Received recording URL:", recordingUrl);

//     // Step 1: Download the call recording from Vonage
//     const recordingResponse = await axios.get(recordingUrl, {
//       responseType: "arraybuffer",
//     });
//     const recordingData = recordingResponse.data;

//     // Step 2: Send the recording to Retell AI for transcription and summarization
//     const formData = new FormData();
//     formData.append("file", recordingData, "call_recording.mp3");

//     const retellResponse = await axios.post(
//       "https://api.retellai.com/transcribe", // Replace with Retell AI or your service's URL
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${retellApiKey}`,
//           ...formData.getHeaders(), // This is necessary for multipart form data
//         },
//       }
//     );

//     // Step 3: Process the summary response from Retell AI
//     if (retellResponse.status === 200) {
//       const { summary } = retellResponse.data;
//       console.log("Summary:", summary);

//       // Send a success response back to Vonage (optional)
//       res
//         .status(200)
//         .send({ message: "Recording processed and summarized", summary });
//     } else {
//       res.status(500).send({ error: "Failed to process recording" });
//     }
//   } catch (error) {
//     console.error("Error processing Vonage webhook:", error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require("express");
const bodyParser = require("body-parser");
const { Vonage } = require("@vonage/server-sdk");

const app = express();
app.use(bodyParser.json());

const vonage = new Vonage({
  applicationId: "5bd2d62f-2aa9-423c-baaf-f339e98b0765",
  privateKey: "./private.key", // Path to the downloaded private key
});

// Webhook to handle incoming calls
app.post("/webhooks/answer", (req, res) => {
  const ncco = [
    {
      action: "talk",
      text: "Hello, you have reached our service!",
    },
  ];
  res.json(ncco);
});

// Webhook to handle call events
app.post("/webhooks/event", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
