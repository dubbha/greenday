import mongoose from 'mongoose';
import '../models/feed';
import { dbConfig } from '../config/config';

mongoose.Promise = global.Promise;
const Feed = mongoose.model('Feed');

/**
 * setUpConnection
 * dropFeedCollection
 * 
 * getFeed     - whole feed collection
 * getFeedUids - all existing uids
 * getFeedUidsPower - uids and powers (uid & kwh)
 * getFeedByUid - find feed with passed uid
 * pushDailyAvg - find feed by uid and push value in dailyAvg
 * getFeedAverages - get all entities and its dailyAvg
 * pushLive     - find feed by uid and push value in live
 * postNewFeed  - create new feed instanse
 * getLiveData  - get last live value
 * getLiveDataMultiple - get last live values of multiple feed instances
 * 
 */

export function setUpConnection() {
    mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);
}

export function getFeed() {
    return Feed.find();
}

export function getFeedUids() {
    return Feed.find({})
        .select({ uid: 1, _id: 0 })
}

export function getTopAvgFeeds(count) {
    return getFeedAverages()
        .then((feeds) => {
            const totals = [];
            feeds.forEach((feed) => {
                const uid = feed.uid;
                const totalAvg = feed.dailyAvg.reduce((sum, cur) => sum + cur.value, 0) / feeds.length;
                totals.push({uid, totalAvg});
            });
            return totals
                .sort((a, b) => a.totalAvg - b.totalAvg)
                .slice(feeds.length - count);
        });
}

export function getFeedAverages() {
    return Feed.find({})
        .select({ uid: 1, _id: 0, dailyAvg: 1, kwh: 1});
}

export function getFeedUidsPower() {
    return Feed.find({})
        .select({ uid: 1, kwh: 1, _id: 0 });
}

export function getFeedByUid(uid) {
    return Feed.find({uid})
        .select({ _id: 0 });
}

export function dropFeedCollection() {
    mongoose.connection.collections.feeds.drop((err) => {
        console.log('Collection was dropped!');
    });
}

export function pushDailyAvg(data) {
    return Feed.update(
        { uid: data.uid },
        { $push: {dailyAvg: data.dailyAvg}}
    );
}

export function updateFeeds(data) {
    return Feed.update({}, data, { upsert : true });
}

export function pushLive(data) {
    return Feed.update(
        { uid: data.uid },
        { $push: {live: data.live}},
        (err, res) => {}
    );
}

export function postNewFeed(data) {
    const feed = new Feed({
        uid: data.uid,
        dailyAvg: data.dailyAvg,
        live: data.live,
        kwh: data.kwh
    });
    return feed.save();
}

export function getLiveData(uid) {
    return Feed.find({
        'uid': uid
    })
    .select({ _id: 0 })
    .sort({ date: -1 })
    .limit(1);
}

export function getLiveDataMultiple(uids) {
    return Feed.find({
        'uid': { $in: uids }
    })
    // .select({ _id: 0 })
    // .sort({ "live.date": -1});
}