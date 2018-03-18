import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';
import axios from 'axios';

const plotOptions = {
  // series: {
  //   pointStart: 2010
  // }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };

  }

  componentDidMount() {
      axios.get('http://10.17.166.219:3001/api/feed/averages/')
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
          <Chart />

          <Title>Solar Employment Growth by Sector, 2010-2016</Title>

          <Subtitle>Source: thesolarfoundation.com</Subtitle>

          <Legend layout="vertical" align="right" verticalAlign="middle" />

          <XAxis>
            <XAxis.Title>Time</XAxis.Title>
          </XAxis>

          <YAxis id="number">
            <YAxis.Title>Number of employees</YAxis.Title>
            {
              displayData.map(feed => (
                <LineSeries id={feed.uid} name={feed.uid} key={feed.uid} data={feed.points} />
              ))
            }
          </YAxis>
        </HighchartsChart>
      </div>

    );
  }
}

export default withHighcharts(App, Highcharts);
