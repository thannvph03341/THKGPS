import React, { Component } from 'react'
import {Text, View, StyleSheet } from 'react-native'

export default class LayDiaChiDen extends Component {

    constructor(props){
        super(props)
        this.state = {
            diaChiDen: 'Đang cập nhật!'
        }
        this.LayDiaChi(this.props.valueLatAndLon)
    }


    async LayDiaChi(data) {

        try {

        let request = await fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng=' +  data + '&sensor=true')
    
        let responseDiaChi = await request.json();

        if (responseDiaChi.status == 'OK') {
            var dcFull = responseDiaChi.results[0].formatted_address
           // console.log(dcFull)

        //return  dcFull     
        this.setState({diaChiDen:dcFull})
        } else {
            //return  'Đang cập nhật! '
        }

        } catch (error) {
        console.log('Lỗi LayDiaChi: ' + error)
        //return  'Đang cập nhật! '
        // Alert.alert('Thông báo', 'Lỗi: ' + error, [{text: 'OK'}])
        
        }

  }


    render (){
        return (
               <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{ width: 35, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF', height:80 }} numberOfLines = {2} >Đến: </Text>
                    <Text style={{ flex: 1, fontSize: 15, marginLeft: 2, top: 6, color:'#FFF', height:80 }} numberOfLines = {2} >{this.state.diaChiDen}</Text>
                </View>
            )
    }

}