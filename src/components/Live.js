import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, LineSeries
} from 'react-jsx-highcharts';
import io from 'socket.io-client';
import { addDataPoint } from './utils/data-helpers';
import axios from 'axios';

// const socket = io.connect('http://10.17.166.219:3001/');
const socket = io.connect('http://127.0.0.1:3001/');

const names = ['Sunny', 'Ben', 'Jim', 'Natalie', 'Dave', 'Benny', 'Margaret', 'Bob', 'Solomon', 'Robert', 'Foxy', 'Digger', 'Zed'];

class App extends Component {

  constructor (props) {
    super(props);
    this.updateLiveData = this.updateLiveData.bind(this);
    this.handleStartLiveUpdate = this.handleStartLiveUpdate.bind(this);
    this.handleStopLiveUpdate = this.handleStopLiveUpdate.bind(this);

    this.uids = [];  // get from props?

    this.state = {
      dataPoints: {},
      data1: [],
      data2: [],
      liveUpdate: false
    };
  }

  componentDidMount () {
    // axios.get('http://10.17.166.219:3001/api/feed/uids/')
    axios.get('http://127.0.0.1:3001/api/feed/uids/')
      .then(data => {
        console.log('data', data);
        const uids = data.data.map(i => i.uid);
        console.log('uids', uids);

        const dataPoints = {};
        uids.forEach(uid => dataPoints[uid] = []);
        this.uids = uids;

        return dataPoints;

      })
      .then((dataPoints) => {
        socket.on('data', (data) => {
          console.log('data', data);
          // const { dataPoints } = this.state;
          const { data1, data2 } = this.state;

          console.log('uids??', this.uids);
          console.log('dataPoints', dataPoints);

          this.uids.forEach(uid => {
            dataPoints[uid] = addDataPoint(dataPoints[uid], data[uid])
          });
    
          console.log('dataPoints', dataPoints);
          
          this.setState({
            dataPoints,
            data1: addDataPoint(data1, data[Object.keys(data)[0]]),
            data2: addDataPoint(data2, data[Object.keys(data)[1]])
          });
        });

        this.setState({
          dataPoints,
          liveUpdate: window.setInterval(this.requestLiveData, 10000)
        });
      })
  }

  updateLiveData (data) {

    const { data1, data2 } = this.state;
    const { dataPoints } = this.state;
    console.log('updateLiveData', data);

    this.state.uids.forEach(uid => {
      console.log('uid', uid);
      dataPoints[uid] = addDataPoint(dataPoints[uid], data[uid]);
    });

    this.setState({
      dataPoints,
    });
  }

  handleStartLiveUpdate (e) {
    e && e.preventDefault();
    // this.setState({
    //   liveUpdate: window.setInterval(this.updateLiveData, 10000)
    // });

    // this.setState
  }

  handleStopLiveUpdate (e) {
    e.preventDefault();
    window.clearInterval(this.state.liveUpdate);
    this.setState({
      liveUpdate: false
    });
  }

  render() {
    const { dataPoints, liveUpdate, data1, data2 } = this.state;
    console.log('render dataPoints', dataPoints);

    return (
      <div className="Highcharts-wrapper">
        <HighchartsChart>
          <Chart style="position: relative; left: 200px; right: 200px; padding: 30px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);"/>

          <Title>Current Gerenation (kWh)</Title>

          <Legend layout="vertical" align="right" verticalAlign="middle">
            {/* <Legend.Title>Members</Legend.Title> */}
          </Legend>

          <XAxis type="datetime">
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis id="pressure">
            <YAxis.Title>Current Gerenation (kWh)</YAxis.Title>
            { Object.keys(dataPoints).map((uid, idx) =>
                <LineSeries id={uid} name={names[idx]} data={dataPoints[uid]} key={uid} />
            ) }

          </YAxis>
        </HighchartsChart>
      </div>
    );
  }

  requestLiveData = () => {
    console.log('requestLiveData', this.uids);
    socket.emit('getLiveData', this.uids);
  }
}

export default withHighcharts(App, Highcharts);








// import React, { Component } from 'react';

// class Profile extends Component {
//     // handleSignOut = () => {
//     //     firebase.auth().signOut().then(() => {
//     //         this.props.history.push('/auth/signin');
//     //     });
//     // };

//     render() {
//         return (
//             <div>
//                 <h1>Profile</h1>
//                 <button onClick={this.handleSignOut}>Sign Out</button>
//             </div>
//         );
//     }


// }

// export default Profile;