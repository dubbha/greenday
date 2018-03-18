import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FeedSchema = new Schema({
    uid: {type: String, required: true},
    dailyAvg: [{ date: Number, value: Number}],
    live: [{ date: Number, value: Number}],
    kwh: {type: Number}
});

mongoose.model('Feed', FeedSchema);