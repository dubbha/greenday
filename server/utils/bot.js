import * as     db from '../utils/database-utils';
import {
    dailyAvgGenerationByMonthPerKwhPower as dailyRates,
    hourlyGenerationPercentage as hourlyRates
} from '../mock-data/rates.json';

const RAND_MIN = 0.89;
const RAND_MAX = 1.11;

export function generateRandomUsers(userCount, drop = false) {
    const kwhs = [5, 10, 15, 20, 30];
    if (drop) {
        db.dropFeedCollection();
    }

    for (let i = userCount; i > 0; i--) {
        const uid = '_' + Math.random().toString(36).substr(2, 9);
        const kwh = kwhs[i % 5];

        db.postNewFeed({
            uid,
            dailyAvg: generateAvgFeed(kwh),
            live: generateLiveFeed(kwh, uid),
            kwh
        });
    }
}

function generateAvgFeed(kwh) {
    const fromDate = new Date(2018, 2);
    const toDate = new Date(2018, 9, 20);
    
    const dailyAvg = [];
    
    for (let date = fromDate; date.getTime() < toDate.getTime(); date.setDate(date.getDate() + 1)) {
        const rand = Math.random().toFixed(3) * (RAND_MAX - RAND_MIN) + RAND_MIN;

        const rate = dailyRates[date.getMonth()] < dailyRates[date.getMonth() + 1]
            ? dailyRates[date.getMonth()] + (dailyRates[date.getMonth() + 1] - dailyRates[date.getMonth()]) * (date.getDate() / 30)
            : dailyRates[date.getMonth()] - (dailyRates[date.getMonth()] - dailyRates[date.getMonth() + 1]) * (date.getDate() / 30)

        const value = kwh * rate * rand;
        dailyAvg.push({
            date: new Date(date.getTime()).getTime(),
            value
        });
    }

    return dailyAvg;
}

function generateLiveFeed(kwh, uid) {
    const fakeTime = getFakeTime();
    const live = [];

    for (let time = new Date(2018, 9, 20); time.getTime() < fakeTime.getTime(); time.setSeconds(time.getSeconds() + 10)) {
        const rand = Math.random().toFixed(3) * (RAND_MAX - RAND_MIN) + RAND_MIN;
        const value = kwh * dailyRates[fakeTime.getMonth()] * (hourlyRates[time.getHours()] || 0) * rand;
        live.push({
            date: new Date(time.getTime()).getTime(),
            value: value
        });
    }

    startPush({kwh, uid});

    return live;
}

function getFakeTime() {
    const realToday = new Date();
    const realTime = [realToday.getHours(), realToday.getMinutes(), realToday.getSeconds()];
    return new Date(2018, 9, 20, ...realTime);
}

export function regenerateLiveFeed() {
    db.getFeed()
        .then((feeds) => {
            feeds.forEach((feed) => {
                db.updateFeeds({
                    uid: feed.uid,
                    dailyAvg: feed.dailyAvg,
                    live: generateLiveFeed(feed.kwh, feed.uid),
                    kwh: feed.kwh
                });
            })
        })
}


function startPush({uid, kwh}) {
    setInterval(() => {
        const date = getFakeTime();
        const rand = Math.random().toFixed(3) * (RAND_MAX - RAND_MIN) + RAND_MIN;
        const value = kwh * dailyRates[date.getMonth()] * hourlyRates[date.getHours()] * rand;
        db.pushLive({
            uid,
            live: {date: date.getTime(), value}
        });
    }, 8000);
}
