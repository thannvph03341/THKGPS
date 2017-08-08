import React, {Component} from 'React'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native' 


export default class GiamSat extends  Component {

    constructor(pors){
        super(pors)

    }

    render(){
        return (
            <View style={{flex:1, backgroundColor:'#fff', top:180, flexDirection:'column', alignItems: 'center', justifyContent:'center'}}>
                <TouchableOpacity
                style = {{flex: 1, width: 100, flexDirection: 'row'}}
                onPress = {() => this.props.rootView.funcDangXuat()}>
                    <View style = {{ borderRadius: 5,  height: 40, flex: 1, backgroundColor: '#2ecc71', flexDirection: 'row', alignItems: 'center', alignContent:'center', marginBottom: 10}}>
                        <Text style = {{flex: 1, textAlign: 'center', fontSize: 20, color: '#fff'}}>Đăng xuất</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
