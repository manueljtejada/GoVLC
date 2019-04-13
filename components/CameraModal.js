import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Camera, Permissions, Icon } from 'expo';
import { Header } from 'react-native-elements';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';

class CameraModal extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  reverseCamera = () => {
    const { type } = this.state;

    this.setState({
      type:
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  render() {
    const { hasCameraPermission, type } = this.state;
    const { modalVisible } = this.props;

    if (hasCameraPermission === null) {
      return <View />;
    }
    if (!hasCameraPermission) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={Styles.fill}>
        <Modal
          animationType="slide"
          transparent={false}
          containerStyle={{ backgroundColor: Colors.tintColor }}
          visible={modalVisible}
        >
          <Camera
            style={{ ...Styles.fill, justifyContent: 'space-between' }}
            type={type}
          >
            <Header backgroundColor="transparent">
              <TouchableOpacity>
                <Icon.Ionicons name="ios-close" color="#fff" size={32} />
              </TouchableOpacity>
            </Header>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity onPress={this.reverseCamera}>
                <Icon.Ionicons
                  name="ios-reverse-camera"
                  color="#fff"
                  size={45}
                />
              </TouchableOpacity>
              <View>
                <Icon.Ionicons
                  name="ios-radio-button-off"
                  color="#fff"
                  size={100}
                />
              </View>
              <Icon.Ionicons name="ios-images" color="#fff" size={45} />
            </View>
          </Camera>
        </Modal>
      </View>
    );
  }
}

export default CameraModal;
