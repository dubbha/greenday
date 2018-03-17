import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FeedSchema = new Schema({
    uid: {type: String, required: true},
    dailyAvg: [{ date: Date, value: Number}],
    live: [{ date: Date, value: Number}],
    kwh: {type: Number}
});

mongoose.model('Feed', FeedSchema);