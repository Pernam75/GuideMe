import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Accuracy } from 'expo-location';
import * as Location from 'expo-location';


class Map extends React.Component {
  render() {
    Location.requestForegroundPermissionsAsync()
    let position =  Location.getCurrentPositionAsync({ accuracy: Accuracy.Low })
    return ( 
      <MapView
         style={{ width: "100%", height: "80%" }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421}}
      />
    );
  }
}

 export default Map;