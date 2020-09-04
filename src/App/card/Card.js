import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from '../styles/styles';

class Card extends React.Component {
  render() {
    const onPress = this.props.onPress;
    const solved = this.props.solved;
    const isDisabled = this.props.isDisabled;
    const displayImage = this.props.display
      ? this.props.displayImage
      : require('../assets/card.png');

    return (
      <TouchableOpacity disabled={solved || isDisabled} onPress={onPress}>
        <View style={styles.card}>
          <Image style={styles.cardImage} source={displayImage} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default Card;
