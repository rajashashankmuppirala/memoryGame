import React from 'react';
import {View} from 'react-native';
import styles from '../styles/styles';

class Row extends React.Component {
  render() {
    return <View style={styles.row}>{this.props.children}</View>;
  }
}

export default Row;
