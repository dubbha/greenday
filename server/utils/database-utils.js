import mongoose from 'mongoose';
import '../models/feed';
import { dbConfig } from '../config/config';

mongoose.Promise = global.Promise;
const Feed = mongoose.model('Feed');

export default {
    setUpConnection,
    getFeed,
    getFeedUids,
    getFeedByUid,
    pushDailyAvg,
    pushLive,
    postNewFeed,
    dropFeedCollection,
    getLiveData,
    getLiveDataMultiple,
    postNewFeed
};

function setUpConnection() {
    mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);
}

function getFeed() {
    return Feed.find();
}

function getFeedUids() {
    return Feed.find({})
        .select({ uid: 1, _id: 0 })
}

function getFeedByUid(uid) {
    return Feed.find({uid});
}

function postNewFeed(data) {
    const feed = new Feed({
        uid: data.uid,
        dailyAvg: data.dailyAvg,
        live: data.live
    });
    return feed.save();
}

function dropFeedCollection() {
    mongoose.connection.collections.feeds.drop((err) => {
        console.log('Collection was dropped!');
    });
}

function pushDailyAvg(data) {
    return Feed.update(
        { uid: data.uid },
        { $push: {dailyAvg: data.dailyAvg}}
    );
}

function pushLive(data) {
    return Feed.update(
        { uid: data.uid },
        { $push: {live: data.live}}
    );
}

function postNewFeed(data) {
    const feed = new Feed({
        uid: data.uid,
        dailyAvg: data.dailyAvg,
        live: data.live
    });
    return feed.save();
}

function getLiveData(uid) {
    return Feed.find({
        'uid': uid
    })
    .sort({ date: -1 })
    .limit(1);
}

function getLiveDataMultiple(uids) {
    return Feed.find({
        'uid': { $in: uids }
    })
    .select({ "_id": 0 })
    .sort({ date: 1 });
}