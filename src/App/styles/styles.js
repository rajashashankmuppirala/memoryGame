import {Dimensions, StyleSheet} from 'react-native';

const screen = Dimensions.get('window');
const CARD_WIDTH = Math.floor(screen.width * 0.125);
const CARD_HEIGHT = Math.floor(CARD_WIDTH * (323 / 222));

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    paddingTop: 50,
    flex: 1,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  timer: {
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
  },
  safearea: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 5,
    borderRadius: 3,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});
export default styles;
