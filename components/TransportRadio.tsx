import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, RadioGroup } from "react-native-radio-check"

class TransportRadio extends React.Component<any, any, any> {
    constructor(props) {
        super(props)
        this.state = { check: true, index: 0 }
    }
    render() {
        return(
            <View>
                <RadioGroup
                style={{ flexDirection: 'row', marginTop: 10}}
                checkedId={this.state.index}
                iconStyle={{
                }}
                textStyle={{ marginLeft: 5 }}
                onChecked={(id, value) => {
                    console.info("Group===", id)
                    console.info("Value===", value)
                }}>
                <RadioButton
                    icon={{
                        normal: require('../assets/images/icons/car-unchecked.png'),
                        checked: require('../assets/images/icons/car-checked.png')
                    }}
                    value={"car"} />
                <RadioButton
                    icon={{
                        normal: require('../assets/images/icons/radio-unchecked.png'),
                        checked: require("../assets/images/icons/radio-checked.png")
                    }}
                    style={{ marginLeft: 20 }}
                    value={2} />
                <RadioButton
                    icon={{
                        normal: require('../assets/images/icons/radio-unchecked.png'),
                        checked: require("../assets/images/icons/radio-checked.png")
                    }}
                    style={{ marginLeft: 20 }}
                    value={3} />
                <RadioButton
                    icon={{
                        normal: require('../assets/images/icons/radio-unchecked.png'),
                        checked: require("../assets/images/icons/radio-checked.png")
                    }}
                    style={{ marginLeft: 20 }}
                    value={4} />
                </RadioGroup>
            </View>
        )
    }
}

export default TransportRadio;