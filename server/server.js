import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import socketio from 'socket.io';

import { serverConfig } from './config/config';
import { generateRandomUsers, regenerateLiveFeed } from './utils/bot';

import * as db from './utils/database-utils';
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


const io = socketio.listen(server);

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('getLiveData', (uids) => {
    console.log(`data requested for: ${uids}`);
    return db.getLiveDataMultiple(uids)
      .then(data => data.map(el => el.live.pop()))
      .then(data => io.emit('data', data));
  });
});

/**
 * generateRandomUsers (count, drop)
 * @param {number} count - user count
 * @param {boolean} drop - drop database
 */
// generateRandomUsers(20, true);
// regenerateLiveFeed();

