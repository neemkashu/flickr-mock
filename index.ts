import express from "express";
import request from "request";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const allowedOrigins = [
  /^https?:\/\/deploy-preview-\d+--dancing-toffee-80fbd4\.netlify\.app$/,
  "https://dancing-toffee-80fbd4.netlify.app",
  "https://deploy-preview-9--dancing-toffee-80fbd4.netlify.app",
  "http://localhost:5173",
  "http://localhost:5173/",
  "http://localhost:8080",
  "http://localhost:8080/",
];

app.get("/", (req, res) => {
  const url = "https://api.flickr.com/services/rest";
  console.log("req.url", url + req.url);
  const apiUrl = new URL(url + req.url);

  const apiParam = new URLSearchParams(apiUrl.searchParams);
  apiParam.append("api_key", process.env.API_KEY ?? "");
  apiUrl.search = apiParam.toString();
  const origin = req.get("origin");

  console.debug(origin, "ORIGIN");

  request.get(apiUrl.toString(), (err, response, body) => {
    if (err) {
      console.error(err);
      return res.status(500).send(`Internal server error: ${err}`);
    }

    if (origin === allowedOrigins[3]) {
      res.header("access-control-allow-origin", allowedOrigins[3]);
    } else if (origin === allowedOrigins[2]) {
      res.header("access-control-allow-origin", allowedOrigins[2]);
    }

    res.send(body);
  });
});
app.listen(6106, "0.0.0.0", () => {
  console.log(`Server started on port ${6106}`);
});
