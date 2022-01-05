import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, SectionList } from 'react-native';
import { monumentsInRadius } from './time_matrix';
import Constants from "expo-constants";
function transformData() {
  const mapData = monumentsInRadius(48.85684, 2.35009, 3000);
  let returningData: [{ key: String }]
  returningData = [{ key: "" }]
  mapData.forEach((value, key) => {
    returningData.push({ key: value[0].toString() });
    console.log(value[0]);
  });
  return returningData;
}
const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={transformData()}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
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
    textAlign: 'center',
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
});