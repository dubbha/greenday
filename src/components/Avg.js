import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';
import axios from 'axios';

const plotOptions = {
};

const chartOptions = {
  width: '450px',
}

const names = ['Sunny', 'Ben', 'Jim', 'Natalie', 'Dave', 'Benny', 'Margaret', 'Bob', 'Solomon', 'Robert', 'Foxy', 'Digger', 'Zed'];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };

  }

  componentDidMount() {
      // axios.get('http://10.17.166.219:3001/api/feed/averages/')
      axios.get('http://127.0.0.1:3001/api/feed/averages/')
        .then(data => {
          console.log(data);
          this.setState({ data: data.data });
        });
  };

  render() {

    const { data } = this.state;
    const displayData = data.map(el => ({
      uid: el.uid,
      points: el.dailyAvg.map(sub => sub.value),
    }));

    return (

      <div className="app">
        <HighchartsChart plotOptions={plotOptions}>
          <Chart chartOptions={chartOptions} />

          <Title>Avarage Daily Generation (kWh)</Title>

          {/* <Subtitle>Source: thesolarfoundation.com</Subtitle> */}

          <Legend layout="vertical" align="right" verticalAlign="middle" />

          <XAxis>
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis id="number">
            <YAxis.Title>Avarage Daily Generation (kWh)</YAxis.Title>
            { displayData.map((feed, idx) => {
                return (
                  <LineSeries id={feed.uid} name={names[idx]} key={feed.uid} data={feed.points} />
                );
              })
            }
          </YAxis>
        </HighchartsChart>
      </div>

    );
  }
}

export default withHighcharts(App, Highcharts);
