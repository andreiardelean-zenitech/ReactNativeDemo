import React, { Component } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { 
  saveEvent, 
  updateEvent, 
  deleteEvent, 
  formatDateTime 
} from './api';
import { title } from 'process';


const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  text: {
    height: 40,
    // borderWidth: 1,
    margin: 0,
    marginLeft: 7,
    marginRight: 7,
    paddingLeft: 10,
  },
  borderTop: {
    borderColor: '#edeeef',
    borderTopWidth: 0.5,
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    alignSelf: 'stretch',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

class EventForm extends Component {
  static navigationOptions = ({ navigation }) => {
    eventTitle = navigation.state.params.eventTitle;
    eventID = navigation.state.params.eventTitle;

    if(eventTitle){
      return {
        headerTitle: `Edit ${eventTitle}`,
      };
    }else{
      return {
        headerTitle: 'Add Event',
      };
    }
 };

  state = {
    id: null,
    eventTitle: '',
    date: '',
    showDatePicker: false,
  };

  componentDidMount() {
    this.setState({
      id: this.props.navigation.state.params.id,
      eventTitle: this.props.navigation.state.params.eventTitle || '',
      date: this.props.navigation.state.params.date,
    });
 
    this.forceUpdate()
  }

  handleChangeTitle = (text) => {
    this.setState({
      eventTitle: text,
    });
  }

  handleDatePicked = (date) => {
    this.setState({
      date: date,
    });

    this.handleDatePickerHide();
  }


  handleDatePickerHide = () => {
    this.setState({
      showDatePicker: false,
    });
  }

  handleDatePress = () => {
     this.setState({
       showDatePicker: true,
     });
  }

  handleAddPress = () => {
    saveEvent(this.state.eventTitle, this.state.date)
    .then(() => {
      this.props.navigation.goBack();
    })
  }  
  
  handleUpdatePress = () => {
    updateEvent(this.state.id, this.state.eventTitle, this.state.date)
    .then(() => {
      this.props.navigation.goBack();
    })
  }

  handleDeletePress = () => {
    deleteEvent(this.state.id)
    .then(() => {
      this.props.navigation.goBack();
    })
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={styles.fieldContainer}>
          {this.state.id != null ?
          <TextInput
            style={styles.text}
            placeholder="ID"
            spellCheck={false}
            editable={false}
            value={this.state.id}
          />
          : null}

          <TextInput
            style={[ styles.text, styles.borderTop ]}
            onChangeText={this.handleChangeTitle}
            placeholder="Event title"
            spellCheck={false}
            defaultValue={this.state.eventTitle}
          />
          <TextInput
            style={[ styles.text, styles.borderTop ]}
            placeholder="Event date"
            spellCheck={false}
            defaultValue={formatDateTime(this.state.date.toString())}
            editable={!this.state.showDatePicker}
            onFocus={this.handleDatePress}
          />
          <DateTimePicker
            isVisible={this.state.showDatePicker}
            mode="datetime"
            date={new Date(this.state.date)}
            onConfirm={this.handleDatePicked}
            onCancel={this.handleDatePickerHide}
          />
        </View>

        {this.state.id == null ?
        <TouchableHighlight
          disabled={this.state.eventTitle == '' || this.state.date == null}
          onPress={this.handleAddPress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight> : null}
        
        {this.state.id != null ?
        <TouchableHighlight
          disabled={this.state.eventTitle == '' || this.state.date == null}
          onPress={this.handleUpdatePress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Update</Text>
          </TouchableHighlight> : null}
                
        {this.state.id != null ?
        <TouchableHighlight
          onPress={this.handleDeletePress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight> : null}
      </View>
    );
  }
}

export default EventForm;