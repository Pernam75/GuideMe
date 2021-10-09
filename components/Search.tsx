import React from 'react'
import { View, TextInput, Text, Button } from 'react-native';

class Search extends React.Component {
    render(){
        return(
            <View>
                <TextInput style={{color: 'red'}} placeholder='Ou souhaitez vous aller ?'/>
                <Button title='Rechercher' onPress={() => {}}><Text>Text</Text></Button>
            </View>
        )
    }
}
export default Search;