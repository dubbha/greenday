import express from 'express';
import * as db from '../utils/database-utils';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API works!');
});

router.get('/feed', (req, res) => {
    db.getFeed().then(data => res.send(data));
});

router.get('/feed/uids', (req, res) => {
    db.getFeedUids().then(data => res.send(data));
});

router.get('/feed/averages', (req, res) => {
    db.getFeedAverages().then(data => res.send(data));
});

router.get('/feed/top-averages/:count', (req, res) => {
    db.getTopAvgFeeds(req.params.count)
        .then(data => res.send(data));
})

router.get('/feed/:uid', (req, res) => {
    db.getFeedByUid(req.params.uid)
        .then((feed) => res.send(feed))
        .catch((err) => res.send(`Smth went wrong: ${err}`));
});

router.post('/feed', (req, res) => {
    db.postNewFeed(req.body)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => res.send(`Smth went wrong: ${err}`));
});

module.exports = router;