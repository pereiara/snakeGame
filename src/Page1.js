
import React,{ Component } from 'react';
import { View, Button, Text, TextInput } from 'react-native';




class Page1 extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};

    }



    render() {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 1}}>
            <Text >Voçê entrará para o rank, caso esteja entre os 5 melhores.</Text>
            <Text style={{fontSize: 20}}>Seu nome:</Text>
            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
            <TextInput
            style={{ height: 40, width: 85, borderColor: 'gray', borderWidth: 1 }}
            placeholder="Anônimo"
            maxLength={12}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
            <View style={{justifyContent: 'center', alignItems: 'center', margin: 5}}>
            <Button
            title="Start Game ..."
            onPress={() => this.props.navigation.navigate('Game', {nome: this.state.text})}
            />
            </View>
            </View>
            </View>
        );
    }
}


Page1.navigationOptions = {
    title: 'Home',
}

export default Page1;