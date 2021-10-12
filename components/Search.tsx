import React from 'react'
import { View, TextInput, Text, Button } from 'react-native';

class Search extends React.Component {
    render(){
        return(
            <View style={{width: '100%'}}>
                <TextInput style={{color: 'red', borderColor:'black', borderWidth:1, height:50}} placeholder='Ou souhaitez vous aller ?'/>
                <Button title='Rechercher' onPress={() => {}}><Text>Text</Text></Button>
            </View>
        )
    }
}
export default Search;