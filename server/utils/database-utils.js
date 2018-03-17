import mongoose from 'mongoose';
import '../models/feed';
import { dbConfig } from '../config/config';

mongoose.Promise = global.Promise;
const Feed = mongoose.model('Feed');

export default {
    setUpConnection,
    getFeed,
    getFeedByUid,
    pushDailyAvg,
    pushLive,
    postNewFeed,
    dropFeedCollection
};

function setUpConnection() {
    mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);
}

function getFeed() {
    return Feed.find();
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
        console.log('Collection was fucking dropped!');
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