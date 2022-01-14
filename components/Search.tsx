import React from 'react'
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import TransportRadio from './TransportRadio';
import { Keyboard,  TouchableWithoutFeedback  } from 'react-native'

const DismissKeyboard = ({ children }) => (
<TouchableWithoutFeedback 
onPress={() => Keyboard.dismiss()}> {children}
</TouchableWithoutFeedback>
);

class Search extends React.Component<any, any, any> {
    constructor(props) {
        super(props);
    
        this.state = {
            value: null, 
            transport: "foot-walking"
        }
      }
    

    render(){
        return(
            <TouchableWithoutFeedback   onPress={Keyboard.dismiss} 
                                        accessible={false}>
                <View style={styles.container}>
                    <View style={styles.textBox}>
                        <Text style={styles.textStyle}>Dans quel rayon souhaitez vous vous déplacer ?</Text>
                    </View>
                    <View style={styles.textBox}>
                    <TextInput showSoftInputOnFocus = {false} style={styles.zoneDeTexte}
                        keyboardType='numeric'
                        placeholder='(En mètres)'
                        placeholderTextColor={"#0B0CAC"}
                        value={this.state.value}
                        onChangeText={val => this.setState({value: val})}
                        onSubmitEditing={() => this.props.onValidate(parseInt(this.state.value), this.state.transport)}
                    />
                    </View>
                    <View style={styles.buttonBox}>
                    <Button 
                        title='Valider'
                        color='#FF5576'
                        onPress={() => this.props.onValidate(parseInt(this.state.value))}
                    />
                    </View>
                    <View style={{width:'80%'}}>
                        <TransportRadio
                            isChecked={(transport :String) => this.setState({transport: transport})}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>

        )
    }
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    },
    zoneDeTexte: {
        borderColor: '#0B0CAC',
        borderWidth:1,
        width: '100%',
        textAlign: 'center',
        height: 50,
    },
    textBox: {
        width : '75%',
    },
    buttonBox: {
        width: '75%',
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: '10%',
    }
  });

export default Search;