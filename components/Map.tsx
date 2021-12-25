import React from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import MapView, { Circle, Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Accuracy } from 'expo-location';
import * as Location from 'expo-location';
import Openrouteservice from 'openrouteservice-js';
import returnDictionary from './time_matrix';

class Map extends React.Component<any, any, any> {
  mapRef: any;

  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lon: 0,
      latMarker : 0,
      longMarker: 0, 
      path: [],
    }
  }

  componentDidMount() {
    console.log(returnDictionary())
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
    this.setState({latMarker : 48.7921098, longMarker :2.3633048})
    initToCurrLocation()
  }

  componentDidUpdate(prevProps) {
    if (this.props.radius !== prevProps.radius) {
      this.computePath('48.791855', '2.331433');
    }
  }

  computePath(latitude: string, longitude: string) {
    let orsDirections = new Openrouteservice.Directions({ api_key: "5b3ce3597851110001cf62488e507e8f47604f66ae8ba7a411f9f8bd"});
    orsDirections.calculate({
      coordinates: [[this.state.lon, this.state.lat], [longitude, latitude]],
      profile: "foot-walking",
      preference: 'shortest',
      // extra_info: ["waytype", "steepness"],
      format: "geojson",
      api_version: 'v2',
    })
    .then((res: any) => {
        // Add your own result handling here
        if (res?.features?.[0]?.geometry?.coordinates) {
          this.setState({
            path: res
                    .features[0].geometry.coordinates
                    .map((point: any) => ({latitude: point[1], longitude: point[0]}))
          })
        }
      })
    .catch((err: any) => console.error(err));
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
        {this.state.path.length > 0 && (
          <Polyline
            strokeColor="#FF0000"
            strokeWidth={6}
            lineDashPattern={[0]}
            coordinates={this.state.path}
          />
        )}
        <Marker
            coordinate={{latitude: this.state.latMarker, longitude: this.state.longMarker}}
            title={"title"}
            description={"description"}
        />
      </MapView>
    );
  }
}

 export default Map;