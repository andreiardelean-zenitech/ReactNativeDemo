import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  formatDate,
  getCountdownParts,
} from './api';



const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 20,
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
  },
  date: {
    fontWeight: '200',
    fontSize: 15,
    color: '#bdbdbd',
    width: '30%',
    marginLeft: 15,
    textAlign: 'left',
  },
  title: {
    fontSize: 15,
    fontWeight: '300',
    marginLeft: 15,
    textAlign: 'left',
  },
  counterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  counter: {
    width: '20%',
    flex: 1,
  },
  counterText: {
    fontSize: 25,
    textAlign: 'center',
  },
  counterLabel: {
    fontSize: 13,
    fontWeight: '100',
    color: '#a3a3a3',
    textAlign: 'center',
    paddingTop: 0,
  },
});

export default function EventCard({ event , onPress}) {
  const {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  } =  getCountdownParts(event.date);

  return (
    <TouchableHighlight
      onPress={() => {
        onPress();
      }}
      underlayColor='rgba(182,182,182,0.2)'
    >
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.date}>{formatDate(event.date)}</Text>
          <Text style={styles.title}>{event.title}</Text>
        </View>

        <View
          style={styles.counterContainer}
        >
          <View
            style={styles.counter}
          >
            <Text style={styles.counterText}>{Math.abs(days)}</Text>
            <Text style={styles.counterLabel}>D</Text>
          </View>
          <View
            style={styles.counter}
          >
            <Text style={styles.counterText}>{Math.abs(hours)}</Text>
            <Text style={styles.counterLabel}>H</Text>
          </View>
          <View
            style={styles.counter}
          >
            <Text style={styles.counterText}>{Math.abs(minutes)}</Text>
            <Text style={styles.counterLabel}>M</Text>
          </View>
          <View
            style={styles.counter}
          >
            <Text style={styles.counterText}>{Math.abs(seconds)}</Text>
            <Text style={styles.counterLabel}>S</Text>
          </View>
          <View
            style={styles.counter}
          >
            <Text style={styles.counterText}>{Math.abs(milliseconds)}</Text>
            <Text style={styles.counterLabel}>MM</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date)
  }),
};
