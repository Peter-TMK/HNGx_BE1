const express = require("express");

const app = express();
const port = 8888;

const currentDate = new Date();
const currentTimestamp = currentDate.getTime();

// Create the details object
const details = {
  slack_name: "Excel",
  current_day: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
  utc_time: currentDate.toISOString(),
  track: "backend",
  github_file_url: "https://github.com/Peter-TMK/HNGx_BE1/blob/main/index.js",
  github_repo_url: "https://github.com/Peter-TMK/HNGx_BE1",
  status_code: isWithinTwoSeconds(currentTimestamp) ? 200 : 400,
};

// Function to check if a timestamp is within +/- 2 seconds of the current time
function isWithinTwoSeconds(timestamp) {
  const currentTimestamp = Date.now();
  const acceptableWindow = 2000; // 2 seconds in milliseconds
  const minTimestamp = currentTimestamp - acceptableWindow;
  const maxTimestamp = currentTimestamp + acceptableWindow;
  return timestamp >= minTimestamp && timestamp <= maxTimestamp;
}

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
