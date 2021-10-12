// TabOnScreen.tsx
import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { View } from '../components/Themed';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 29.9990674;
const LONGITUDE = -90.0852767;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function TabOneScreen({ provider }) {
  const [region, setRegion] = useState({
    latitude: LATITUDE,    // initial location latitude
    longitude: LONGITUDE,  // initial location longitude
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  return (
    <View style={styles.container}>
      <MapView>
        string provider={provider}
        style={styles.map}
        initialRegion={region}
        zoomTapEnabled={false}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
