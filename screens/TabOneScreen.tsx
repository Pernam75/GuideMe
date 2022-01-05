import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Search from '../components/Search';
import FlatListBasics from '../components/liste';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageAccueil}
        source = {require('../assets/images/logo_small.png')}
      />
      <Search />
    <FlatListBasics/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 80,
    fontWeight: 'bold',
    backgroundColor: 'red',
    width: '100%',
    textAlign:'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  imageAccueil: {
    flex : 1,
    maxWidth : '92%',
    resizeMode: 'contain',
  }
});
