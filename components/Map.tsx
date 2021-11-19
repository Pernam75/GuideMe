import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Accuracy } from 'expo-location';
import * as Location from 'expo-location';



class Map extends React.Component {
  constructor(props) {
    super(props);

  }

  async getLocationAsync() {
    const status  = Location.requestForegroundPermissionsAsync()
    if (status.toString() === 'granted') {
     const location = await Location.getCurrentPositionAsync({});
    }
  }

  componentDidMount() {
    Location.requestForegroundPermissionsAsync()
    async function testfunction(){
      const initialposition = await Location.getCurrentPositionAsync({ accuracy: Accuracy.Low })
      let lat = initialposition.coords.latitude
      let long = initialposition.coords.longitude
    }
  }


  render() {
    return (
      <MapView
         style={{ width: "100%", height: "80%" }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={{
         latitude: lat,
         longitude: long,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421}}
      />
    );
  }
}

 export default Map;