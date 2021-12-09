import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Search from '../components/Search';
import Map from '../components/Map';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text>GuideMe</Text>
      <Search/>
      <Map/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});