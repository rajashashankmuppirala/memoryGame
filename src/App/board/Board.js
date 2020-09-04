import React from 'react';
import {AVAILABLE_CARDS} from '../data/availableCards';
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import styles from '../styles/styles';
import Card from '../card/Card';
import Row from '../row/Row';
import Timer from '../dashboard/Timer';
import Moves from '../dashboard/Moves';

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: this.initRows(),
      lastselected: {},
      moves: 0,
      count: 0,
      isDisabled: false,
    };
  }

  initRows = () => {
    let arr = [];
    let rows = [];
    let columns = [];

    while (arr.length < 30 / 2) {
      let r = Math.floor(Math.random() * 24);
      if (arr.indexOf(r) === -1) {
        arr.push(r);
      }
    }
    arr = arr.concat(arr);
    arr = this.shuffleArray(arr);

    arr.map((i, index) => {
      let cardObj = {};
      cardObj.id = index;
      cardObj.display = false;
      cardObj.solved = false;
      cardObj.value = AVAILABLE_CARDS[i];
      columns.push(cardObj);
      if ((index + 1) % 5 === 0) {
        rows.push(columns);
        columns = [];
      }
    });
    return rows;
  };

  shuffleArray = (array) => {
    const newArr = array.slice();
    for (let i = newArr.length; i; i -= 1) {
      const j = Math.floor(Math.random() * i);
      const x = newArr[i - 1];
      newArr[i - 1] = newArr[j];
      newArr[j] = x;
    }
    return newArr;
  };

  reset = () => {
    let rows = this.initRows();
    this.setState({
      rows: rows,
      lastselected: {},
      moves: 0,
      count: 0,
      isDisabled: false,
    });
  };

  onCardSelect = async (card) => {
    this.state.rows.map((row, rowIndex) => {
      row.map(async (r) => {
        if (r.id === card.id) {
          r.display = true;
          if (Object.keys(this.state.lastselected).length === 0) {
            this.setState({lastselected: r});
          } else {
            if (
              r.value === this.state.lastselected.value &&
              r.id !== this.state.lastselected.id
            ) {
              r.solved = true;
              this.setState({
                moves: this.state.moves + 1,
                count: this.state.count + 1,
              });
              this.state.rows.map((row, rowIndex) => {
                row.map((r) => {
                  if (r.id === this.state.lastselected.id) {
                    r.solved = true;
                    this.state.lastselected = {};
                  }
                });
              });
              this.setState({rows: this.state.rows});
            } else {
              setTimeout(() => {
                this.state.rows.map((row, rowIndex) => {
                  row.map((r) => {
                    if (
                      r.id === this.state.lastselected.id &&
                      r.solved !== true
                    ) {
                      r.display = false;
                      card.display = false;
                      this.setState({
                        moves: this.state.moves + 1,
                        lastselected: {},
                        isDisabled: false,
                      });
                    }
                  });
                });
                this.setState({rows: this.state.rows});
              }, 1000);
              this.state.isDisabled = true;
            }
          }
        }
      });
    });
    this.setState({rows: this.state.rows});
    if (this.count == 15) {
      this.onFinish();
    }
  };

  displayAlert = () => {
    if (Platform.OS === 'web') {
      const confirmAction = window.confirm(
        'Congratulations!!',
        `You have completed the game in ${this.state.moves} moves.`,
      );
      if (confirmAction) {
        this.reset();
      }
      return;
    } else {
      Alert.alert(
        'Congratulations!!',
        `You have completed the game in ${this.moves} moves.`,
        [{text: 'OK', onPress: this.reset}],
        {cancelable: false},
      );
    }
  };

  onFinish = () => {
    clearInterval(this.timer);
    setTimeout(() => this.displayAlert(), 1);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Memory Matching Game</Text>
        <Timer />
        <Moves total={this.state.moves} solved={this.state.count} />
        <SafeAreaView style={styles.safearea}>
          {this.state.rows.map((row, rowIndex) => (
            <Row key={rowIndex} index={rowIndex}>
              {row.map((card, index) => {
                return (
                  <Card
                    key={card.id}
                    isDisabled={this.state.isDisabled}
                    display={card.display}
                    solved={card.solved}
                    displayImage={card.value}
                    onPress={() => this.onCardSelect(card)}
                  />
                );
              })}
            </Row>
          ))}
        </SafeAreaView>
      </View>
    );
  }
}

export default Board;
