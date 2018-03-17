import db from '../utils/database-utils';
import {
    dailyAvgGenerationByMonthPerKwhPower as dailyRates,
    hourlyGenerationPercentage as hourlyRates
} from '../mock-data/rates.json';

export function generateRandomUsers(userCount) {
    db.dropFeedCollection();
    for (let i = userCount; i > 0; i--) {
        const uid = '_' + Math.random().toString(36).substr(2, 9);
        const kwh = 10;

        db.postNewFeed({
            uid,
            dailyAvg: generateAvgFeed(kwh),
            live: generateLiveFeed(kwh, uid)
        });
    }
}

function generateAvgFeed(kwh) {
    const fromDate = new Date(2018, 2);
    const toDate = new Date(2018, 9, 20);
    
    const dailyAvg = [];
    
    for (let date = fromDate; date.getTime() < toDate.getTime(); date.setDate(date.getDate() + 1)) {
        const rand = Math.random().toFixed(3) * (1.2 - 0.8) + 0.8;
        const value = kwh * dailyRates[date.getMonth()] * rand;
        dailyAvg.push({
            date: new Date(date.getTime()),
            value
        });
    }

    return dailyAvg;
}

function generateLiveFeed(kwh, uid) {
    const fakeTime = getFakeTime();
    const live = [];
    
    for (let time = new Date(2018, 9, 20, 7); time.getTime() < fakeTime.getTime(); time.setSeconds(time.getSeconds() + 10)) {
        const rand = Math.random().toFixed(3) * (1.2 - 0.8) + 0.8;
        const value = kwh * dailyRates[fakeTime.getMonth()] * (hourlyRates[time.getHours()] || 0) * rand;
        live.push({
            date: new Date(time.getTime()),
            value: value
        });
    }

    setInterval(() => {
        const date = getFakeTime();
        const rand = Math.random().toFixed(3) * (1.2 - 0.8) + 0.8;
        const value = kwh * dailyRates[date.getMonth()] * hourlyRates[date.getHours()] * rand;
        db.pushLive({
            uid,
            live: {date, value}
        });
    }, 10000);

    return live;
}

function getFakeTime() {
    const realToday = new Date();
    const realTime = [realToday.getHours(), realToday.getMinutes(), realToday.getSeconds()];
    return new Date(2018, 9, 20, ...realTime);
}
