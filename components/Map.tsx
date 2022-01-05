import React from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import MapView, { Circle, Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Accuracy } from 'expo-location';
import * as Location from 'expo-location';
import Openrouteservice from 'openrouteservice-js';
import {monumentsInRadius, totalTime, getMonumentsOrder} from './time_matrix';
import { ParenthesisNodeDependencies } from 'mathjs';

class Map extends React.Component<any, any, any> {
  mapRef: any;

  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lon: 0, 
      pathMarker: [],
      paths: [],
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

  componentDidUpdate(prevProps) {
    if (this.props.radius !== prevProps.radius) {
      /*version propre
      let finalmonument = monumentsInRadius(this.state.lat, this.state.lon, this.props.radius)
      this.setState({
        pathMarker: Array.from(finalmonument.values()).map((monument: any) => ({name: monument[0], latitude: monument[2], longitude: monument[1]}))
      })
      const circuit = getMonumentsOrder(this.state.lat, this.state.lon,  this.props.radius);
      */
      
      //test
      
      //this.computePath('48.791855', '2.331433');

      
      let finalmonument = monumentsInRadius(this.state.lat, this.state.lon, this.props.radius)
      this.setState({
        pathMarker: Array.from(finalmonument.values()).map((monument: any) => ({name: monument[0], latitude: monument[2], longitude: monument[1]})),
        paths: []
      })
      let getPath = async() => {
        /*if(this.state.paths.length > 0){
          this.state.paths.length = 0;
        }*/
        
        let circuit = await getMonumentsOrder(this.state.lat, this.state.lon, this.props.radius);
        let i = 1;
        for(i = 1; i < circuit.length; i++){
          console.log("\n\n\n\nitération n°"+i+"\ndans la boucle :\n"+circuit[i-1].Nom+" : [["+circuit[i-1].Latitude + ", " + circuit[i-1].Longitude +"] vers " + circuit[i].Nom + " : [" + circuit[i].Latitude + ", "+ circuit[i].Longitude+"]]");
          this.computePath(circuit[i-1].Latitude, circuit[i-1].Longitude, circuit[i].Latitude, circuit[i].Longitude, i);
        }
      }
      getPath();
    }
  }

  computePath(latStart: string, longStart: string, latEnd: string, longEnd: string, i : Number) {
    console.log("dans la fonction :\n"+"[Start : ["+longStart + ", " + latStart + "]\nArrivée : [" + longEnd + ", " + latEnd+"]]")
    let orsDirections = new Openrouteservice.Directions({ api_key: "5b3ce3597851110001cf62488e507e8f47604f66ae8ba7a411f9f8bd"});
    orsDirections.calculate({
      coordinates: [[longStart, latStart], [longEnd, latEnd]],
      profile: "foot-walking",
      preference: 'shortest',
      // extra_info: ["waytype", "steepness"],
      format: "geojson",
      api_version: 'v2',
    })
    .then((res: any) => {
        // Add your own result handling here
        if (res?.features?.[0]?.geometry?.coordinates) {
          let tmppath =
                  res.features[0].geometry.coordinates
                  .map((point: any) => ({latitude: point[1], longitude: point[0]}))
          this.setState(
            {paths: [...this.state.paths, {chemin :tmppath, cle:i}]}
          )
         //console.log("taille chemin :" ,this.state.paths[i].chemin.length);

          /*for(let j =0; j < this.state.paths.length; j++){
            console.log("test", this.state.paths[j][0]);
          }
          console.log("fin");*/
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
        {this.state.paths.map((path: any) => (
          <Polyline
            key = {path.cle}
            strokeColor="#FF0000"
            strokeWidth={6}
            lineDashPattern={[0]}
            coordinates={path.chemin}
          />
        ))}
        {this.state.pathMarker.map((marker: any) => (
          <Marker 
            key={marker.name}
            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
            title={marker.name}
          />
        ))}
        <Marker
          coordinate={{latitude : this.state.lat, longitude: this.state.lon}}
          title={'Depart'}
          pinColor={'green'}
        />
      </MapView>
    );
  }
}

 export default Map;