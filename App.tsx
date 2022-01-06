import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Image, SafeAreaView, SectionList, Button } from 'react-native';
import { Text, View } from './components/Themed';
import { RootTabScreenProps } from '../types';
import Map from './components/Map';
import Search from './components/Search';
import FlatListBasics from './components/liste';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Choice" component={ChoiceScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}


function HomeScreen({ navigation }) {
return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Image
      style={styles.imageAccueil}
      source = {require('./assets/images/logo_small.png')}
    />
    <Search onValidate={(val: number) =>{
      navigation.navigate('Choice', {enteredRadius: val});
      }} />
  </View>
);
}

function ChoiceScreen({ route, navigation }) {
const passingRadius = route.params.enteredRadius
return (
  <SafeAreaView style={styles.container}>
    <Text>{passingRadius}</Text>
    <FlatListBasics
      radius = {passingRadius}
      onValidate={(ids : [number]) => {
        console.log("ids dans App",ids)
        navigation.navigate('Map', {radius : passingRadius, ids: ids})
      }

    }/>
  </SafeAreaView>
);
}

function MapScreen({ route, navigation }){
  const [radius1, setRadius] = React.useState(0)
  const radius = route.params.radius;
  return (
    <SafeAreaView style={styles.container}>
      <Text>{radius}</Text>
      <Map radius={radius} />
    </SafeAreaView>
);
}

const Stack = createNativeStackNavigator();

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
  maxHeight: '30%',
  resizeMode: 'contain',
},
item: {
  backgroundColor: "#f9c2ff",
  padding: 20,
  marginVertical: 8
},
header: {
  fontSize: 32,
  backgroundColor: "#fff"
},
});
