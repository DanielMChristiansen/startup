const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.get("/corsbypass", (req, res) => {
  /*
    const xhr = new XMLHttpRequest();
    const urlToFetch = "https://example.com"; // Replace with the URL you want to fetch

    xhr.open("GET", `/corsbypass?url=${encodeURIComponent(urlToFetch)}`, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("Response:", xhr.responseText);
            } else {
                console.error("Error fetching the URL");
            }
        }
    };

    xhr.send();
    */
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("URL query parameter is required");
  }

  axios
    .get(targetUrl)
    .then((response) => {
      res.set(response.headers);
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching the requested URL");
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
