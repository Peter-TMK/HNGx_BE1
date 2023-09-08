const express = require("express");

const app = express();
const port = 8888;

const currentDate = new Date();
const details = {
  slack_name: "Excel",
  current_day: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
  utc_time: currentDate.toISOString(),
  track: "backend",
  github_file_url: "https://github.com/username/repo/blob/main/file_name.ext",
  github_repo_url: "https://github.com/Peter-TMK/HNGx_BE1",
  status_code: 200,
};

app.get("/", (req, res) => {
  console.log(currentDate.toLocaleDateString("en-US", { weekday: "long" }));
  console.log(currentDate.toISOString());
  console.log(Date.now());
  console.log(new Date().getTime());
  console.log(details);
  res.send(details);
});

app.listen(port, () => {
  console.log("Server running now!");
});
