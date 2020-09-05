import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/styles';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 0,
    };
    this.initTimer();
  }

  initTimer = () => {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer + 1,
      }));
    }, 1000);
  };

  refreshTimer = () => {
    clearInterval(this.timer);
    this.setState({timer: 0});
    this.initTimer();
  };

  render() {
    return (
      <TouchableOpacity>
        <Text style={styles.timer} id="timer">
          Timer:{this.state.timer}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Timer;
