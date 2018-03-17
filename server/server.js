import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import { serverConfig } from './config/config';
import { generateRandomUsers } from './utils/bot';

import db from './utils/database-utils';
import api from './routes/api';

const app = express();

db.setUpConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', api);
app.get('*', (req, res) => res.send('Hello World!'));

const port = serverConfig.port;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => global.console.log(`Server is up and running on localhost:${port}`));

generateRandomUsers(10);
