import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Camera, Permissions, Icon, ImagePicker } from 'expo';
import { Header } from 'react-native-elements';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import { getCameraRollPermissions } from '../helpers/permissions';

class CameraModal extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    paused: false,
    image: null,
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

  snap = async () => {
    if (this.camera) {
      const image = await this.camera.takePictureAsync();
      this.camera.pausePreview();
      this.setState({
        paused: true,
        image,
      });
    }
  };

  retakePhoto = () => {
    this.camera.resumePreview();

    this.setState({
      paused: false,
      image: null,
    });
  };

  handleImageSave = async () => {
    const { image } = this.state;
    const { saveImage, openCamera } = this.props;

    // Save the image
    await saveImage(image);

    // Close the camera
    openCamera(false);
  };

  pickImage = async () => {
    const { saveImage, openCamera } = this.props;

    // First get camera roll permissions
    await getCameraRollPermissions();

    // Launch the image picker
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    // Save image to AsyncStorage and close the camera
    if (!image.cancelled) {
      await saveImage(image);
      openCamera(false);
    }
  };

  renderInitialHeader() {
    const { openCamera } = this.props;
    return (
      <Header backgroundColor="transparent">
        <TouchableOpacity onPress={() => openCamera(false)}>
          <Icon.Ionicons name="ios-close" color="#fff" size={32} />
        </TouchableOpacity>
      </Header>
    );
  }

  renderActionHeader() {
    return (
      <Header backgroundColor="transparent">
        <TouchableOpacity onPress={this.retakePhoto}>
          <Icon.Ionicons name="ios-arrow-back" color="#fff" size={32} />
        </TouchableOpacity>
        <View />
        <TouchableOpacity onPress={this.handleImageSave}>
          <Text style={Styles.white}>Save</Text>
        </TouchableOpacity>
      </Header>
    );
  }

  render() {
    const { hasCameraPermission, type, paused } = this.state;
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
          onRequestClose={() => console.log('Camera closed')}
        >
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ ...Styles.fill, justifyContent: 'space-between' }}
            type={type}
          >
            {!paused ? this.renderInitialHeader() : this.renderActionHeader()}
            {!paused && (
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
                  <TouchableOpacity onPress={this.snap}>
                    <Icon.Ionicons
                      name="ios-radio-button-off"
                      color="#fff"
                      size={100}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.pickImage}>
                  <Icon.Ionicons name="ios-images" color="#fff" size={45} />
                </TouchableOpacity>
              </View>
            )}
          </Camera>
        </Modal>
      </View>
    );
  }
}

CameraModal.propTypes = {
  openCamera: PropTypes.func.isRequired,
  saveImage: PropTypes.func.isRequired,
};

export default CameraModal;
