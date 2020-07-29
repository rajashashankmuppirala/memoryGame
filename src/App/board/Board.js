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

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      steps: 0,
      rows: this.initRows(),
      lastselected: {},
      count: 0,
      timer: 0,
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
      steps: 0,
      rows: rows,
      lastselected: {},
      count: 0,
      timer: 0,
    });
  };

  onCardSelect = async (card) => {
    await this.setState({steps: this.state.steps + 1});
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
              await this.setState({count: this.state.count + 2});
              console.log('match' + this.state.count);
              r.solved = true;
              this.state.lastselected = {};
              this.state.rows.map((row, rowIndex) => {
                row.map((r) => {
                  if (r.id === this.state.lastselected.id) {
                    r.solved = true;
                  }
                });
              });
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
                      this.state.lastselected = {};
                    }
                  });
                });
                this.setState({rows: this.state.rows});
              }, 1000);
            }
          }
        }
      });
    });
    this.setState({rows: this.state.rows});

    console.log(this.state.steps);
    if (this.state.steps == 1) {
      this.initTimer();
    }

    console.log('last' + this.state.count);
    if (this.state.count == 30) {
      this.onFinish();
    }
  };

  initTimer = () => {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer + 1,
      }));
    }, 1000);
  };

  displayAlert = () => {
    if (Platform.OS === 'web') {
      const confirmAction = window.confirm(
        'Congratulations!!',
        `You have completed the puzzle in ${this.state.steps} steps and ${this.state.timer} seconds.`,
      );
      if (confirmAction) {
        this.reset();
      }
      return;
    } else {
      Alert.alert(
        'Congratulations!!',
        `You have completed the puzzle in ${this.state.steps} steps and ${this.state.timer} seconds.`,
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
        <Text style={styles.title}>Memory Game</Text>
        <Text style={styles.timer} id="timer">
          Timer:{this.state.timer}
        </Text>
        <Text style={styles.timer}>Steps:{this.state.steps}</Text>
        <SafeAreaView style={styles.safearea}>
          {this.state.rows.map((row, rowIndex) => (
            <Row key={rowIndex} index={rowIndex}>
              {row.map((card, index) => {
                return (
                  <Card
                    key={card.id}
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
