"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_1 = __importDefault(require("request"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    "https://dancing-toffee-80fbd4.netlify.app",
    "https://deploy-preview-9--dancing-toffee-80fbd4.netlify.app",
    "http://localhost:5173",
    "http://localhost:5173/",
    "http://localhost:8080",
    "http://localhost:8080/",
];
app.get("/", (req, res) => {
    var _a;
    const url = "https://api.flickr.com/services/rest";
    console.log("req.url", url + req.url);
    const apiUrl = new URL(url + req.url);
    const apiParam = new URLSearchParams(apiUrl.searchParams);
    apiParam.append("api_key", (_a = process.env.API_KEY) !== null && _a !== void 0 ? _a : "");
    apiUrl.search = apiParam.toString();
    const originIncome = req.get("origin");
    console.debug(originIncome, "ORIGIN");
    request_1.default.get(apiUrl.toString(), (err, response, body) => {
        if (err) {
            console.error(err);
            return res.status(500).send(`Internal server error: ${err}`);
        }
        const allowedOrigin = allowedOrigins.find((value) => value === originIncome);
        res.header("access-control-allow-origin", allowedOrigin);
        res.send(body);
    });
});
app.listen(6106, "0.0.0.0", () => {
    console.log(`Server started on port ${6106}`);
});
