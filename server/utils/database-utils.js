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

// export function getTopFeeds(topCount) {
//     return Feed.find
// }

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
    console.log(data);
    return Feed.update(
        { uid: data.uid },
        { $push: {live: data.live}}
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
    .select({ _id: 0 })
    .sort({ date: 1 });
}