import React, { Component } from 'react'
import { MapView } from 'expo';
import { connect } from 'react-redux';

class MapScreen extends Component {
  state = {
    region: {
      latitude: 39.4744869,
      longitude: -0.3823819,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0621,
    }
  }

  onRegionChange = region => {
    this.setState({ region });
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    places: state.places
  }
}

export default connect(mapStateToProps)(MapScreen);