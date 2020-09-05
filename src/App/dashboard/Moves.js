import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../styles/styles';

class Moves extends React.Component {
  render() {
    return (
      <TouchableOpacity>
        <Text style={styles.timer} id="steps">
          Moves:{this.props.total}
        </Text>
        <Text style={styles.timer} id="steps">
          Solved:{this.props.solved}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Moves;
