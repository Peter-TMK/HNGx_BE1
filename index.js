// const express = require("express");

// const app = express();
// const port = 8888;

// const currentDate = new Date();
// const currentTimestamp = currentDate.getTime();

// // Function to check if a timestamp is within +/- 2 seconds of the current time
// function isWithinTwoSeconds(timestamp) {
//   const currentTimestamp = Date.now();
//   const acceptableWindow = 2000; // 2 seconds in milliseconds
//   const minTimestamp = currentTimestamp - acceptableWindow;
//   const maxTimestamp = currentTimestamp + acceptableWindow;
//   return timestamp >= minTimestamp && timestamp <= maxTimestamp;
// }
// // function formatDateToISOWithoutMilliseconds(currentDate) {
// //   const year = currentDate.getUTCFullYear();
// //   const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
// //   const day = String(currentDate.getUTCDate()).padStart(2, "0");
// //   const hours = String(currentDate.getUTCHours()).padStart(2, "0");
// //   const minutes = String(currentDate.getUTCMinutes()).padStart(2, "0");
// //   const seconds = String(currentDate.getUTCSeconds()).padStart(2, "0");

// //   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
// // }

// const slack_name = "Excel";
// const current_day = currentDate.toLocaleDateString("en-US", {
//   weekday: "long",
// });
// // const utc_time = formatDateToISOWithoutMilliseconds(currentDate);
// const utc_time = new Date().toISOString();
// // .slice(0, 19) + "Z";

// const track = "backend";
// const github_file_url =
//   "https://github.com/Peter-TMK/HNGx_BE1/blob/main/index.js";
// const github_repo_url = "https://github.com/Peter-TMK/HNGx_BE1";
// const status_code = isWithinTwoSeconds(currentTimestamp) ? 200 : 400;

// // Create the details object
// const details = {
//   slack_name,
//   current_day,
//   utc_time,
//   track,
//   github_file_url,
//   github_repo_url,
//   status_code,
// };

// app.get("/api", (req, res) => {
//   const { slack_name, track } = req.query;

//   if (!slack_name || !track) {
//     return res
//       .status(400)
//       .json({ error: "Slack name and/or track is/are not included!" });
//   }
//   //   console.log(Date.now()); 2023-09-08T10:26:05Z
//   //   console.log(new Date());
//   //   console.log(currentDate);
//   //   console.log(details.utc_time);
//   //   console.log(new Date());
//   //   console.log(Date.now());
//   //   console.log(Date.now());
//   //   console.log(utc_time);
//   //   console.log(details.utc_time);
//   res.status(200).json(details);
// });

// app.listen(port, () => {
//   console.log("Server running now!");
// });

////////////////////////////////////////////////////////////////////////////////

const express = require("express");

const app = express();
const port = 8888;

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  if (!slack_name || !track) {
    res
      .status(400)
      .json({ error: "slack_name and track are required query parameters" });
    return;
  }

  const currentDate = new Date();
  const currentDayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const currentUTCTime = new Date(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
  ).toISOString();
  const githubFileURL =
    "https://github.com/Peter-TMK/HNGx_BE1/blob/main/index.js";
  const githubRepoURL = "https://github.com/Peter-TMK/HNGx_BE1";

  // Create the response object adhering to the JSON format
  const response = {
    slack_name,
    current_day: currentDayOfWeek,
    utc_time: currentUTCTime,
    track,
    github_file_url: githubFileURL,
    github_repo_url: githubRepoURL,
    status_code: 200,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log("Server running now!");
});
