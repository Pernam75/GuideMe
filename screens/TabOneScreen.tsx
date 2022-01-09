import * as React from 'react';
import { StyleSheet, Image, SafeAreaView, SectionList } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Search from '../components/Search';
import FlatListBasics from '../components/liste';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function HomeScreen({ navigation }) {
  const text = "coucou";
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={styles.imageAccueil}
        source = {require('../assets/images/logo_small.png')}
      />
      <Search onValidate={(val: number) =>{
        navigation.navigate('Details', {text: val});
        console.log(val);
        }} />
    </View>
  );
}

function DetailsScreen({ route }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{route.params.text}</Text> 
      <FlatListBasics/>
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
