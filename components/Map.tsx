import React from 'react';
import { Alert, Text, StyleSheet } from 'react-native';
import MapView, { Circle, Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Accuracy } from 'expo-location';
import * as Location from 'expo-location';
import Openrouteservice from 'openrouteservice-js';
import {selectedMonumentsInRadius, getMonumentsOrder, getPathTimeAndDistance} from './time_matrix';
import { View } from './Themed';

class Map extends React.Component<any, any, any> {
  mapRef: any;

  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lon: 0,
      pathMarker: [],
      path: [],
      totalTime: 0.0,
      carbonBilan: 0.0
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
        latitudeDelta: (this.props.radius/63710)*2,
        longitudeDelta: (this.props.radius/63710)*2
      }, 3000)
    }

    const displayPath = async() => {
      const location = await initToCurrLocation()
      let finalmonument = selectedMonumentsInRadius(this.state.lat, this.state.lon, this.props.radius, this.props.ids)
      this.setState({
        pathMarker: Array.from(finalmonument.values()).map((monument: any) => ({name: monument[0], latitude: monument[2], longitude: monument[1]})),
        path: []
      })
      this.getPath();
    }
    displayPath()
  }



  getPath = async() => {
    let circuit = await getMonumentsOrder(this.state.lat, this.state.lon, this.props.radius, this.props.ids);
    if(circuit.length > 0){
      this.computePath(circuit);
    }
    const result = await getPathTimeAndDistance(this.state.lat, this.state.lon, this.props.radius, this.props.ids);
    this.setState({
      totalTime: result[0],
      carbonBilan: result[1]
    })
  }

  computePath = (circuit: Array<any>) => {
    let orsDirections = new Openrouteservice.Directions({ api_key: "5b3ce3597851110001cf62488e507e8f47604f66ae8ba7a411f9f8bd"});
    orsDirections.calculate({
      coordinates: circuit.map(point => [point.Longitude, point.Latitude]),
      profile: "foot-walking",
      preference: 'shortest',
      // extra_info: ["waytype", "steepness"],
      format: "geojson",
      api_version: 'v2',
    })
    .then((res: any) => {
        // Add your own result handling here
        if (res?.features?.[0]?.geometry?.coordinates) {
          this.setState({path: res.features[0].geometry.coordinates.map((point: any) => ({latitude: point[1], longitude: point[0]}))})
        }
      })
    .catch((err: any) => console.error(err));
  }

  render() {
    return (
        <MapView
          ref={ref => { this.mapRef = ref }}
          style={{ width: "100%", height: "70%", flex:2 }}
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
        {this.state.pathMarker.map((marker: any) => (
          <Marker
            key={marker.name}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.name}
            pinColor={'#FF5576'}
          />
        ))}
        <Marker
          coordinate={{latitude : this.state.lat, longitude: this.state.lon}}
          title={'Depart'}
          pinColor={'#0B0CAC'}
        />
        <Text style= {{backgroundColor: 'white', textAlign: 'center',}}>Vous avez économisé/émis {this.state.carbonBilan}kg de CO2</Text>
      </MapView>

    );
  }
}

 export default Map;
