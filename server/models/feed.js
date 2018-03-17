import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FeedSchema = new Schema({
    uid: {type: String, required: true},
    dailyAvg: [{ date: Date, value: Number}],
    live: [{ time: Date, value: Number}]
});

mongoose.model('Feed', FeedSchema);