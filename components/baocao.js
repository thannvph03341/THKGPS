import React, { Component } from 'react'
import {ActivityIndicator, ScrollView ,ListView, TextInput, Text, TouchableOpacity, View, Picker, Dimensions, TouchableHighlight,StyleSheet, Alert } from 'react-native'

import DateTimePicker from 'react-native-modal-datetime-picker' //sửa lại  key = keyDropDown, lable = labelDropDown
import ModalPicker from 'react-native-modal-picker'
import Moment from 'moment'

const {width, height} = Dimensions.get("window")
const objTitleBaoCaoTongHop = {Name: 'Phương tiện', Time: 'Ngày', Fuel: 'Nhiên liệu', Distance: 'Tổng Km', Vtb:'VTB', Vmax:'VMAX', stopCount: 'SL đỗ', OverSpeedCount: 'SL quá tốc', SpeedXKM: 'Tốc độ quá', DoorCount: 'SL mở cửa', AirCount:'SL mở MĐH', TimeOn: 'TG nổ máy' }
const objTitleBaoCaoHanhTrinh = {Name: 'Phương tiện', StartTime: 'Bắt đầu', EndTime: 'Kết thúc', Period: 'Thời gian', TotalKm:'Tổng Km', StartLatLng:'Từ', EndLatLng: 'Đến'}


export default class BaoCao extends  Component {

     constructor(props){
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1 !== r2
        })

        this.state = {
            isDateTimePickerVisible: false,
            indexSelectPicker:0,
            txtThoiGianTu:"00/00/0000 00:00",
            txtThoiGianDen:"00/00/0000 00:00",
            isChoosDateTime: true,
            tenXe:'Chọn xe!',
            idXeChon: null,
            tocHienThiXe: 1,
            dataSource: ds.cloneWithRows([objTitleBaoCaoTongHop]),
            chonBaoCao: 'tongHop',
            txtDiaChiBatDau: 'Đang cập nhật...',
            txtDiaChiKetThuc: 'Đang cập nhật...',
            loadingTongHop:false,
            loadingHanhTrinh:false
        }
        
    }

    converDateTime(dateString) {
        var datadate = Moment(dateString)
        let dd =  datadate.date().toString().length == 1 ? "0" + datadate.date().toString(): datadate.date().toString()
        let mm =  (parseInt(datadate.month()) + 1).toString().length == 1 ? "0" + (parseInt(datadate.month()) + 1).toString(): (parseInt(datadate.month()) + 1).toString()
        let hour =  datadate.hour().toString().length == 1 ?  "0" + datadate.hour().toString() : datadate.hour().toString() 
        let minute =  datadate.minute().toString().length == 1  ? "0" + datadate.minute().toString(): datadate.minute().toString()
        return dd + '/' + mm + '/' + datadate.year() + " " + hour + ":" + minute
    }

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
    _handleDatePicked = (date) => {
            if (this.state.isChoosDateTime) {
                this.setState({
                    txtThoiGianTu: date,
                })
            } else {
                 this.setState({
                    txtThoiGianDen: date,
                })
            }
        this._hideDateTimePicker();
    };


    renderItemList(items){
        console.log(items)

        switch(this.state.chonBaoCao){
            case 'baoCaoHanhTrinh':
                    return(
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.Name}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.StartTime == 'Bắt đầu' ? items.StartTime :this.converDateTime(items.StartTime)}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.EndTime == 'Kết thúc' ? items.EndTime :this.converDateTime(items.EndTime)}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.Period}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.TotalKm}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>
                                       {items.StartLatLng}
                                    </Text> 
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>
                                       {items.EndLatLng}
                                    </Text>
                                </View>
                            </View>
                        )
            case 'tongHop':
                        return(
                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.Name}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.Time == 'Ngày' ? items.Time :this.converDateTime(items.Time)}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.Fuel}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.Distance}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.Vtb}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.Vmax}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.stopCount}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.OverSpeedCount}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.SpeedXKM}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.DoorCount}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.AirCount}</Text>
                                </View>
                                <View style={styles.styleViewInScrollview}>
                                    <Text style = {{textAlign: 'center'}}>{items.TimeOn}</Text>
                                </View>
                            </View>
                        ) 
        }
    }



    async baoCao(index){

        switch(index)
        {
            case 0: 
                try {
                   

                    if (this.state.idXeChon == null || this.state.txtThoiGianTu == '00/00/0000 00:00' || this.state.txtThoiGianDen == '00/00/0000 00:00') {
                        Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!', [{text: 'OK'}])
                        return 
                    } 

                        if (this.state.txtThoiGianTu > this.state.txtThoiGianDen) {
                            Alert.alert('Thông báo', 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc vui lòng chọn lại!', [{text: 'OK'}])
                            return
                        }
                        // const a = Moment(this.state.txtThoiGianDen).from(this.state.txtThoiGianTu).split(' ')
                        
                        // if (parseInt(a[1]) != NaN) {
                        //     if (a[1] > 2) {
                        //             Alert.alert('Thông báo', 'Thời gian xem không được vượt quá 2 ngày!', [{text: 'OK'}])
                        //         return 
                        //     }
                        // }



                    this.setState({
                        chonBaoCao: 'tongHop',
                        loadingTongHop:true
                    })
                    let requestBCTopHop = await fetch('http://gps.xtracking.vn/api/Report/getgeneral?DeviceID=' + this.state.idXeChon + '&FromDate=' + this.converDateTime(this.state.txtThoiGianTu) + '&ToDate=' + this.converDateTime(this.state.txtThoiGianDen) + '&Excel=0')
                    let jsonBCTopHop = await requestBCTopHop.json();

                    console.log(jsonBCTopHop)

                    const t = [objTitleBaoCaoTongHop, ...jsonBCTopHop.data]

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(t)
                    })

                    this.setState({
                        loadingTongHop:false
                    })
                } catch (error) {
                    Alert.alert('Thông báo', 'Tối đa xem 1 tháng!', [{text: 'OK'}])
                    console.log('Lỗi bao cao tong hop: ' + error)

                    this.setState({
                        loadingTongHop:false
                    })
                }
            break
            case 1:
                try {
                   
                    if (this.state.idXeChon == null || this.state.txtThoiGianTu == '00/00/0000 00:00' || this.state.txtThoiGianDen == '00/00/0000 00:00') {
                        Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!', [{text: 'OK'}])
                        return 
                    } 


                        if (this.state.txtThoiGianTu > this.state.txtThoiGianDen) {
                            Alert.alert('Thông báo', 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc vui lòng chọn lại!', [{text: 'OK'}])
                            return
                        }
                        // const a = Moment(this.state.txtThoiGianDen).from(this.state.txtThoiGianTu).split(' ')
                        
                        // if (parseInt(a[1]) != NaN) {
                        //     if (a[1] > 2) {
                        //             Alert.alert('Thông báo', 'Thời gian xem không được vượt quá 2 ngày!', [{text: 'OK'}])
                        //         return 
                        //     }
                        // }



                    this.setState({
                        chonBaoCao: 'baoCaoHanhTrinh',
                        loadingHanhTrinh: true
                    })
                    let requestBCHanhTrinh = await fetch('http://gps.xtracking.vn/api/Report/getdistances?trackerID=' + this.state.idXeChon + '&FromDate=' + this.converDateTime(this.state.txtThoiGianTu) + '&ToDate=' + this.converDateTime(this.state.txtThoiGianDen) + '&Excel=0')
                    let jsonBCHanhTrinh = await requestBCHanhTrinh.json();

                    const ht = [objTitleBaoCaoHanhTrinh, ...jsonBCHanhTrinh.data]
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(ht)
                    })

                    this.setState({
                        loadingHanhTrinh: false
                    })
                } catch (error) {
                    Alert.alert('Thông báo', 'Tối đa xem 1 tháng!', [{text: 'OK'}])
                    console.log('Lỗi xemHanhTrinhCuaXe: ' + error)
                    this.setState({
                        loadingHanhTrinh: false
                    })
                }
            break
        }
        
    }

    async LayDiaChiBaoCao(LatLng) {
        try {
        let request = await fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + LatLng + '&sensor=true')
        let responseDiaChi = await request.json();
        console.log(responseDiaChi)
        if (responseDiaChi.status == 'OK') {
           
           return  responseDiaChi.results[0].address_components
            // if (isStartOrEnd) {
            //     this.setState({
            //         txtDiaChiBatDau: responseDiaChi.results[0].address_components
            //     })
            // } else {
            //     this.setState({
            //         txtDiaChiKetThuc: responseDiaChi.results[0].address_components
            //     })
            // }
        } 
       

        } catch (error) {
        // Alert.alert('Thông báo', 'Lỗi: ' + error, [{text: 'OK'}])
            console.log('Lỗi LayDiaChi: ' + error)
            return ''
        }

    }

  render() {
    return (
      <View style={{ flex: 1 , top: 20, flexDirection:'column', alignContent: 'center', alignItems:'center', borderTopColor:'#000', borderTopWidth: 1}}>
        <View style={{flexDirection:'row' }}>
                <Text style = {styles.labelStyle}>Từ: </Text>
                <TouchableOpacity onPress={() => this.setState({ 
                    isDateTimePickerVisible: true,
                    isChoosDateTime: true 
                })}>
                <Text style = {styles.valueStyle}>{this.state.txtThoiGianTu == '00/00/0000 00:00' ? '00/00/0000 00:00' :this.converDateTime(this.state.txtThoiGianTu)}</Text>
                </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}>
                <Text style={styles.labelStyle}>Đến: </Text>
                <TouchableOpacity onPress={
                    () => this.setState({ 
                    isDateTimePickerVisible: true,
                    isChoosDateTime: false 
                })
                }>
                <Text style={styles.valueStyle}>{this.state.txtThoiGianDen == '00/00/0000 00:00' ? '00/00/0000 00:00': this.converDateTime(this.state.txtThoiGianDen)}</Text>
                </TouchableOpacity>
        </View>

        <ModalPicker
            data={this.props.data()}
            initValue="Chọn xe!"
            onChange={(option)=>{ this.setState({
                tenXe: option.labelDropDown,
                idXeChon: option.Id
                })}}
            >
                <View style={{flexDirection:'row'}}>
                    <Text style = {styles.labelStyle}>Xe: </Text>
                    <Text style= {styles.valueStyle}>{this.state.tenXe}</Text>   
                 </View>
        </ModalPicker>

        <TouchableOpacity
        style = {{width: width,flexDirection: 'row'}}
        onPress = {() => this.baoCao(0)}>
            <View style = {{ borderRadius: 5,  height: 40, flex: 1, backgroundColor: '#2ecc71', marginLeft: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center', alignContent:'center', marginBottom: 10, marginTop: 10}}>
                
                {this.state.loadingTongHop == true ? <ActivityIndicator 
                    animating = {this.state.loadingTongHop}
                    size = "large"
                    color = '#ff246d'
                    style={[{flex:1, backgroundColor: '#2eec71'}]}
                    />: <Text style = {{flex: 1, textAlign: 'center', fontSize: 20, color: '#fff'}}>Báo Cáo Tổng Hợp</Text>}
            </View>
        </TouchableOpacity>
        <TouchableOpacity
        style = {{width: width,flexDirection: 'row'}}
        onPress = {() => this.baoCao(1)}>
            <View style = {{ borderRadius: 5,  height: 40, flex: 1, backgroundColor: '#2ecc71', marginLeft: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center', alignContent:'center', marginBottom: 10}}>
                {this.state.loadingHanhTrinh == true ? <ActivityIndicator 
                    animating = {this.state.loadingHanhTrinh}
                    size = "large"
                    color = '#ff246d'
                    style={[{flex:1, backgroundColor: '#2eec71'}]}
                    />: <Text style = {{flex: 1, textAlign: 'center', fontSize: 20, color: '#fff'}}>Báo Cáo Hành Trình</Text>}
            </View>
        </TouchableOpacity>

        <ScrollView
                showsVerticalScrollIndicator = {false}
                showsHorizontalScrollIndicator = {false}
                horizontal = {true}
                automaticallyAdjustContentInsets = {false} 
                style = {{flexDirection:'column', marginBottom: 20, marginLeft: 10, marginRight: 10}}>
            <ListView
                showsHorizontalScrollIndicator = {false}
                showsVerticalScrollIndicator = {false}
                style = {{width: this.state.chonBaoCao == 'tongHop' ? 1800:1050}}
                dataSource = {this.state.dataSource}
                renderRow = {this.renderItemList.bind(this)}
                scrollEnabled = {false}
                automaticallyAdjustContentInsets = {false}
            />

        </ScrollView>

        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode = 'datetime'
          titleIOS = 'Chọn ngày giờ'
          is24Hour = {false}
        />
      </View>
    );
  }
}
    const styles = StyleSheet.create({
      labelStyle:{
          fontSize: 20,
          width: (width /3) - 10,
          left: 10
      },
      valueStyle:{
          fontSize:20,
          width:(width - width /3) - 10,
          right: 10
      }, 
      styleViewInScrollview:{
         width: 150,
         flexDirection: 'row',
         borderColor: '#000',
         borderWidth: 1,
         alignContent: 'center',
         justifyContent: 'center'
      },
      textStyle:{
          textAlign: 'center',
      }

    })
