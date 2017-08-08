import React, { Component } from 'react'
import {Text, View, StyleSheet } from 'react-native'

export default class LayDiaChiDi extends Component {

    constructor(props){
        super(props)
        this.state = {
            diaChiDi: 'Đang cập nhật!'
        }
        this.LayDiaChi(this.props.valueLatAndLon)
    }


    async LayDiaChi(data) {

        try {

        let request = await fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng=' +  data + '&sensor=true')
    
        let responseDiaChi = await request.json();

        if (responseDiaChi.status == 'OK') {
            var dcFull = responseDiaChi.results[0].formatted_address
            

        //return  dcFull     
        this.setState({diaChiDi:dcFull})
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
                    <Text style={{ width: 30, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF', height:80 }} numberOfLines = {2} >Từ: </Text>
                    <Text style={{ flex: 1, fontSize: 15, marginLeft: 2, top: 6, color:'#FFF', height:80 }} numberOfLines = {2} >{this.state.diaChiDi}</Text>
                </View>
                
            )
    }

}