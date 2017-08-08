import React, { Component } from 'react'
import { AsyncStorage, ActivityIndicator, ListView, TextInput, Text, TouchableOpacity, View, Picker, Dimensions, TouchableHighlight, StyleSheet, Alert } from 'react-native'

import DateTimePicker from 'react-native-modal-datetime-picker' //sửa lại  key = keyDropDown, lable = labelDropDown
import ModalPicker from 'react-native-modal-picker'
import Moment from 'moment'

const { width, height } = Dimensions.get("window")
const luuStateHanhTrinh = 'luuStateHanhTrinh'

export default class HanhTrinh extends Component {

    // componentWillMount(){

    //     AsyncStorage.getItem(luuStateHanhTrinh, (err, data) => {
    //         if (err !=  null) {
    //             console.log(err)
    //         } else {
    //             const ob = JSON.parse(data)
    //             if (ob != null) {
    //                 this.setState({
    //                     txtThoiGianTu: ob.txtThoiGianTu,
    //                     txtThoiGianDen: ob.txtThoiGianDen,
    //                     dataSource: this.state.dataSource.cloneWithRows([{thoiGian:'Thời Gian', trangThai:'Trạng Thái', soKm: 'KM'}, ...ob.arrHanhTrinhXe])
    //                 })
    //                     this.props.rootView.xemHanhTrinhCuaXeMain([{thoiGian:'Thời Gian', trangThai:'Trạng Thái', soKm: 'KM'}, ...ob.arrHanhTrinhXe])

    //             }

    //         }
    //     })
    // }

    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.state = {
            isDateTimePickerVisible: false,
            isChoosDateTime: true,
            indexSelectPicker: 0,
            txtThoiGianTu: "00/00/0000 00:00",
            txtThoiGianDen: "00/00/0000 00:00",
            
            tenXe: 'Chọn xe!',
            idXeChon: null,
            tocHienThiXe: 1,
            loading: false,
            dataSource: ds.cloneWithRows([{ thoiGian: '', trangThai: '', soKm: '' }])
        }

    }

    converDateTime(dateString) {
        var datadate = Moment(dateString)
        let dd = datadate.date().toString().length == 1 ? "0" + datadate.date().toString() : datadate.date().toString()
        let mm = (parseInt(datadate.month()) + 1).toString().length == 1 ? "0" + (parseInt(datadate.month()) + 1).toString() : (parseInt(datadate.month()) + 1).toString()
        let hour = datadate.hour().toString().length == 1 ? "0" + datadate.hour().toString() : datadate.hour().toString()
        let minute = datadate.minute().toString().length == 1 ? "0" + datadate.minute().toString() : datadate.minute().toString()
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


    renderItemList(items) {
        return (

            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', marginLeft: 10, marginRight: 10 }}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#000', borderWidth: 1 }}
                    onPress={() => console.log(items)}
                >
                    <Text style={{ flex: 2, fontSize: items.soKm.toString() == "KM" ? 20 : 10, textAlign: 'center', borderStyle: 'solid', borderColor: "#000", borderWidth: 1 }}>{items.thoiGian}</Text>
                    <Text style={{ flex: 2, fontSize: items.soKm.toString() == "KM" ? 20 : 10, textAlign: 'center', borderStyle: 'solid', borderColor: "#000", borderWidth: 1 }}>{items.trangThai}</Text>
                    <Text style={{ flex: 2, fontSize: items.soKm.toString() == "KM" ? 20 : 10, textAlign: 'center', borderStyle: 'solid', borderColor: "#000", borderWidth: 1 }}>{items.soKm}</Text>
                </TouchableOpacity>
            </View>
        )
    }



    async xemHanhTrinhCuaXe() {
        try {

            if (this.state.idXeChon == null || this.state.txtThoiGianTu == '00/00/0000 00:00' || this.state.txtThoiGianDen == '00/00/0000 00:00') {
                Alert.alert('Thông báo', 'Bạn vui lòng nhập đầy đủ thông tin\nLưu ý: Thời gian xem không được vượt quá 2 ngày!', [{ text: 'OK' }])
                return
            }
            //////////

            if (this.state.txtThoiGianTu > this.state.txtThoiGianDen) {
                Alert.alert('Thông báo', 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc vui lòng chọn lại!', [{ text: 'OK' }])
                return
            }
            const a = Moment(this.state.txtThoiGianDen).from(this.state.txtThoiGianTu).split(' ')

            if (parseInt(a[1]) != NaN) {
                if (a[1] > 2) {
                    Alert.alert('Thông báo', 'Thời gian xem không được vượt quá 2 ngày!', [{ text: 'OK' }])
                    return
                }
            }



            this.setState({
                loading: true
            })
            //////

            let requestHanhTrinh = await fetch('http://gps.xtracking.vn/api/Tracking/getreviewtrip?trackerID=' + this.state.idXeChon + '&FromDate=' + this.converDateTime(this.state.txtThoiGianTu) + '&ToDate=' + this.converDateTime(this.state.txtThoiGianDen) + '&Excel=0')
            const responseHanhTrinh = await requestHanhTrinh.json();

            var hanhTrinhXe = [{ thoiGian: 'Thời Gian', trangThai: 'Trạng Thái', soKm: 'KM' }]

            for (var i = 0; i < responseHanhTrinh.data.length; i++) {
                var items = responseHanhTrinh.data[i];
                hanhTrinhXe.push(
                    {
                        ...items,
                        thoiGian: this.converDateTime(items.Time),
                        trangThai: items.Status,
                        soKm: items.Km,
                        latitude: items.Lat,
                        longitude: items.Lon
                    }
                )


                if (i == responseHanhTrinh.data.length - 1) {

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(hanhTrinhXe)
                    })

                    this.props.rootView.xemHanhTrinhCuaXeMain(hanhTrinhXe)
                    this.setState({
                        loading: false
                    })

                }

            }

            // await AsyncStorage.setItem(luuStateHanhTrinh, JSON.stringify(
            //     {
            //         txtThoiGianTu: this.state.txtThoiGianTu,
            //         txtThoiGianDen:this.state.txtThoiGianDen,
            //         arrHanhTrinhXe:hanhTrinhXe
            //     }

            // ))

        } catch (error) {
            Alert.alert('Thông báo', 'Không thể load dữ liệu bạn vui lòng thử lại!', [{ text: 'OK' }])
            console.log('Lỗi xemHanhTrinhCuaXe: ' + error)
            this.setState({
                loading: false
            })
        }
    }


    render() {
        return (
            <View style={{ flex: 1, top: 20, flexDirection: 'column', alignContent: 'center', alignItems: 'center', borderTopColor: '#000', borderTopWidth: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>Từ: </Text>
                    <TouchableOpacity onPress={() => this.setState({
                        isDateTimePickerVisible: true,
                        isChoosDateTime: true
                    })}>
                        <Text style={styles.valueStyle}>{this.state.txtThoiGianTu == '00/00/0000 00:00' ? '00/00/0000 00:00' : this.converDateTime(this.state.txtThoiGianTu)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.labelStyle}>Đến: </Text>
                    <TouchableOpacity onPress={
                        () => this.setState({
                            isDateTimePickerVisible: true,
                            isChoosDateTime: false
                        })
                    }>
                        <Text style={styles.valueStyle}>{this.state.txtThoiGianDen == '00/00/0000 00:00' ? '00/00/0000 00:00' : this.converDateTime(this.state.txtThoiGianDen)}</Text>
                    </TouchableOpacity>
                </View>

                <ModalPicker
                    data={this.props.data()}
                    initValue="Chọn xe!"
                    onChange={(option) => {
                        this.setState({
                            tenXe: option.labelDropDown,
                            idXeChon: option.Id
                        })
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.labelStyle}>Xe: </Text>
                        <Text style={styles.valueStyle}>{this.state.tenXe}</Text>
                    </View>
                </ModalPicker>

                {/*<ModalPicker
            data={[
                    {keyDropDown: 0, labelDropDown: "1"},
                    {keyDropDown: 1, labelDropDown: "2"}, 
                    {keyDropDown: 2, labelDropDown: "3"}, 
                    {keyDropDown: 3, labelDropDown: "4"}, 
                    {keyDropDown: 4, labelDropDown: "5"}
                 ]}
            onChange={(v)=>{ this.setState({tocHienThiXe: v.labelDropDown})}}
            >
           <View style={{flexDirection:'row'}}>
                    <Text style = {styles.labelStyle}>Tốc độ: </Text>
                    <Text style = {styles.valueStyle}>{this.state.tocHienThiXe}X</Text>   
                 </View>          
        </ModalPicker>*/}

                <TouchableOpacity
                    style={{ width: width, flexDirection: 'row' }}
                    onPress={() => this.xemHanhTrinhCuaXe()}>
                    <View style={{ borderRadius: 5, height: 40, flex: 1, backgroundColor: '#2ecc71', marginLeft: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginBottom: 10 }}>

                        {this.state.loading == true ? <ActivityIndicator
                            animating={this.state.loading}
                            size="large"
                            color='#ff246d'
                            style={[{ flex: 1, backgroundColor: '#2eec71' }]}
                        /> : <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color: '#fff' }}>Xem</Text>}
                    </View>
                </TouchableOpacity>

                <ListView
                    style={{ width: width }}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItemList.bind(this)}
                />

                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode='datetime'
                    titleIOS='Chọn ngày giờ'
                    is24Hour={false}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    labelStyle: {
        fontSize: 20,
        width: (width / 3) - 10,
        left: 10
    },
    valueStyle: {
        fontSize: 20,
        width: (width - width / 3) - 10,
        right: 10
    }
})