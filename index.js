const express = require("express");

const app = express();
const port = 8888;

const currentDate = new Date();
const currentTimestamp = currentDate.getTime();

// Function to check if a timestamp is within +/- 2 seconds of the current time
function isWithinTwoSeconds(timestamp) {
  const currentTimestamp = Date.now();
  const acceptableWindow = 2000; // 2 seconds in milliseconds
  const minTimestamp = currentTimestamp - acceptableWindow;
  const maxTimestamp = currentTimestamp + acceptableWindow;
  return timestamp >= minTimestamp && timestamp <= maxTimestamp;
}

const slack_name = "Excel";
const current_day = currentDate.toLocaleDateString("en-US", {
  weekday: "long",
});
const utc_time = currentDate.toISOString();
const track = "backend";
const github_file_url =
  "https://github.com/Peter-TMK/HNGx_BE1/blob/main/index.js";
const github_repo_url = "https://github.com/Peter-TMK/HNGx_BE1";
const status_code = isWithinTwoSeconds(currentTimestamp) ? 200 : 400;

// Create the details object
const details = {
  slack_name,
  current_day,
  utc_time,
  track,
  github_file_url,
  github_repo_url,
  status_code,
};

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  if (!slack_name || !track) {
    return res
      .status(400)
      .json({ error: "Slack name and/or track is/are not included!" });
  }
  console.log(details);
  res.status(200).json(details);
});

app.listen(port, () => {
  console.log("Server running now!");
});
