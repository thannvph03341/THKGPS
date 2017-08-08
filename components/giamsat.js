import React, { Component } from 'React'
import { View, Text, TextInput, StyleSheet, Dimensions, FlatList, ListView, TouchableOpacity } from 'react-native'
const { width, height } = Dimensions.get('window')

export default class GiamSat extends Component {

    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1 !== r2
        })

        this.state = {
            dataSource: ds.cloneWithRows(props.data)
        }

    }


    renderItemList(items){
        return(
           <View style={{ flexDirection:'column', justifyContent:'center'}}>
                <TouchableOpacity 
                style={{flexDirection:'row', alignItems:'center', margin: 5, borderBottomColor: '#2eec71', borderBottomWidth: 1}}
                onPress = {() => this.props.rootView.chonXeCanXem(items,0)}
                >
                    <Text style={{textAlign:'center', flex:1, fontSize: 18}}> {items.Group} - {items.Name} - {items.IsStop == true ? ' Đỗ':' Chạy' }</Text>
                </TouchableOpacity> 
            </View>
        )
    }

    render() {
        return (
                <ListView
                    style = {{top: 20, borderTopColor: '#000', borderTopWidth: 1}}
                    dataSource = {this.state.dataSource}
                    renderRow = {this.renderItemList.bind(this)}
                /> 
        )
    }
}



