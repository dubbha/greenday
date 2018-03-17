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
    pushLive
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

function pushDailyAvg(data) {
    return Feed.update(
        { uid: data.uid },
        { $push: {dailyAvg: data.dailyAvg}}
    );
}

function pushLive(date) {
    return Feed.update(
        { uid: data.uid },
        { $push: {live: data.live}}
    );
}