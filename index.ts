import express from 'express';
import request from 'request';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    const url = 'https://api.flickr.com/services/rest';
    console.log('req.url', url + req.url)
    const apiUrl = new URL(url + req.url);

    const apiParam = new URLSearchParams(apiUrl.searchParams);
    apiParam.append('api_key', process.env.API_KEY ?? '');
    apiUrl.search = apiParam.toString();

    request.get(apiUrl.toString(), (err, response, body) => {
        if (err) {
            console.error(err);
            return res.status(500).send(`Internal server error: ${err}`);
        }

        res.send(body);
    });
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.listen(8080, '0.0.0.0', () => {
    console.log(`Server started on port ${8080}`);
});