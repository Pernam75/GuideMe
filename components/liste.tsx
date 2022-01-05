import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, SectionList } from 'react-native';
import { monumentsInRadius } from './time_matrix';
import {CheckBox} from 'react-native-elements';

class FlatListBasics extends React.Component<any, any, any> {
  constructor(props: any){
    super(props)
    this.state = {
      data: [],
      ids: []
    }
  }

  transformData = () => {
    const mapData = monumentsInRadius(48.85684, 2.35009, 3000);
    let returningData: [{ id: any, key: String }];
    returningData = [{ id: 0, key: "" }];
    let arrayData = Array.from(mapData.values());
    for (let i = 0; i < arrayData.length; i++) {
      returningData.push({id: i, key: arrayData[i][0].toString() });
      
    }
    return returningData.slice(1);
  }
  
  renderItem = ({ item }) => {
    return (
      <View style = {styles.box}>
        <Text style={styles.item}>{item.key}</Text>
        <CheckBox
          // iconRight
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={this.isChecked(item.id)}
          onPress={() => this.toggleChecked(item.id)}
        />
      </View>
      
    )
  }

  isChecked = (itemId) => {
    const isThere = this.state.ids.includes(itemId);
    return isThere;
  };

  toggleChecked = (itemId) => {
    const ids = [...this.state.ids, itemId];

    if (this.isChecked(itemId)) {
      this.setState({
        ...this.state,
        ids: this.state.ids.filter((id) => id !== itemId),
      });
    } else {
      this.setState({
        ...this.state,
        ids,
      });
    }
  };


  render(){
    return (
      <View style={styles.container}>
        <Text>Sélectionnez les monuments</Text>
        <FlatList
          data={this.transformData()}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
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
  box:{
    backgroundColor: "#f9c2ff",
    flex: 1,
    flexDirection: 'row'
  }
  
});

export default FlatListBasics;