import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Accuracy } from 'expo-location';
import * as Location from 'expo-location';



class Map extends React.Component<any, any, any> {
  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lon: 0,
    }
  }

  componentDidMount() {
    const testfunction = async() => {
      const status  = Location.requestForegroundPermissionsAsync()
      const initialposition = await Location.getCurrentPositionAsync({ accuracy: Accuracy.Low })
      let lat = initialposition.coords.latitude
      let long = initialposition.coords.longitude
      this.setState({lat: lat, lon: long})
    }
    testfunction()
  }


  render() {
    return (
      <MapView
         style={{ width: "100%", height: "80%" }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={{
         latitude: this.state.lat,
         longitude: this.state.lon,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421}}
      />
    );
  }
}

 export default Map;