import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

import EventCard from './EventCard';

import { getEvents, randomDate, randomString } from './api';
import { withOrientation } from 'react-navigation';
import EventForm from './EventForm';
import { 
  saveEvent 
} from './api';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 5,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

class EventList extends Component {
  static navigationOptions = {
    title: 'Your Events',
    // headerRight: (
    //   <TouchableHighlight
    //     style={styles.addButton}
    //   >
    //     <Text style={styles.addButtonLabel}>+</Text>
    //   </TouchableHighlight>
    // ),
  };


  state = {
    events: [],
  }

  componentDidMount() {
    this.reloadEvents()

    console.log('componentDidMount');

    // this.forceUpdate()

    setInterval(() => {
      this.setState({
        events: this.state.events.map(evt => ({
          ...evt,
          timer: Date.now(),
        })),
      });
    }, 50);

    this.props.navigation.addListener(
      'didFocus',
      () => {
        this.reloadEvents()
      }
    );
  }

  reloadEvents() {
    getEvents()
    .then((events) => {
      this.setState({ events })
      // this.forceUpdate()
    })
    // .then(events => this.setState({ events }));
  }

  handleAddEvent = (id, date, eventTitle) => {
    this.props.navigation.navigate('form', { id, date, eventTitle })
  }

  handleEventTap = (id, date, eventTitle) => {
    this.props.navigation.navigate('form', { id, date, eventTitle })
  }

  handleAddRandomEvent = () => {
    var rdate = randomDate();
    var rstring = randomString(20);
    this.props.navigation.navigate('form', { id: null, date: rdate, eventTitle: rstring })
  }

  handleAddRandomEventWithoutConfirmation = () => {
    var rdate = randomDate();
    var rstring = randomString(20);

    saveEvent(rstring, rdate)
    .then(() => {
      this.reloadEvents()
    })
  }

  render() {
    // console.log('isfocused', this.props.navigation.isFocused);
    console.log('this.state.events', this.state.events);
    return [
      <FlatList
        key="flatlist"
        data={this.state.events}
        style={styles.list}
        // keyExtractor={(item, index) => item.id }
        keyExtractor={(item, index) => {
            console.log('index', index);
            console.log('item', item);
            return item.id;
          }
        }
        renderItem={({ item, separators }) => (
          <EventCard
            event={item}
            onPress={() => {
              this.handleEventTap(item.id, item.date, item.title)
            }}
          />
        )}
      />,
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
      >
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Event"
          onPress={() => this.handleAddEvent(null, new Date(), null) }>
          <Icon 
            name="md-add" 
            style={styles.actionButtonIcon}
          />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Add random event"
          onPress={() => { this.handleAddRandomEvent() }}>
          <Icon
            name="ios-shuffle"
            style={styles.actionButtonIcon}
          />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Add random event without confirmation"
          onPress={() => { this.handleAddRandomEventWithoutConfirmation() }}>
          <Icon
            name="ios-shuffle"
            style={styles.actionButtonIcon}
          />
        </ActionButton.Item>
      </ActionButton>,

      // <ActionButton
      //   key="fab"
      //   buttonColor="rgba(231,76,60,1)"
      //   onPress={() => {
      //     this.handleAddEvent(null, new Date(), null)
      //   }}
      // />,
    ];
  }
}

export default EventList;