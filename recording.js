// const axios = require("axios");

// // Vonage API credentials
// const apiKey = "YOUR_API_KEY";
// const apiSecret = "YOUR_API_SECRET";
// const toNumber = "TO_PHONE_NUMBER";
// const fromNumber = "FROM_PHONE_NUMBER";
// const answerUrl = "YOUR_ANSWER_URL"; // This will handle the call events

// // Function to initiate the call
// async function initiateCall() {
//   try {
//     const response = await axios.post(
//       "https://api.nexmo.com/v1/calls",
//       {
//         to: [{ type: "phone", number: toNumber }],
//         from: { type: "phone", number: fromNumber },
//         answer_url: [answerUrl],
//         record: "true", // Enable call recording
//       },
//       {
//         auth: {
//           username: apiKey,
//           password: apiSecret,
//         },
//       }
//     );
//     console.log("Call initiated:", response.data);
//   } catch (error) {
//     console.error("Error initiating call:", error);
//   }
// }

// initiateCall();
