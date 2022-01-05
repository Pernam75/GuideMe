import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, SectionList  } from 'react-native';

import Constants from "expo-constants";

function dataTransform(){
  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"]
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"]
    },
    {
      title: "Drinks",
      data: ["Water", "Coke", "Beer"]
    },
    {
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"]
    }
  ];
  return DATA;
}


const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

class FlatListBasics extends React.Component<any, any, any> {
  render(){
      return (
          <SafeAreaView style={styles.container}>
            <SectionList
              sections={dataTransform()}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => <Item title={item} />}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
              )}
            />
        </SafeAreaView>
        );
  }
}



export default FlatListBasics;

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    textAlign:'center',
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
});