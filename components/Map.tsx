import React from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import MapView, { Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { Accuracy } from 'expo-location';
import * as Location from 'expo-location';



class Map extends React.Component<any, any, any> {
  mapRef: any;

  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lon: 0,
    }
  }

  componentDidMount() {
    const initToCurrLocation = async() => {
      const {status}  = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Activer la localisation', 'Pour profiter de toutes les fonctionnalités de GuideMe, veuillez activer la localisation.')
        return;
      }
      const initialposition = await Location.getCurrentPositionAsync({ accuracy: Accuracy.Low })
      this.setState({lat: initialposition.coords.latitude, lon: initialposition.coords.longitude})
      this.mapRef?.animateToRegion({
        latitude: initialposition.coords.latitude,
        longitude: initialposition.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }, 1000)
    }
    initToCurrLocation()
  }


  render() {
    return (
      <MapView
        ref={ref => { this.mapRef = ref }}
        style={{ width: "100%", height: "80%" }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation>
        {this.props.radius > 0 && (
          <Circle
            fillColor="rgba(255, 0, 0, 0.15)"
            radius={this.props.radius}
            center={{latitude: this.state.lat, longitude: this.state.lon}}
          />
        )}
      </MapView>
    );
  }
}

 export default Map;