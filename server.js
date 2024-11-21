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

"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// NCCO to answer the call and prompt for input
app.get("/webhooks/answer", (req, res) => {
  const ncco = [
    {
      action: "talk",
      bargeIn: true,
      text: "Hello. Please enter a digit to proceed.",
    },
    {
      action: "input",
      dtmf: {
        maxDigits: 1,
        timeout: 10,
      },
    },
  ];

  res.json(ncco); // Respond with the NCCO
});

// Endpoint to handle events, such as DTMF input
app.post("/webhooks/events", (req, res) => {
  console.log("Event Received:", req.body);

  // Check if DTMF input was received
  if (req.body.dtmf && req.body.dtmf.digits) {
    const digit = req.body.dtmf.digits;

    // Handle the digit pressed
    let ncco;
    switch (digit) {
      case "1":
        // Example: Redirect to another number
        ncco = [
          {
            action: "talk",
            text: "You pressed 1. Redirecting your call now.",
          },
          {
            action: "connect",
            endpoint: [
              {
                type: "phone",
                number: "+14242694686", // Replace with the desired phone number
              },
            ],
          },
        ];
        break;

      case "2":
        ncco = [
          {
            action: "talk",
            text: "You pressed 2. Thank you for your input.",
          },
        ];
        break;

      default:
        ncco = [
          {
            action: "talk",
            text: "Invalid input. Please try again.",
          },
          {
            action: "input",
            dtmf: {
              maxDigits: 1,
              timeout: 10,
            },
          },
        ];
        break;
    }

    res.json(ncco);
  } else {
    console.log("No DTMF input detected.");
    res.status(200).send(); // Send a generic acknowledgment
  }
});

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  console.log("Request Body:", req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from Heroku!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));