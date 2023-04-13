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
app.listen(8080, '0.0.0.0', () => {
    console.log(`Server started on port ${8080}`);
});