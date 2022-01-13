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
                        normal: require('../assets/images/icons/walk-unchecked.png'),
                        checked: require('../assets/images/icons/walk-checked.png')
                    }}
                    iconStyle={{maxWidth:'30%', maxHeight:'30%', resizeMode: 'contain'}}
                    value={"foot-walking"} />
                <RadioButton
                    icon={{
                        normal: require('../assets/images/icons/car-unchecked.png'),
                        checked: require("../assets/images/icons/car-checked.png")
                    }}
                    iconStyle={{maxWidth:'30%', maxHeight:'30%', resizeMode: 'contain'}}
                    value={"driving-car"} />
                <RadioButton
                    icon={{
                        normal: require('../assets/images/icons/bike-unchecked.png'),
                        checked: require("../assets/images/icons/bike-checked.png")
                    }}
                    iconStyle={{maxWidth:'30%', maxHeight:'30%', resizeMode: 'contain'}}
                    value={"cycling-road"} />
                <RadioButton
                    icon={{
                        normal: require('../assets/images/icons/wheelchair-unchecked.png'),
                        checked: require("../assets/images/icons/wheelchair-checked.png")
                    }}
                    iconStyle={{maxWidth:'30%', maxHeight:'30%', resizeMode: 'contain'}}
                    value={"wheelchair"} />
                </RadioGroup>
            </View>
        )
    }
}

export default TransportRadio;