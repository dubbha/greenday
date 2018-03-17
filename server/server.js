import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';

import { serverConfig } from './config/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('*', (req, res) => res.send('Hello World!'));

const port = serverConfig.port;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => global.console.log(`Server is up and running on localhost:${port}`));
