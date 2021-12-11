import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Search from '../components/Search';
import Map from '../components/Map';

export default function TabTwoScreen() {
  const [radius, setRadius] = React.useState(0)

  return (
    <View style={styles.container}>
      <Search onValidate={(val: number) => setRadius(val)} />
      <Map radius={radius} />
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
