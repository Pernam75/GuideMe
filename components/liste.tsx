import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, SectionList, Alert, Button } from 'react-native';
import { monumentsInRadius } from './time_matrix';
import {CheckBox} from 'react-native-elements';
import { Accuracy } from 'expo-location';
import * as Location from 'expo-location';

class FlatListBasics extends React.Component<any, any, any> {
  constructor(props: any){
    super(props)
    this.state = {
      lat: 0,
      lon: 0,
      data: [],
      ids: []
    }
  }

  componentDidMount() {
    const getCurrentLocation = async() => {
      const {status}  = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('Activer la localisation', 'Pour profiter de toutes les fonctionnalités de GuideMe, veuillez activer la localisation.')
        return;
      }
      const initialposition = await Location.getCurrentPositionAsync({ accuracy: Accuracy.Low });
      this.setState({lat: initialposition.coords.latitude, lon: initialposition.coords.longitude});
    }
    getCurrentLocation();
  }

  transformData = () => {
    const mapData = monumentsInRadius(this.state.lat, this.state.lon, this.props.radius);
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
        <View style = {styles.textInBox}>
          <Text style={styles.item}>{item.key}</Text>
        </View>

        <View style={styles.checkbox}>
          <CheckBox 
            // iconRight
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.isChecked(item.id)}
            onPress={() => this.toggleChecked(item.id)}
          />
        </View>
      </View>
      
    )
  }

  isChecked = (itemId) => {
    const isThere = this.state.ids.includes(itemId);
    return isThere;
  };

  toggleChecked = (itemId) => {
    const ids = [...this.state.ids, itemId];
    console.log("ids dans toggle",ids);
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
        <Text style={styles.title}>Sélectionnez les monuments :</Text>
        <FlatList
          data={this.transformData()}
          keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={this.renderItem}
        />
      <View style={styles.bouton}>
        <Button
          title="Valider"
          onPress={() => this.props.onValidate(this.state.ids)}
          color={"#FF5576"}
        />
      </View>
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
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    marginBottom: '5%',
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  box:{
    marginVertical: '3%',
    backgroundColor: "#D1DCE7",
    display:'flex',
    flexDirection: 'row',
    borderRadius: 10,
  },
  'box:last-child':{
    borderTopEndRadius: 10
  },
  'box:first-child':{
    borderBottomRightRadius: 10
  },
  checkbox:{
    flex:1,
    maxWidth:'20%',
    alignItems:'center',
  },
  textInBox:{
    flex:1,
  },
  bouton:{
    marginVertical:'3%',
    borderRadius:10,
  }
});

export default FlatListBasics;