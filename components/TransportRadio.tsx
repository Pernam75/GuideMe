import * as React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';

class TransportRadio extends React.Component<any, any, any> {

    render() {
        const [checked, setChecked] = React.useState('first');
        return(
            <View>
                <RadioButton
                    value="first"
                    status={ checked === 'first' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('first')}
                />
                <RadioButton
                    value="second"
                    status={ checked === 'second' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('second')}
                />
                <RadioButton
                    value="third"
                    status={ checked === 'third' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('third')}
                />
                <RadioButton
                    value="fourth"
                    status={ checked === 'fourth' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('fourth')}
                />
            </View>
        )
    }
}

export default TransportRadio;