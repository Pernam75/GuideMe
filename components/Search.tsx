import React from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

class Search extends React.Component<any, any, any> {
    constructor(props) {
        super(props);
    
        this.state = {value: null}
      }

    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    style={{
                        color: 'black',
                        borderColor: 'black',
                        borderWidth:1,
                        height:50
                    }}
                    keyboardType='numeric'
                    placeholder='Dans quel rayon (mètres) ?'
                    value={this.state.value}
                    onChangeText={val => this.setState({value: val})}
                    onSubmitEditing={() => this.props.onValidate(parseInt(this.state.value))}
                />
                <Button
                    title='Valider'
                    onPress={() => this.props.onValidate(parseInt(this.state.value))}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: '100%',
    }
  });

export default Search;