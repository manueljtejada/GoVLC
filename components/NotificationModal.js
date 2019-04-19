import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  Modal,
  TouchableHighlight,
  DatePickerIOS,
} from 'react-native';
import { Notifications } from 'expo';
import { Header } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';

import { getNotificationsPermissions } from '../helpers/permissions';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import { titleCase } from '../helpers/utils';

class NotificationModal extends Component {
  state = {
    chosenDate: new Date(),
  };

  scheduleNotification = async (date, place) => {
    const { setModalVisible } = this.props;

    // First ask for push notifications permissions
    await getNotificationsPermissions();

    // Create notification object
    const notification = {
      title: 'Time to go!',
      body: `Remember to visit ${place.properties.nombre}`,
    };

    // If we get date passed as a string, we need to convert it to a date
    if (typeof date === 'string') {
      date = new Date(date);
    }

    // Specify when to send the notifications
    const scheduleOptions = {
      time: date,
    };

    // Schedule the notification and save the ID
    const notificationId = await Notifications.scheduleLocalNotificationAsync(
      notification,
      scheduleOptions
    );

    console.log(notificationId);

    // Close the modal
    setModalVisible(false);
  };

  setDate = newDate => {
    this.setState({
      chosenDate: newDate,
    });
  };

  renderIOSDatePicker() {
    const { chosenDate } = this.state;
    const today = new Date();

    return (
      <DatePickerIOS
        date={chosenDate}
        minimumDate={today}
        onDateChange={this.setDate}
      />
    );
  }

  renderAndroidDatePicker() {
    const { chosenDate } = this.state;
    const today = new Date();
    return (
      <DatePicker
        style={{ width: 300 }}
        date={chosenDate}
        minDate={today}
        onDateChange={date => this.setDate(date)}
      />
    );
  }

  render() {
    const { modalVisible, setModalVisible, place } = this.props;
    const { chosenDate } = this.state;

    return (
      <ScrollView style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          containerStyle={{ backgroundColor: Colors.tintColor }}
          visible={modalVisible}
          onRequestClose={() => console.log('Notifications modal closed')}
        >
          <View>
            <Header backgroundColor={Colors.tintColor}>
              <TouchableHighlight onPress={() => setModalVisible(false)}>
                <Text style={Styles.white}>Cancel</Text>
              </TouchableHighlight>
              <Text style={Styles.headerTitle}>Add Reminder</Text>
              <TouchableHighlight
                onPress={() => this.scheduleNotification(chosenDate, place)}
              >
                <Text style={Styles.white}>Done</Text>
              </TouchableHighlight>
            </Header>

            <View style={Styles.container}>
              <Text style={{ marginBottom: 10 }}>
                Set up a reminder to visit {titleCase(place.properties.nombre)}.
              </Text>
              <Text style={{ marginBottom: 10 }}>Please select a date:</Text>
              {Platform.OS === 'ios'
                ? this.renderIOSDatePicker()
                : this.renderAndroidDatePicker()}
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

NotificationModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
};

export default NotificationModal;
