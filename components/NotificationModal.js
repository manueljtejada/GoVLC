import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableHighlight,
  DatePickerIOS,
} from 'react-native';
import { Notifications } from 'expo';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';

import { getNotificationsPermissions } from '../helpers/permissions';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';

class NotificationModal extends Component {
  state = {
    chosenDate: new Date(),
  };

  scheduleNotification = async (date, place) => {
    // First ask for push notifications permissions
    await getNotificationsPermissions();

    // Create notification object
    const notification = {
      title: 'Time to go!',
      body: `Remember to visit ${place.properties.nombre}`,
    };

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
  };

  setDate = newDate => {
    this.setState({
      chosenDate: newDate,
    });
  };

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
        >
          <View>
            <Header backgroundColor={Colors.tintColor}>
              <TouchableHighlight onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableHighlight>
              <Text>Filter</Text>
              <TouchableHighlight
                onPress={() => this.scheduleNotification(chosenDate, place)}
              >
                <Text>Done</Text>
              </TouchableHighlight>
            </Header>

            <View style={Styles.container}>
              <DatePickerIOS date={chosenDate} onDateChange={this.setDate} />
              {/* TODO add Android DatePicker */}
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
