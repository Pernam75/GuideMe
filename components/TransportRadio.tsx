import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, RadioGroup } from "react-native-radio-check"

class TransportRadio extends React.Component<any, any, any> {
    constructor(props) {
        super(props)
        this.state = { check: true, index: 0, transport: "foot-walking" }
    }

    toggleChecked = () =>{
        switch (this.state.index) {
            case 0:
                this.setState({transport: "foot-walking"});
                break;
            case 1:
                this.setState({transport: "driving-car"});
                break;
            case 2:
                this.setState({transport: "cycling-road"});
                break;
            case 3:
                this.setState({transport: "wheelchair"});
                break;
            default:
                this.setState({transport: "foot-walking"});
                break;
        }
        console.log(this.state.transport)
    }

    render() {
        return(
            <View style={{flexDirection:'row'}}>
                <RadioGroup
                    style={{flexDirection: 'row', alignItems:'center', width:'25%', height:'40%',  marginTop:'10%'}}
                    checkedId={this.state.index}
                    onChecked={(id, value) => {
                        this.setState({index: id})
                        this.toggleChecked()
                        this.props.isChecked(value)
                        //console.info("Group===", id)
                        //console.info("Value===", value)
                }}>
                <RadioButton
                    icon={{
                        normal: require('../assets/images/icons/walk-unchecked.png'),
                        checked: require('../assets/images/icons/walk-checked.png')
                    }}
                    iconStyle={{flex: 1, maxWidth:'100%', maxHeight:'100%', resizeMode: 'contain'}}
                    value={"foot-walking"} />
                <RadioButton
                    icon={{
                        normal: require('../assets/images/icons/car-unchecked.png'),
                        checked: require("../assets/images/icons/car-checked.png")
                    }}
                    iconStyle={{flex: 1, maxWidth:'100%', maxHeight:'100%', resizeMode: 'contain'}}
                    value={"driving-car"} />
                <RadioButton
                    icon={{
                        normal: require('../assets/images/icons/bike-unchecked.png'),
                        checked: require("../assets/images/icons/bike-checked.png")
                    }}
                    iconStyle={{flex: 1, maxWidth:'100%', maxHeight:'100%', resizeMode: 'contain'}}
                    value={"cycling-road"} />
                <RadioButton
                    icon={{
                        normal: require('../assets/images/icons/wheelchair-unchecked.png'),
                        checked: require('../assets/images/icons/wheelchair-checked.png')
                    }}
                    iconStyle={{flex: 1, maxWidth:'100%', maxHeight:'100%', resizeMode: 'contain'}}
                    value={"wheelchair"} />
                </RadioGroup>
            </View>
        )
    }

    
}

export default TransportRadio;