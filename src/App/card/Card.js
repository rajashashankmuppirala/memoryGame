import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from '../styles/styles';

class Card extends React.Component {
  render() {
    const onPress = this.props.onPress;
    const displayImage = this.props.display
      ? this.props.displayImage
      : require('../assets/card.png');

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          <Image style={styles.cardImage} source={displayImage} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default Card;
