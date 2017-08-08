/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, ReactPropTypes, PropTypes } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator,
  AsyncStorage,
  ScrollView,
  TouchableOpacity, Image, ListView, TouchableHighlight, StatusBar, NetInfo
} from 'react-native'
// import redux from 'redux'
// import { Provider } from 'react-redux'
import MapPolyLine from './components/polyline/mappolyline.js'
// import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import ButtonMenuAction from './components/button/button_menu_action.js'
// import MenuAction from './components/button/button_action_custom.js'
import LoginGPS from './components/login/login_gps.js'
import CustomCallout from './components/CustomCallout/CustomCallout.js'
import Moment from 'moment'


import LayDiaChiDi from './components/LayDiaChiDi'
import LayDiaChiDen from './components/LayDiaChiDen'
//import GiamSatNew from './components/component_giam_sat.js'
//import HanhTrinh from './components/hanhtrinh.js'
//import BaoCao from './components/baocao.js'
import CaiDat from './components/caidat.js'
import iconCarRun from './components/image/android/iconCarRun.png'
import iconCarNull from './components/image/android/iconCarNull.png'
import iconCarStop from './components/image/android/iconCarStop.png'
import iconFab from './components/image/android/iconFab.png'
/**
 * sửa lại  key = keyDropDown, lable = labelDropDown
 */
import DateTimePicker from 'react-native-modal-datetime-picker'
/**
 * sửa lại  key = keyDropDown, lable = labelDropDown
 */
import ModalPicker from 'react-native-modal-picker'
import muiTen from './components/image/mt.png'
import muiTen1 from './components/image/mt_1.png'
import iconCarRunSelect from './components/image/android/iconCarRunSelect.png'
import iconCarNullSelect from './components/image/android/iconCarNullSelect.png'
import iconCarStopSelect from './components/image/android/iconCarStopSelect.png'
import iconExit from './components/image/android/iconThoat.png'

import iconDongCo from './components/image/android/iconDongCo.png'
import iconXang from './components/image/android/iconCayXang.png'
import iconQuaToc from './components/image/android/iconQuaToc.png'

import icon_error_gps from './components/image/android/icon_error_gps.png'
import icon_pause from './components/image/android/icon_pause.png'
import icon_run from './components/image/android/icon_run.png'
import icon_stop from './components/image/android/icon_stop.png'
import iconStopHt from './components/image/android/iconStopHt.png'
import iconPlayHt from './components/image/android/iconPlayHt.png'
import bg_user from './components/image/android/bg_user.png'
import img_profile_default from './components/image/android/img_profile_default.png'
//import ImageRotate from 'react-native-image-rotate'
//import imageCrop from './assets/spinners/bk_spiner.png'


import timeStart from './components/image/android/timeStart.png'
import timeEnd from './components/image/android/timeEnd.png'
import icon_ellipes from './components/image/android/ellipes_icon.png'
import ellipse_line from './components/image/android/ellipse_line.png'

import iconList from './components/image/android/icon_list.png'
import iconList_1 from './components/image/android/icon_list_1.png'
import iconCarInput from './components/image/android/icon_car_input.png'
import iconBatDauHanhTrinh from './components/image/android/iconBatDauHanhTrinh.png'
import iconKetThucHanhTrinh from './components/image/android/iconKetThucHanhTrinh.png'
import iconDiemDungHanhTrinh from './components/image/android/iconDiemDungHanhTrinh.png'
// import AutocomplateTextView from 'react-native-autocomplete-input'
// import { createTransition, FlipX } from 'react-native-transition';

// const Transition = createTransition(FlipX);
const dataLoginKey = 'dataLogin'
const { width, height } = Dimensions.get("window")
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default class THKGPS extends Component {

  componentWillMount() {

    NetInfo.isConnected.addEventListener('change', (x) => {
          if (!x) {
            Alert.alert('Thông báo', 'Vui lòng kiểm tra internet ứng dụng không thể kết nối đến máy chủ!', [{ text: 'OK' }])
          } else {
            AsyncStorage.setItem('tocTuaHanhTrinh','5')
            AsyncStorage.getItem(dataLoginKey, (error, dataLogin) => {
              if (error != null || dataLogin == null) {
                console.log('componentWillUnmount: ' + error)
                return
              }
              this.LoginFunc(JSON.parse(dataLogin), 'tuDongDangNhap')
            });
          }
    })

        AsyncStorage.getItem('huong_dan', (error, data) => {
          if (data == null) {
            AsyncStorage.setItem('huong_dan', JSON.stringify({
                hd_1:{
                  key: 'hd_1',
                  on:true
                }, 
                hd_2:{
                  key: 'hd_2',
                  on:true
                },
                hd_3:{
                  key: 'hd_3',
                  on:true
                },
                hd_4:{
                  key: 'hd_4',
                  on:true
                },
            }))
          }
    })

  }

  


  setLoading(isLoading) {
    this.setState({
      loading: isLoading
    })
  }

  // checkInternet(isConnect){
  //   if (!isConnect) {
  //     Alert.alert('Thông báo', 'Internet không ổn định vui lòng kiểm tra lại internet!', [{ text: 'OK' }])
  //     this.setState({
  //       isConnectInternet:false
  //     })
  //   } else {
  //     this.setState({
  //       isConnectInternet:true
  //     })
  //   }
  // }

  async LoginFunc(data, status) {
    try {

      this.setLoading(true)

      let request = await fetch('http://gps.xtracking.vn/api/account/Login', {
        method: 'POST',
        headers: {
          'accept': 'application/json;charset=UTF-8',
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data)
      })

      let response = await request.json();
      if (response.status) {
        //this.LoginFunc(JSON.parse(dataLogin))
        // console.log(data)
        this.LoadDataDeviceFunc({ dataUser: data, status: response.status })
        //Lưu thông tin người dùng
        await AsyncStorage.setItem(dataLoginKey, JSON.stringify(data))
      } else {
        if (status != 'tuDongDangNhap') {
          this.setState({
            loading: false,
          })
          Alert.alert('Thông báo', 'Đăng nhập không thành công!\nVui lòng thử lại!', [{ text: 'OK' }])
          return
        }
      }

    } catch (error) {
      if (status != 'tuDongDangNhap') {
        this.setState({
          loading: false
        })
        Alert.alert('Thông báo', 'Đăng nhập không thành công!\nVui lòng thử lại!', [{ text: 'OK' }])
        console.log('Dang Nhap: ' + error)
      }
    }
  }

  async LoadDataDeviceFunc(data) {
    try {
      let request = await fetch('http://gps.xtracking.vn/api/tracking/getlivetrack', {
        method: 'POST',
        headers: {
          'accept': 'application/json;charset=UTF-8',
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data.dataUser)
      })
      let responseDevice = await request.json();
      // Cập nhật thông tin 
      // loginSuccess trạng thái login 
      // dataDevice thông tin danh sách xe
    
      this.setState({
        loginSuccess: data.status,
        dataDevice: responseDevice.data,
        loading: false,
        titleTenTaiKhoan: data.dataUser
      })

      AsyncStorage.getItem('huong_dan', (err,d) => {
        if (err == null && d != null){
            var ob = JSON.parse(d)
            if (ob.hd_1.on) {
              this.setState({
              chekHuongDan: ob.hd_1.key
            })
            } else {
              this.setState({
              chekHuongDan: null
            })
            }
        } else {
            this.setState({
              chekHuongDan: null
            })
        }
      })

    } catch (error) {
      //Alert.alert('Thông báo', 'Lỗi: ' + error, [{text: 'OK'}])
      console.log('Lỗi LoadDataDeviceFunc: ' + error)
      this.setState({ loading: false })
    }

  }


  async LayDiaChi(data) {
    try {

      let request = await fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng=' +  data.Lat + ',' + data.Lon + '&sensor=true')
      let responseDiaChi = await request.json();

      if (responseDiaChi.status == 'OK') {
        var dcFull = responseDiaChi.results[0].formatted_address

        this.setState({
          diaChi: dcFull,
          nameDeviceSelect: data.Name
        })
        //return dcFull //this.state.diaChi == null ? "Đang cập nhật" : this.state.diaChi

      } else {
        this.setState({
          diaChi: null,
          nameDeviceSelect: data.Name
        })
        //return "Đang cập nhật"
      }

    } catch (error) {
      // Alert.alert('Thông báo', 'Lỗi: ' + error, [{text: 'OK'}])
      console.log('Lỗi LayDiaChi: ' + error)
    }

  }

  async LayDiaChiBaoCao(data) {

    try {

     let request = await fetch('http://maps.googleapis.com/maps/api/geocode/json?latlng=' +  data + '&sensor=true')
   
      let responseDiaChi = await request.json();

      if (responseDiaChi.status == 'OK') {
        var dcFull = responseDiaChi.results[0].formatted_address
        console.log(dcFull)

       return  dcFull     

      } else {
        return  'Đang cập nhật! '
      }

    } catch (error) {
       console.log('Lỗi LayDiaChi: ' + error)
       return  'Đang cập nhật! '
      // Alert.alert('Thông báo', 'Lỗi: ' + error, [{text: 'OK'}])
     
    }

  }


  setIconStatusCar(stat) {
    switch (stat.Stat) {
      case 0:
        return this.state.nameDeviceSelect == stat.Name ? iconCarRunSelect : iconCarRun
      case 1:
        return this.state.nameDeviceSelect == stat.Name ? iconCarStopSelect : iconCarStop
      case 2:
        return this.state.nameDeviceSelect == stat.Name ? iconCarRunSelect : iconCarRun
      case 3:
        return this.state.nameDeviceSelect == stat.Name ? iconCarNullSelect : iconCarNull
    }
  }

  setIconItemsListCar(stat) {
    switch (stat.Stat) {
      case 0:
        return icon_run
      case 1:
        return icon_stop
      case 2:
        return icon_pause
      case 3:
        return icon_error_gps
    }
  }


  isStatusCar(stat, status) {
    if (stat != 3) {
      return status
    } else {
      return 'Mất liên lạc GPS lúc: ' + status
    }
  }

  CheckIsEngine(stat, isEngine) {

    if (stat != 3) {
      return isEngine == true ? 'Mở' : 'Tắt'
    } else {
      return 'Tắt'
    }
  }


  converDateTime(dateString) {
    // var datadate = Moment(dateString)
    // return datadate.hour() + ":" + datadate.minute() + ":" + datadate.second() + " " + datadate.date() + '/' + (parseInt(datadate.month()) + 1) + '/' + datadate.year()
    var datadate = Moment(dateString)
    let dd = datadate.date().toString().length == 1 ? "0" + datadate.date().toString() : datadate.date().toString()
    let mm = (parseInt(datadate.month()) + 1).toString().length == 1 ? "0" + (parseInt(datadate.month()) + 1).toString() : (parseInt(datadate.month()) + 1).toString()
    let hour = datadate.hour().toString().length == 1 ? "0" + datadate.hour().toString() : datadate.hour().toString()
    let minute = datadate.minute().toString().length == 1 ? "0" + datadate.minute().toString() : datadate.minute().toString()
    return dd + '/' + mm + '/' + datadate.year() + " " + hour + ":" + minute
  }

  converDate(dateString) {
      // var datadate = Moment(dateString)
      // return datadate.hour() + ":" + datadate.minute() + ":" + datadate.second() + " " + datadate.date() + '/' + (parseInt(datadate.month()) + 1) + '/' + datadate.year()
      var datadate = Moment(dateString)
      let dd = datadate.date().toString().length == 1 ? "0" + datadate.date().toString() : datadate.date().toString()
      let mm = (parseInt(datadate.month()) + 1).toString().length == 1 ? "0" + (parseInt(datadate.month()) + 1).toString() : (parseInt(datadate.month()) + 1).toString()
      // let hour = datadate.hour().toString().length == 1 ? "0" + datadate.hour().toString() : datadate.hour().toString()
      // let minute = datadate.minute().toString().length == 1 ? "0" + datadate.minute().toString() : datadate.minute().toString()
      return dd + '/' + mm + '/' + datadate.year()
  }

  converTime(dateString) {
    // var datadate = Moment(dateString)
    // return datadate.hour() + ":" + datadate.minute() + ":" + datadate.second() + " " + datadate.date() + '/' + (parseInt(datadate.month()) + 1) + '/' + datadate.year()
    var datadate = Moment(dateString)
    // let dd = datadate.date().toString().length == 1 ? "0" + datadate.date().toString() : datadate.date().toString()
    // let mm = (parseInt(datadate.month()) + 1).toString().length == 1 ? "0" + (parseInt(datadate.month()) + 1).toString() : (parseInt(datadate.month()) + 1).toString()
    let hour = datadate.hour().toString().length == 1 ? "0" + datadate.hour().toString() : datadate.hour().toString()
    let minute = datadate.minute().toString().length == 1 ? "0" + datadate.minute().toString() : datadate.minute().toString()
    let sc = datadate.second().toString().length == 1 ? "0" + datadate.second().toString() : datadate.second().toString()
    return hour + ":" + minute + ":" + sc
  }

  constructor(props) {

    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })

    this.state = {
      loginSuccess: false,
      dataDevice: [],
      dataDeviceSelect: [],
      diaChi: null,
      indexTabselector: 0,
      showTop: true,
      iconDrop: 'md-arrow-dropup',
      topStatus: 0,
      arrHanhTrinh: [{ latitude: 0, longitude: 0, keyCheck:'DD' }],
      LatLonStartStop: [],
      loading: false,
      dataSource: ds.cloneWithRows([]),
      dataSectionHanhTrinh: ds.cloneWithRowsAndSections({}),
      dataSectionBaoCao: ds.cloneWithRowsAndSections({}),
      dataBaoCao:null,
      responseHanhTrinh: null,
      txtThoiGianTu: "00/00/0000 00:00",
      txtThoiGianDen: "00/00/0000 00:00",
      isDateTimePickerVisible: false,
      isChoosDateTime: true,
      objectHanhTrinhSelect: null, 
      tocTuaHanhTrinh:5,
      batChayXe:false, 
      handerHanhTrinh: null,
      chiSoHanhTrinh:0,
      obectXeChay:null,
      textSearchHT:'',
      loadingBaoCao: false,
      keyBaoCao:'BCTH',
      titleBaoCao:'BÁO CÁO TỔNG HỢP',
      titleTenTaiKhoan:null,
      chekHuongDan: null
    }
  }


  //Chọn thời gian

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


  tabClick(indexTab) {

    switch (indexTab) {
      case 0:

        this.setState({
          indexTabselector: 0
        })

        AsyncStorage.getItem('huong_dan', (err,d) => {
          if (err == null && d != null){
              var ob = JSON.parse(d)
             if (ob.hd_1.on) {
               this.setState({
                chekHuongDan: ob.hd_1.key
              })
             } else {
               this.setState({
                chekHuongDan: null
              })
             }
          } else {
              this.setState({
                chekHuongDan: null
              })
          }
        })

        
        break
      case 1:
        this.setState({
          indexTabselector: 1
        })
        AsyncStorage.getItem('huong_dan', (err,d) => {
          if (err == null && d != null){
              var ob = JSON.parse(d)
             if (ob.hd_2.on) {
               this.setState({
                chekHuongDan: ob.hd_2.key
              })
             } else {
               this.setState({
                chekHuongDan: null
              })
             }
          } else {
              this.setState({
                chekHuongDan: null
              })
          }
        })
        break
      case 2:

      this.setState({
          indexTabselector: 2
        })


       AsyncStorage.getItem('huong_dan', (err,d) => {
          if (err == null && d != null){
              var ob = JSON.parse(d)
             if (ob.hd_4.on) {
               this.setState({
                chekHuongDan: ob.hd_4.key
              })
             } else {
               this.setState({
                chekHuongDan: null
              })
             }
          } else {
              this.setState({
                chekHuongDan: null
              })
          }
        })
        break
      case 3:

          this.setState({
            indexTabselector: 3,
            chekHuongDan: null
          })

        // AsyncStorage.getItem('huong_dan', (err,d) => {
        //   if (err == null && d != null){
        //       var ob = JSON.parse(d)
        //      if (ob.hd_4.on) {
        //        this.setState({
        //         indexTabselector: 3,
        //         chekHuongDan: JSON.parse
        //       })
        //      } else {
        //        this.setState({
        //         indexTabselector: 3,
        //         chekHuongDan: null
        //       })
        //      }
        //   } else {
        //       this.setState({
        //         indexTabselector: 3,
        //         chekHuongDan: null
        //       })
        //   }
        // })
        break
    }
    clearInterval(this.state.handerHanhTrinh)
    this.setState({
      isShowViewHanhTrinh: false,
      showList: false,
      dataSource: this.state.dataSource.cloneWithRows([]),
      batChayXe: false,
      handerHanhTrinh: null,  
      dataSectionBaoCao: this.state.dataSectionBaoCao.cloneWithRowsAndSections({})
    })
  }

  async funcDangXuat() {
    try {
      await AsyncStorage.removeItem(dataLoginKey, (err) => {
        
        if (err == null) {
          const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          })
            this.state = {
              loginSuccess: false,
              dataDevice: [],
              dataDeviceSelect: [],
              diaChi: null,
              indexTabselector: 0,
              showTop: true,
              iconDrop: 'md-arrow-dropup',
              topStatus: 0,
              arrHanhTrinh: [{ latitude: 0, longitude: 0, keyCheck:'DD' }],
              LatLonStartStop: [],
              loading: false,
              dataSource: ds.cloneWithRows([]),
              dataSectionHanhTrinh: ds.cloneWithRowsAndSections({}),
              dataSectionBaoCao: ds.cloneWithRowsAndSections({}),
              dataBaoCao:null,
              responseHanhTrinh: null,
              txtThoiGianTu: "00/00/0000 00:00",
              txtThoiGianDen: "00/00/0000 00:00",
              isDateTimePickerVisible: false,
              isChoosDateTime: true,
              objectHanhTrinhSelect: null, 
              tocTuaHanhTrinh:5,
              batChayXe:false, 
              handerHanhTrinh: null,
              chiSoHanhTrinh:0,
              obectXeChay:null,
              textSearchHT:'',
              loadingBaoCao: false,
              keyBaoCao:'BCTH',
              titleBaoCao:'BÁO CÁO TỔNG HỢP',
              titleTenTaiKhoan:null, chekHuongDan: null
          }
          
          this.tabClick(0)
        } else {
          Alert.alert('Thông báo', 'Đăng xuất không thành công!\nVui lòng thử lại!', [{ text: 'OK' }])
          return
        }
      })
    } catch (error) {
      Alert.alert('Thông báo', 'Đăng xuất không thành công!\nVui lòng thử lại!', [{ text: 'OK' }])
      return
    }

  }

  async xemBaoCaoCuaXe(){
      try {
        if (this.state.txtThoiGianTu == '00/00/0000 00:00' || this.state.txtThoiGianDen == '00/00/0000 00:00' || this.state.objectHanhTrinhSelect == null) {
          Alert.alert('Thông báo', 'Bạn vui lòng nhập đầy đủ thông tin\nLưu ý: Thời gian xem không được vượt quá 2 ngày!', [{ text: 'OK' }])
          return
        }

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
          loadingBaoCao: true,
          dataSectionBaoCao: this.state.dataSectionBaoCao.cloneWithRowsAndSections({})
        })

        switch(this.state.keyBaoCao){
          case 'BCTH':
              let requestBCTopHop = await fetch('http://gps.xtracking.vn/api/Report/getgeneral?DeviceID=' + this.state.objectHanhTrinhSelect.Id + '&FromDate=' + this.converDateTime(this.state.txtThoiGianTu) + '&ToDate=' + this.converDateTime(this.state.txtThoiGianDen) + '&Excel=0')
              let jsonBCTopHop = await requestBCTopHop.json();

              var ts = {'THÔNG SỐ':jsonBCTopHop.data}
              this.setState({
                dataBaoCao: ts,
                dataSectionBaoCao:this.state.dataSectionBaoCao.cloneWithRowsAndSections(ts),
                loadingBaoCao: false
              })
              //console.log(this.state.objectHanhTrinhSelect)
            break
          case 'BCHT':

              let requestBCHanhTrinh = await fetch('http://gps.xtracking.vn/api/Report/getdistances?trackerID=' + this.state.objectHanhTrinhSelect.Id + '&FromDate=' + this.converDateTime(this.state.txtThoiGianTu) + '&ToDate=' + this.converDateTime(this.state.txtThoiGianDen) + '&Excel=0')
              let jsonBCHanhTrinh = await requestBCHanhTrinh.json();
              var ts = {'THÔNG SỐ':jsonBCHanhTrinh.data}
              this.setState({
                dataBaoCao: ts,
                dataSectionBaoCao:this.state.dataSectionBaoCao.cloneWithRowsAndSections(ts),
                loadingBaoCao: false
              })
  
            break

        }
        

      } catch (error) {
          Alert.alert('Thông báo', 'Không thể load dữ liệu bạn vui lòng thử lại!', [{ text: 'OK' }])
          console.log('Lỗi xem bao cao: ' + error)
          this.setState({
            loading: false,
            loadingBaoCao: false
          })
    }
  }


  async xemHanhTrinhCuaXe() {
    try {

      if (this.state.txtThoiGianTu == '00/00/0000 00:00' || this.state.txtThoiGianDen == '00/00/0000 00:00' || this.state.objectHanhTrinhSelect == null) {
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
         loadingHanhTrinh: true,
         dataSectionHanhTrinh: this.state.dataSectionHanhTrinh.cloneWithRowsAndSections({}),
         arrHanhTrinh: [{ latitude: 0, longitude: 0, keyCheck:'DD' }]
      })

     
      let requestHanhTrinh = await fetch('http://gps.xtracking.vn/api/Tracking/getreviewtrip?trackerID=' + this.state.objectHanhTrinhSelect.Id + '&FromDate=' + this.converDateTime(this.state.txtThoiGianTu) + '&ToDate=' + this.converDateTime(this.state.txtThoiGianDen) + '&Excel=0')
      const responseHanhTrinh = await requestHanhTrinh.json();
     
      var obHT = {
        'THỐNG KÊ': [{
          lableHT: 'TG chạy: ',
          valueHT: responseHanhTrinh.timesruntotal
        },
        {
          lableHT: 'TG dừng/đỗ: ',
          valueHT: responseHanhTrinh.timestoptotal
        },
        {
          lableHT: 'TG nổ máy: ',
          valueHT: responseHanhTrinh.eon
        },
        {
          lableHT: 'Km: ',
          valueHT: parseInt(responseHanhTrinh.km)
        }],
        'LỊCH TRÌNH': responseHanhTrinh.data.slice(0, 1000)
      }
      
      var arrHT = []
      //arrHT.slice(0,1)
      var x = responseHanhTrinh.data.length - 1
      
      responseHanhTrinh.data.map((v, i) => {
        if (i < 1001) {
            arrHT.push({
              ...v,
              latitude: v.Lat,
              longitude: v.Lon,
              keyCheck: i == 0 ? 'BT': i == x ? 'KT': i == 1000 ? 'KT': v.IsStop == true ? 'DL':'DD',
            })
        } else {

        }
      })
      ///
      this.setState({
        loadingHanhTrinh: false,
        dataSectionHanhTrinh: this.state.dataSectionHanhTrinh.cloneWithRowsAndSections(obHT),
        arrHanhTrinh: arrHT,
        obectXeChay: arrHT[0],
        responseHanhTrinh: {
          timestoptotal: responseHanhTrinh.timestoptotal,
          eon:responseHanhTrinh.eon, 
          km: responseHanhTrinh.km,
          timesruntotal:responseHanhTrinh.timesruntotal
        }
      })
      
      if (x > 1000) {
         this.chonXeCanXem([{
            latitude: responseHanhTrinh.data[0].Lat,
            longitude:responseHanhTrinh.data[0].Lon
          },{
            latitude: responseHanhTrinh.data[1000].Lat,
            longitude:responseHanhTrinh.data[1000].Lon
          }], 1)
      } else {
         this.chonXeCanXem([{
            latitude: responseHanhTrinh.data[0].Lat,
            longitude:responseHanhTrinh.data[0].Lon
          },{
            latitude: responseHanhTrinh.data[responseHanhTrinh.data.length - 1].Lat,
            longitude:responseHanhTrinh.data[responseHanhTrinh.data.length - 1].Lon
          }], 1)
      }
     

    } catch (error) {
      Alert.alert('Thông báo', 'Không thể load dữ liệu bạn vui lòng thử lại!', [{ text: 'OK' }])
      console.log('Lỗi xemHanhTrinhCuaXe: ' + error)
      this.setState({
        loading: false,
        loadingHanhTrinh: false
      })
    }
  }


  showHideViewTop() {
    this.setState({
      viewFlexTop: 0.9
    })
  }

  colorTab(x) {
    return this.state.indexTabselector == x ? '#FF0000' : '#fff'
  }

  //dataXe array tao do dau tao do cuoi cua xe, index 0 = xem ben giam sat, 1 = xem view tren hanh trinh
  chonXeCanXem(dataXe, index) {
    switch (index) {
      case 0:
        this.setState({
          nameDeviceSelect: dataXe.Name
        })

        this.map.fitToCoordinates([
          {
            latitude: dataXe.Lat,
            longitude: dataXe.Lon
          },
          {
            latitude: dataXe.Lat,
            longitude: dataXe.Lon
          }

        ], {
            animated: true,
          });
        break
      case 1:

        // this.setState({
        //   nameDeviceSelect: dataXe[0].Name
        // })

        this.map.fitToCoordinates([
          {
            latitude: dataXe[0].latitude,
            longitude: dataXe[0].longitude
          },
          {
            latitude: dataXe[1].latitude,
            longitude: dataXe[1].longitude
          }

        ], {
            edgePadding: { top: 20, right: 10, bottom: 10, left: 10 },
            animated: true,
          });
        break
    }
  }

  ///////Giao Dien moi
  renderItemListDevice(items) {
    return (
      <TouchableHighlight

        onPress={() => this.itemListDeviceClick(items)}
      >
        <View style={{ flex: 1, flexDirection: 'row', height: 100, borderColor: '#ccc', borderWidth: 1, alignItems: 'center' }}>
          <Image source={this.setIconItemsListCar(items)} style={{ width: 70, height: 70, marginLeft: 5, marginRight: 5 }} />
          <View style={{ width: width - 100, height: 100, flexDirection: 'column' }}>
            <View style={{ flex: 1, maxWidth: width - 110, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ flex: 1, textAlign: 'center' }}>{items.Name}</Text>

              <View style={{ width: 40, height: 33, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={iconDongCo}
                  style={{ width: 30, height: 30 }} />
              </View>

              <View style={{ width: 40, height: 33, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={iconQuaToc}
                  style={{ width: 30, height: 30 }} />
              </View>

              <View style={{ width: 40, height: 33, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={iconXang}
                  style={{ width: 30, height: 30 }} />
              </View>

            </View>

            <View style={{ flex: 1, maxWidth: width - 110, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ flex: 1, textAlign: 'center', fontSize: 11 }}>{this.isStatusCar(items.Stat, items.Status)}</Text>

              <View style={{ width: 40, height: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{ textAlign: 'center', fontSize: 11 }}>{this.CheckIsEngine(items.Stat, items.IsEngine)}</Text>
              </View>

              <View style={{ width: 40, height: 33, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{ textAlign: 'center', fontSize: 11 }}>{items.Vmax}</Text>
              </View>

              <View style={{ width: 40, height: 33, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{ textAlign: 'center', fontSize: 11 }}>{items.Fuel} %</Text>
              </View>

            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ flex: 1, textAlign: 'left', fontSize: 11, color: '#8B8888' }}>{items.Group + " - " + items.Phone}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  viewListDevice(isShow) {

    if (isShow) {
      this.setState({
        showList: isShow,
        dataSource: this.state.dataSource.cloneWithRows(this.state.dataDevice)
      })
    } else {
      this.setState({
        showList: isShow,
        dataSource: this.state.dataSource.cloneWithRows([])
      })
    }
  }

  itemListDeviceClick(items) {
    this.renderItemListSearchDevice(items, '_ITEM_SELECT_')
    this.setState({
      showList: !this.state.showList,
      dataSource: this.state.dataSource.cloneWithRows([])
    })
  }

  renderItemListSearchDevice(bs, key) {

    try {

      switch (this.state.indexTabselector) {
        case 0:
          switch (key) {
            case '_USER_TK_':

              this.setState({
                txtSearch: bs
              })
              const sTxt = bs.toString().split(',')

              if (sTxt.length > 1) {
                sTxt.forEach(function (t) {
                  this.state.dataDevice.filter((items) => {
                    let name = items.Name
                    if (name.toUpperCase() === t.toString().toUpperCase()) {
                      if (this.state.dataDeviceSelect.indexOf(items) == -1) {
                        //console.log('chua co')
                        this.setState({
                          dataDeviceSelect: [items, ...this.state.dataDeviceSelect],
                          dataSource: this.state.dataSource.cloneWithRows([]),
                          showList: false
                        })
                        this.chonXeCanXem(items, 0)
                      } else {
                        //console.log('co roi thanh a :(')
                      }

                    } else {
                      if (t != '') {
                        this.setState(
                          {
                            dataSource: this.state.dataSource.cloneWithRows(
                              this.state.dataDevice.filter((items) => {
                                let name = items.Name
                                if (name.toUpperCase().search(t.toString().toUpperCase()) != -1) {
                                  return items
                                }
                              })
                            ),
                            showList: false
                          }
                        )
                      } else {

                        this.setState({

                          dataSource: this.state.dataSource.cloneWithRows([]),
                          showList: false
                        })
                      }
                    }
                  })
                }, this);


              } else {
                if (bs != '') {
                  this.setState(
                    {
                      dataSource: this.state.dataSource.cloneWithRows(
                        this.state.dataDevice.filter((items) => {
                          let name = items.Name
                          if (name.toUpperCase().search(bs.toString().toUpperCase()) != -1) {
                            return items
                          }
                        })
                      ),
                      txtSearch: bs.Name,
                      showList: false
                    }
                  )
                } else {
                  this.setState({
                    dataSource: this.state.dataSource.cloneWithRows([]),
                    showList: false
                  })
                }
              }

              break
            case '_ITEM_SELECT_':

              if (this.state.dataDeviceSelect.indexOf(bs) === -1) {
                this.setState({
                  dataDeviceSelect: [bs, ...this.state.dataDeviceSelect],
                  txtSearch: this.state.txtSearch != null ? this.state.txtSearch + bs.Name + ',' : bs.Name + ',',
                  showList: !this.state.showList,
                  objectHanhTrinhSelect: bs
                })
              } else {
                this.setState({
                  showList: !this.state.showList
                })
              }
              this.chonXeCanXem(bs, 0)
              break
          }
          break
        case 1:
            switch(key){
              case '_USER_TK_':
                this.setState({
                  textSearchHT:bs, 
                  objectHanhTrinhSelect: null
                })
             
                this.setState(
                  {
                    dataSource: this.state.dataSource.cloneWithRows(
                      this.state.dataDevice.filter((items) => {
                        let name = items.Name
                        if (name.toUpperCase().search(bs.toString().toUpperCase()) != -1) {
                          return items
                        }
                      })
                    ),
                    showList: true
                  }
                )

              case '_ITEM_SELECT_':
                this.setState({
                  objectHanhTrinhSelect: bs
                })
            }
          break
        case 2:
            switch(key){
              case '_USER_TK_':
                this.setState({
                  textSearchHT:bs, 
                  objectHanhTrinhSelect: null
                })
             
                this.setState(
                  {
                    dataSource: this.state.dataSource.cloneWithRows(
                      this.state.dataDevice.filter((items) => {
                        let name = items.Name
                        if (name.toUpperCase().search(bs.toString().toUpperCase()) != -1) {
                          return items
                        }
                      })
                    ),
                    showList: true
                  }
                )

              case '_ITEM_SELECT_':
                this.setState({
                  objectHanhTrinhSelect: bs
                })
            }
          break
      }


    } catch (error) {
      console.log("renderItemListSearchDevice: " + error)
    }
  }

  showViewHanhTrinh() {

   

    clearInterval(this.state.handerHanhTrinh)
     this.setState({
      isShowViewHanhTrinh: true,
      handerHanhTrinh:null
    })

    AsyncStorage.getItem('huong_dan', (err,d) => {
          if (err == null && d != null){
              var ob = JSON.parse(d)
             if (ob.hd_3.on) {
               this.setState({
                chekHuongDan: ob.hd_3.key
              })
             } else {
               this.setState({
                chekHuongDan: null
              })
             }
          } else {
              this.setState({
                chekHuongDan: null
              })
          }
    })
  }

  // items bao cao
  renderRowItemBaoCao(items) {

    switch(this.state.keyBaoCao)
    {
      case 'BCTH':
        return (
          <View style={{ flex: 1, flexDirection: 'row', marginRight: 10, marginLeft: 1.5, height: 300 }}>
            {/*<Image source = {ellipse_line} style={{width: 10, height:30, backgroundColor: 'red'}}/>*/}
            <View style={{ width: 20, height: 300, flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
              <View style={{ width: 20, height: 290, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 0.5, height: 290, backgroundColor: '#FFF' }} />
              </View>
              <View style={{ width: 20, height: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 10, height: 10, backgroundColor: '#FFF', borderColor: '#FFF', borderRadius: 10, borderWidth: 0.5 }} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>Ngày : {this.converDateTime(items.Time)}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>Nhiên liệu: {items.Fuel}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>Tổng Km: {items.Distance}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>VTB : {items.Km}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>VMAX : {items.Vmax}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>VTB : {items.Vtb}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>SL đỗ : {items.stopCount}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>SL mở cửa : {items.DoorCount}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>SL mở MĐH : {items.AirCount}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>Thời gian nổ máy : {items.TimeOn}</Text>
              <View style={{ width: width - 40, height: 0.5, backgroundColor: '#FFF' }} />
            </View>

          </View>
        )
      case 'BCHT':
        return (
          <View style={{ flex: 1, flexDirection: 'row', marginRight: 10, marginLeft: 1.5, height: 330 }}>
            {/*<Image source = {ellipse_line} style={{width: 10, height:30, backgroundColor: 'red'}}/>*/}
            <View style={{ width: 20, height: 320, flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
              <View style={{ width: 20, height: 320, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 0.5, height: 320, backgroundColor: '#FFF' }} />
              </View>

              <View style={{ width: 20, height: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 10, height: 10, backgroundColor: '#FFF', borderColor: '#FFF', borderRadius: 10, borderWidth: 0.5 }} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>Ngày : {this.converDateTime(items.Time)}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>Bắt đầu: {this.converDateTime(items.StartTime)}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>Kết thúc: {this.converDateTime(items.EndTime)}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>Thời gian: {items.Period}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>VTB: {items.AverageSpeed}</Text>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>Tổng Km: {items.TotalKm}</Text>
               <LayDiaChiDi valueLatAndLon = {items.StartLatLng}/>
               <LayDiaChiDen valueLatAndLon = {items.EndLatLng}/>
              <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color:'#FFF' }}>Thời gian đỗ: {items.TimeStopStr}</Text>
              <View style={{ width: width - 40, height: 0.5, backgroundColor: '#FFF' }} />
            </View>

          </View>
        )
    }
      
  }

  /// header Bao cao
  renderSectionHeaderBaoCao(sectionData, value) {
    return (
      <View style={{ flex: 1, marginTop: 15, marginLeft:1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ width: 20, height: 20, backgroundColor:'#FFF', borderRadius:10, marginTop: 5, marginLeft:1 }} />
          <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color:'#FFF' }}>{value}</Text>
        </View>
        <View style={{ backgroundColor: '#FFF', height: 0.5, marginLeft: 11.5, marginRight: 10 }}></View>
      </View>
    )
  }

  ///Items hanh trinh
  renderRowItemHanhTrinh(items) {

    if (items.lableHT != null) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', marginRight: 10, marginLeft: 1.5 }}>
          {/*<Image source = {ellipse_line} style={{width: 10, height:30, backgroundColor: 'red'}}/>*/}
          <View style={{ width: 20, height: 25, flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ width: 20, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 0.5, height: 15, backgroundColor: '#FFF' }} />
            </View>

            <View style={{ width: 20, height: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 10, height: 10, backgroundColor: '#FFF', borderColor: '#FFF', borderRadius: 10, borderWidth: 0.5 }} />
            </View>
          </View>

          <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 8, borderBottomColor: '#FFF', borderBottomWidth: 1, color: '#FFF' }}>{items.lableHT != null ? items.lableHT : items.Lat}</Text>
          <Text style={{ flex: 1.5, fontSize: 18, top: 8, borderBottomColor: '#FFF', borderBottomWidth: 1, color: '#FFF' }}>{items.valueHT != null ? items.valueHT : items.Lon}</Text>
        </View>
      )
    } else {

      return (
        <View style={{ flex: 1, flexDirection: 'row', marginRight: 10, marginLeft: 1.5, height: 100 }}>
          {/*<Image source = {ellipse_line} style={{width: 10, height:30, backgroundColor: 'red'}}/>*/}
          <View style={{ width: 20, height: 100, flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ width: 20, height: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 0.5, height: 90, backgroundColor: '#FFF' }} />
            </View>

            <View style={{ width: 20, height: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 10, height: 10, backgroundColor: '#FFF', borderColor: '#FFF', borderRadius: 10, borderWidth: 0.5 }} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color: '#FFF' }}>Thời gian: {this.converDateTime(items.Time)}</Text>
            <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color: '#FFF' }}>Trạng thái: {items.Status}</Text>
            <Text style={{ flex: 1, fontSize: 18, marginLeft: 2, top: 6, color: '#FFF' }}>Km: {items.Km}</Text>
            <View style={{ width: width - 40, height: 0.5, backgroundColor: '#FFF' }} />
          </View>

        </View>
      )

    }

  }

  //header hanh trinh
  renderSectionHeaderHanhTrinh(sectionData, value) {
    return (
      <View style={{ flex: 1, marginTop: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ width: 20, height: 20, backgroundColor:'#FFF', borderRadius:10, marginTop: 5, marginLeft:1 }} />
          <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, color:'#FFF' }}>{value}</Text>
        </View>
        <View style={{ backgroundColor: '#FFF', height: 0.5, marginLeft: 11.5, marginRight: 10 }}></View>
      </View>
    )
  }

  /**
   * Chạy xe theo hành trình
   */

  chayXeTheoHanhTrinh(){
    try {

      if (this.state.txtThoiGianTu == '00/00/0000 00:00' || this.state.txtThoiGianDen == '00/00/0000 00:00' || this.state.objectHanhTrinhSelect == null) {
        Alert.alert('Thông báo', 'Bạn vui lòng nhập đầy đủ thông tin!\nLưu ý: Thời gian xem không được vượt quá 2 ngày!', [{ text: 'OK' }])
        return
      }

      if (!this.state.batChayXe && this.state.handerHanhTrinh == null) {
        var td = 5
        var sp = -td
         var sizeHt = this.state.arrHanhTrinh.length
         AsyncStorage.getItem('tocTuaHanhTrinh',(e, v) => {
           if (e != null) {
             td = -5
           } else {
             td = parseInt(v)
           }
         })
         
         var hd = setInterval(() => {

              AsyncStorage.getItem('tocTuaHanhTrinh',(e, v) => {
                if (e != null) {
                  
                } else {
                  td = parseInt(v) != td ? parseInt(v):td
                }
              })

                var ob = this.state.arrHanhTrinh[sp+= td]
               
                if (ob == null){
                  clearInterval(this.state.handerHanhTrinh)
                  this.setState({
                      batChayXe: !this.state.batChayXe,
                      handerHanhTrinh: null,
                      obectXeChay: {
                          ...this.state.arrHanhTrinh[sizeHt - 1],
                          Speed:0
                        }
                    }
                  )
                  return
                }
                this.setState(
                  {
                    obectXeChay: ob
                  }
                )
            },  120)

          this.setState({
              batChayXe: !this.state.batChayXe,
              handerHanhTrinh: hd
            }
          )
      } else {
        clearInterval(this.state.handerHanhTrinh)
        this.setState({
            batChayXe: !this.state.batChayXe,
            handerHanhTrinh: null
          }
        )
      }

    } catch (error) {
      console.log(error)
        Alert.alert('Thông báo', 'Bạn vui lòng thử lại!', [{ text: 'OK' }])
        return
    }
    
  }

  setupHuongDan(key){
      switch(key){
          case 'hd_1':
              return(
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{ width: 50, height: 50, borderRadius: 25, borderColor: '#FFF', borderWidth: 3, top: 25, left: width - 60}}></View>
                  <Image source = {muiTen} style={{width: 111, height:90, top: 20,left: width - 160}}/>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize: 20, fontWeight: 'bold', margin: 10, top:10}}>Chọn danh sách xe tại đây!</Text>
                  <View style={{flex: 1,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                      <View style={{width: 180, height: 50, flexDirection:'row', alignItems:'center', justifyContent:'center', borderColor: '#FFF', borderRadius: 5, borderWidth: 3}}>
                          <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold'}}>OK! Đã hiểu!</Text>
                      </View>
                  </View>
                </View>
              )
          case 'hd_2':
              return (
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <Text style={{textAlign:'center', color:'#FFF', fontSize: 20, fontWeight: 'bold', top: 25}}>Chạy xe theo hành trình!</Text>
                    <Image source = {muiTen1} style={{width: 64, height:39, top: 22,left: 130, transform: [{rotate: '0deg'}]}}/>
                  <View style={{ width: 50, height: 50, borderRadius: 25, borderColor: '#FFF', borderWidth: 3 , top: 23, left: 139 }}></View>
                  <View style={{ width: 185, height: 30, borderColor: '#FFF', borderWidth: 3,  top: 30, left: 15 }}></View>
                    <Image source = {muiTen1} style={{width: 64, height:39, top: 25,left: 100, transform: [{rotate: '0deg'}]}}/>
                    <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold', top: 25, left: 105}}>Tốc độ!</Text>

                  <View style={{flex: 1,  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                      <View style={{width: 180, height: 50, flexDirection:'row', alignItems:'center', justifyContent:'center', borderColor: '#FFF', borderRadius: 5, borderWidth: 3}}>
                          <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold'}}>OK! Đã hiểu!</Text>
                      </View>
                  </View>
                    <View style={{ width: width, height: 200, flexDirection: 'row', justifyContent:'flex-end'}}>
                      <Text style={{ color:'#FFF', fontSize: 20,top: 45, fontWeight: 'bold',right: 0}}>Tốc độ!</Text>
                      <Image source = {muiTen1} style={{width: 64, height:39,top: 45, transform: [{rotate: '-90deg'}]}}/>
                      <View style={{ width: 50, height: 50, borderRadius: 25, borderColor: '#FFF', borderWidth: 3, right: 15, top: 40}}></View>
                    </View>
                </View>
              )
          case 'hd_4':
              return (
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{ width: 50, height: 50, borderRadius: 25, borderColor: '#FFF', borderWidth: 3, top: 75, left: width - 48}}></View>
                    <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold', left: width - 162, top: - 8, backgroundColor:'#43425C'}}>Chọn xe</Text>
                    <Image source = {muiTen1} style={{width: 64, height:39,left: width - 98,top: - 13, transform: [{rotate: '-45deg'}]}}/>
                  
                    <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold', left: width - 200, top: 80, backgroundColor:'#43425C', position: 'absolute', zIndex: 1}}>Chọn báo cáo</Text>
                    <Image source = {muiTen1} style={{width: 64, height:39,left: width - 98,transform: [{rotate: '-45deg'}], top: 100, position: 'absolute', zIndex: 1}}/>
                  
                  <View style={{ flex:1, flexDirection: 'row'}}>
                      <View style = {{flex:1, height: 100}}>
                           <View style={{ width: 215, height: 45,  borderColor: '#FFF', borderWidth: 3 ,left: 3, top: 16, justifyContent: 'center', alignItems:'center' }}>
                             <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold', backgroundColor:'#43425C'}}>Thời gian bắt đầu</Text>
                          </View>
                          <View style={{ width: 215, height: 45,  borderColor: '#FFF', borderWidth: 3 ,left: 3, top: 23, justifyContent: 'center', alignItems:'center' }}>
                              <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold', backgroundColor:'#43425C'}}>Thời gian kết thúc</Text>
                          </View>
                      </View>
                      <View style = {{width:100, height: 90, flexDirection: 'column'}}>
                          <View style={{ flex:1,  borderColor: '#FFF', borderWidth: 3 , top: 16, justifyContent: 'center', alignItems:'center' }}>
                          </View>
                          <View style={{ flex:1,  borderColor: '#FFF', borderWidth: 3 , top: 23, justifyContent: 'center', alignItems:'center' }}>
                          </View>
                      </View>
                  </View>
                    <Image source = {muiTen1} style={{width: 64, height:39,left: width - 98,transform: [{rotate: '-135deg'}], top: 225, position: 'absolute', zIndex: 1}}/>
                    <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold', left: width - 150, top: 250, backgroundColor:'#43425C', position: 'absolute', zIndex: 1}}>Xem báo cáo</Text>
                  <View style={{flex: 1,  flexDirection: 'row', justifyContent: 'center'}}>
                      <View style={{width: 180, height: 50, flexDirection:'row', alignItems:'center', justifyContent:'center', borderColor: '#FFF', borderRadius: 5, borderWidth: 3}}>
                          <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold'}}>OK! Đã hiểu!</Text>
                      </View>
                  </View>
                    
                </View>
              )
          case 'hd_3':
              return (
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{ width: 50, height: 50, borderRadius: 25, borderColor: '#FFF', borderWidth: 3, top: 75, left: width - 48}}></View>
                    <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold', left: width - 162, top: - 8, backgroundColor:'#43425C'}}>Chọn xe</Text>
                    <Image source = {muiTen1} style={{width: 64, height:39,left: width - 98,top: - 13, transform: [{rotate: '-45deg'}]}}/>
                  
                    
                  <View style={{ flex:1, flexDirection: 'row'}}>
                      <View style = {{flex:1, height: 100}}>
                           <View style={{ width: 215, height: 45,  borderColor: '#FFF', borderWidth: 3 ,left: 3, top: 16, justifyContent: 'center', alignItems:'center' }}>
                             <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold', backgroundColor:'#43425C'}}>Thời gian bắt đầu</Text>
                          </View>
                          <View style={{ width: 215, height: 45,  borderColor: '#FFF', borderWidth: 3 ,left: 3, top: 23, justifyContent: 'center', alignItems:'center' }}>
                              <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold', backgroundColor:'#43425C'}}>Thời gian kết thúc</Text>
                          </View>
                      </View>
                      <View style = {{width:100, height: 100, flexDirection: 'column',borderColor: '#FFF', borderWidth: 3, top: 15}}>
                         
                      </View>
                  </View>
                    <Image source = {muiTen1} style={{width: 64, height:39,left: width - 98,transform: [{rotate: '-135deg'}], top: 225, position: 'absolute', zIndex: 1}}/>
                    <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold', left: width - 150, top: 250, backgroundColor:'#43425C', position: 'absolute', zIndex: 1}}>Xem hành trình</Text>
                  <View style={{flex: 1,  flexDirection: 'row', justifyContent: 'center'}}>
                      <View style={{width: 180, height: 50, flexDirection:'row', alignItems:'center', justifyContent:'center', borderColor: '#FFF', borderRadius: 5, borderWidth: 3}}>
                          <Text style={{ color:'#FFF', fontSize: 20, fontWeight: 'bold'}}>OK! Đã hiểu!</Text>
                      </View>
                  </View>
                    
                </View>
              )
      }
  }

  /////
  render() {
    if (this.state.loginSuccess) {
      return (

        <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'flex-start' }}>
          {/*rgba(67, 66, 92, 0.6)*/}
          
            {/* <View style = {{width: width, height: height, position: 'absolute', backgroundColor: 'red', zIndex:this.state.chekHuongDan != null ? 30: -100}}>
                <TouchableOpacity 
                  style = {{flex:1, backgroundColor:'rgba(67, 66, 92, 0.6)'}}
                  onPress = {() => {
                    AsyncStorage.getItem('huong_dan', (error, data) => {
                        if (error == null && data != null) {
                          var x = JSON.parse(data)
                          var key = this.state.chekHuongDan
                          switch(key){
                            case 'hd_1':
                                AsyncStorage.setItem('huong_dan', JSON.stringify({
                                  ...x,
                                  hd_1:{
                                    key: key,
                                    on:false
                                  }
                                }))
                            break
                            case 'hd_2':
                                AsyncStorage.setItem('huong_dan', JSON.stringify({
                                  ...x,
                                  hd_2:{
                                    key: key,
                                    on:false
                                  }
                                }))
                            break
                            case 'hd_3':
                                AsyncStorage.setItem('huong_dan', JSON.stringify({
                                  ...x,
                                  hd_3:{
                                    key: key,
                                    on:false
                                  }
                                }))
                            break
                            case 'hd_4':
                                AsyncStorage.setItem('huong_dan', JSON.stringify({
                                  ...x,
                                  hd_4:{
                                    key: key,
                                    on:false
                                  }
                                }))
                            break
                          }

                          this.setState(
                            {
                              chekHuongDan:null
                            }
                          )
                        }
                    })
                  }}
                >
                  {this.setupHuongDan(this.state.chekHuongDan)}
                </TouchableOpacity>
            </View> */}

          <StatusBar
            barStyle='light-content' />
          {/**
            * Hiển thị các chức năng
          */}
            {/**
             * Danh sách device 
             */}
          <ListView style={{ maxHeight: this.state.indexTabselector == 0 ? (height - 170): (height - 222), width: width - 25, marginTop: this.state.indexTabselector == 0 ? 85: 130, marginLeft: 12.5, borderRadius: 5, backgroundColor: '#fff', position: 'absolute', zIndex: 3 }}
            dataSource={this.state.dataSource}
            renderRow={this.renderItemListDevice.bind(this)}
            enableEmptySections={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
         
           {
            this.state.indexTabselector == 0 ? 
               <View style={{ width: width, flexDirection: 'column', position: 'absolute', zIndex: 1, marginTop: 25, alignItems: 'center' }}>
                <View style={{ width: width - 25, height: 50, alignItems: 'center', justifyContent: 'center', borderColor: '#43425C', borderWidth: 1, backgroundColor: '#fff', borderRadius: 5, flexDirection: 'row' }}>
                  {/*<Image source={iconCarInput} style={{ width: 32, height: 40, padding: 2 }} />*/}
                  <Image source={iconCarInput} style={{ width: 32, height: 40, padding: 2, }}/>
                  <TextInput
                    onChangeText={(bs) => this.renderItemListSearchDevice(bs, '_USER_TK_')}
                    placeholder='Nhập biển số vd: 21-3067'
                    placeholderTextColor='#959595'
                    
                    style={{ flex: 1, color:'#43425C'}}
                    numberOfLines={1}
                    value={this.state.txtSearch}
                  ></TextInput>
                  <TouchableOpacity
                    onPress={() => this.viewListDevice(!this.state.showList)}
                  >
                    <Image source={iconList} style={{ width: 40, height: 40 }} />
                  </TouchableOpacity>
                </View>

              </View>
            
             : null
           }

         
           {this.state.indexTabselector == 1 ? 
              <View style={{
                flexDirection: 'column',
                width: 50, height: 50,
                backgroundColor: '#43425C', justifyContent: 'center', alignItems: 'center',
                position: 'absolute', borderColor: '#43425C', borderWidth: 1,
                zIndex: 1, borderRadius: 25,
                bottom: 85, right: 15
              }}>
                <TouchableOpacity
                  style={{ width: 48, height: 48, justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => this.showViewHanhTrinh()}>
                  <Image style={{ width: 20, height: 20 }} source={iconFab} />
                </TouchableOpacity>
              </View>
            :null
            }
          {/**
        *  Đồng hồ 
          fontFamily: 'Quartz'
        */}
         {this.state.indexTabselector == 1 ? 
          <View style={{
            flexDirection: 'column',
            width: 180, height: 150,
            backgroundColor: '#fff',
            position: 'absolute',
            borderColor: '#43525C',
            borderWidth: 1, alignItems: 'center', justifyContent: 'center',
            zIndex: 1, borderRadius: 5,
            top: 25, left: 15
          }}>
            <View style={{ width: 178, height: 40, backgroundColor: '#43425C', flexDirection: 'row', borderTopLeftRadius: 5, borderTopRightRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ flex: 1.8, fontSize: 16, borderTopLeftRadius: 5, borderTopRightRadius: 5, marginLeft: 5, fontWeight: 'bold', color: '#fff' }}>{this.state.objectHanhTrinhSelect != null ? this.state.objectHanhTrinhSelect.Name : ''}</Text>
              <Text style={{ flex: 1, fontSize: 16, borderTopLeftRadius: 5, borderTopRightRadius: 5, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>{this.state.responseHanhTrinh != null ? parseInt(this.state.responseHanhTrinh.km): 0} Km</Text>
            </View>
            <View style={{ width: 178, height: 79, flexDirection: 'column', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
              <View style={{ width: 178, height: 29, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ flex: 2.7, marginLeft: 5, fontSize: 17 }}>{this.state.obectXeChay != null ? this.converDate(this.state.obectXeChay.Time):'00/00/0000'}</Text>
                <Text style={{ flex: 1, fontSize: 18, color: 'red', fontFamily: 'Quartz', textAlign: 'right' }}>{this.state.obectXeChay != null ? this.state.obectXeChay.Speed: 0}</Text>
                <Text style={{ flex: 1, fontSize: 18, fontFamily: 'Quartz', textAlign: 'left' }}> Km</Text>
              </View>
              <View style={{ width: 178, height: 40, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ flex: 2, fontSize: 25, fontFamily: 'Quartz', textAlign: 'center', fontWeight:'bold'}}>{this.state.obectXeChay != null ? this.converTime(this.state.obectXeChay.Time):'00:00:00'}</Text>
                <TouchableOpacity 
                  onPress = {() => { this.chayXeTheoHanhTrinh()}}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Image 
                      //chạy xe theo hành trình
                      source={this.state.batChayXe  ? iconStopHt:iconPlayHt} 
                      style={{ width: 39, height: 39 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: 178, height: 30,  marginTop:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <TouchableOpacity 
                    style = {{flex:1, height:30, backgroundColor: this.state.tocTuaHanhTrinh == 5 ? '#43425C': '#FFF',  borderColor: '#43425C', borderWidth:1, borderBottomLeftRadius:5, justifyContent:'center', alignItems:'center'}}
                    onPress = {() => {
                      this.setState({tocTuaHanhTrinh: 5})
                      AsyncStorage.setItem('tocTuaHanhTrinh', '5')
                    }}>
                <Text style={{fontSize: 18, textAlign:'center', color: this.state.tocTuaHanhTrinh == 5 ? '#FFF': '#000'}}> 2X </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress = {() => {
                      this.setState({tocTuaHanhTrinh: 10})
                       AsyncStorage.setItem('tocTuaHanhTrinh', '10')
                    }}
                style = {{flex:1, height:30, backgroundColor: this.state.tocTuaHanhTrinh == 10 ? '#43425C': '#FFF', borderColor: '#43425C', borderWidth:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize: 18, textAlign:'center', color:this.state.tocTuaHanhTrinh == 10 ? '#FFF': '#000'}}> 3X </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress = {() => {
                      this.setState({tocTuaHanhTrinh: 15})
                       AsyncStorage.setItem('tocTuaHanhTrinh', '15')
                    }}
                style = {{flex:1, height:30, backgroundColor: this.state.tocTuaHanhTrinh == 15 ? '#43425C': '#FFF',  borderColor: '#43425C', borderWidth:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize: 18, textAlign:'center', color:this.state.tocTuaHanhTrinh == 15 ? '#FFF': '#000'}}> 4X </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress = {() => {
                      this.setState({tocTuaHanhTrinh: 20})
                       AsyncStorage.setItem('tocTuaHanhTrinh', '20')
                    }}
                style = {{flex:1, height:30, backgroundColor: this.state.tocTuaHanhTrinh == 20 ? '#43425C': '#FFF',  borderColor: '#43425C', borderWidth:1, borderBottomRightRadius:5, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize: 18, textAlign:'center', color:this.state.tocTuaHanhTrinh == 20 ? '#FFF': '#000'}}> 5X </Text>
              </TouchableOpacity>
            </View>
          </View>
          :null}
          {/**
           * màn hình chọn hành trình
           */}
           { this.state.isShowViewHanhTrinh ? 
           <View style={{ width: width, height: height - 100, backgroundColor: '#FFF', position: 'absolute', zIndex: 2, flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ width: width, height: 75, backgroundColor: '#43425C', flexDirection: 'row' }}>
              <Text style={{ textAlign: 'center', width: width - 50, marginTop: 33, paddingLeft: 50, fontSize: 20, color: '#FFF' }}>HÀNH TRÌNH XE</Text>
              <TouchableOpacity
                style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                onPress={() => this.setState({
                  isShowViewHanhTrinh: false,
                  showList: false,
                  dataSource: this.state.dataSource.cloneWithRows([])
                })}>
                <Image style={{ width: 32, height: 32 }} source={iconExit} />
              </TouchableOpacity>
            </View>

            <View style={{ width: width - 2, height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 1, backgroundColor: '#43425C' }}>
              <Image source={iconCarInput} style={{ width: 32, height: 40, padding: 2 }} />
              <TextInput
                style={{ flex: 1, textAlign: 'center', color:'#FFF' }}
                onChangeText={(bs)  => this.renderItemListSearchDevice(bs, '_USER_TK_')}
                placeholder='Nhập biển số vd: 21-3067'
                placeholderTextColor='#959595'
                
                value={this.state.objectHanhTrinhSelect != null ? this.state.objectHanhTrinhSelect.Name : this.state.textSearchHT}
                numberOfLines={1} />
              <TouchableOpacity
                onPress={() => this.viewListDevice(!this.state.showList)}>
                <Image source={iconList_1} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </View>


            <View style={{ width: width, height: 102, flexDirection: 'row' }}>
              <View style={{ width: width - 100, height: 104, flexDirection: 'column' }}>
                <View style={{ marginLeft: 1, height: 50, backgroundColor: '#43425C', marginTop: 1 }}>
                  <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPress={() => this.setState({
                      isDateTimePickerVisible: true,
                      isChoosDateTime: true
                    })}>
                    <Image source={timeStart} style={{ width: 32, height: 40, padding: 2 }} />
                    <Text
                      style={{ textAlign: 'center', color: '#FFF' }}
                    >{this.state.txtThoiGianTu == '00/00/0000 00:00' ? '00/00/0000 00:00' : this.converDateTime(this.state.txtThoiGianTu)}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 1, height: 50, backgroundColor: '#43425C', marginTop: 1 }}>
                  <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPress={() => this.setState({
                      isDateTimePickerVisible: true,
                      isChoosDateTime: false
                    })}
                  >
                    <Image source={timeEnd} style={{ width: 32, height: 40, padding: 2 }} />
                    <Text
                      style={{ textAlign: 'center', color: '#FFF' }}
                    >{this.state.txtThoiGianDen == '00/00/0000 00:00' ? '00/00/0000 00:00' : this.converDateTime(this.state.txtThoiGianDen)}</Text>
                  </TouchableOpacity>
                </View>

                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode='datetime'
                  titleIOS='Chọn ngày giờ'
                  is24Hour={false}
                />

              </View>
              <View style={{ width: 98, height: 101, backgroundColor: '#43425C', marginTop: 1, marginLeft: 1 }}>

                {this.state.loadingHanhTrinh ?
                  <ActivityIndicator
                    animating={this.state.loadingHanhTrinh}
                    size="large"
                    color='#ff246d'
                    style={[styles.centering, styles.gray]}
                  /> :
                  <TouchableOpacity style={{ width: 98, height: 101, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.xemHanhTrinhCuaXe()}
                  >
                    <Text style={{ color: '#FFF' }}>XEM</Text>
                  </TouchableOpacity>
                }

              </View>
            </View>

            <View style={{ width: width - 2, height: height - 331, backgroundColor: '#43425C', marginTop: 1 }}>
              {/*Danh sach hanh trinh*
               onEndReached = { () => this.phanTrangDulieuHanhTrinh()} //kéo đến hết listview sẽ load thêm dữ liệu
                onEndReachedThreshold = {5} // cách bên dưới 5 pixel
              */}
              <ListView style={{ flex: 1, margin: 2, backgroundColor:'#43425C' }}
                automaticallyAdjustContentInsets={false}
                dataSource={this.state.dataSectionHanhTrinh}
                enableEmptySections={true}
                renderRow={this.renderRowItemHanhTrinh.bind(this)}
                renderSectionHeader={this.renderSectionHeaderHanhTrinh.bind(this)}
              >
              </ListView>
            </View>
          </View>
          : null}

          {/*Kết thúc mà hình chọn hành trình*/}
          {/*Màn hình báo cáo*/}
          {this.state.indexTabselector == 2 ? 
           <View style={{ width: width, height: height - 100, backgroundColor: '#fff', position: 'absolute', zIndex: 2, flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ width: width, height: 75, backgroundColor: '#43425C', flexDirection: 'row' }}>
              <Text style={{ textAlign: 'center', flex:1, marginTop: 33, fontSize: 20, color: '#FFF' }}>{this.state.titleBaoCao}</Text>
            </View>

            <View style={{ width: width - 2, height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 1, backgroundColor: '#43425C' }}>
              <Image source={iconCarInput} style={{ width: 32, height: 40, padding: 2 }} />
              <TextInput
                style={{ flex: 1, textAlign: 'center' , color:'#FFF'}}
                onChangeText={(bs)  => this.renderItemListSearchDevice(bs, '_USER_TK_')}
                placeholder='Nhập biển số vd: 21-3067'
                placeholderTextColor='#959595'
                
                value={this.state.objectHanhTrinhSelect != null ? this.state.objectHanhTrinhSelect.Name : this.state.textSearchHT}
                numberOfLines={1} />
              <TouchableOpacity
                onPress={() => this.viewListDevice(!this.state.showList)}>
                <Image source={iconList_1} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </View>


            <View style={{ width: width, height: 102, flexDirection: 'row' }}>
              <View style={{ width: width - 100, height: 104, flexDirection: 'column' }}>
                <View style={{ marginLeft: 1, height: 50, backgroundColor: '#43425C', marginTop: 1 }}>
                  <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPress={() => this.setState({
                      isDateTimePickerVisible: true,
                      isChoosDateTime: true
                    })}>
                    <Image source={timeStart} style={{ width: 32, height: 40, padding: 2 }} />
                    <Text
                      style={{ textAlign: 'center', color: '#FFF' }}
                    >{this.state.txtThoiGianTu == '00/00/0000 00:00' ? '00/00/0000 00:00' : this.converDateTime(this.state.txtThoiGianTu)}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 1, height: 50, backgroundColor: '#43425C', marginTop: 1 }}>
                  <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPress={() => this.setState({
                      isDateTimePickerVisible: true,
                      isChoosDateTime: false
                    })}
                  >
                    <Image source={timeEnd} style={{ width: 32, height: 40, padding: 2 }} />
                    <Text
                      style={{ textAlign: 'center', color: '#FFF' }}
                    >{this.state.txtThoiGianDen == '00/00/0000 00:00' ? '00/00/0000 00:00' : this.converDateTime(this.state.txtThoiGianDen)}</Text>
                  </TouchableOpacity>
                </View>

                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode='datetime'
                  titleIOS='Chọn ngày giờ'
                  is24Hour={false}
                />

              </View>
              <View style={{ width: 98, height: 101, backgroundColor: '#FFF', marginTop: 1, marginLeft: 1 , flexDirection: 'column'}}>
                 <ModalPicker
                    style={{ flex:1, alignItems: 'center', justifyContent: 'center', marginBottom:0.5, backgroundColor: '#43425C'}}
                    
                    data={[
                          { keyDropDown: 1, section: true, labelDropDown: 'CHỌN BÁO CÁO' },
                          { keyDropDown: 2, labelDropDown: 'BÁO CÁO TỔNG HỢP', keyBaoCao:'BCTH' },
                          { keyDropDown: 3, labelDropDown: 'BÁO CÁO HÀNH TRÌNH', keyBaoCao:'BCHT' }]}
                   
                    onChange={(option)=>{ this.setState({
                        keyBaoCao: option.keyBaoCao, 
                        titleBaoCao: option.labelDropDown,
                        dataSectionBaoCao: this.state.dataSectionBaoCao.cloneWithRowsAndSections({})
                      })}}
                    >
                        <View  style={{flexDirection:'row', flex:1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{ color: '#FFF', }}>Chọn BC</Text>  
                        </View>
                </ModalPicker>

                {/*<TouchableOpacity style={{ flex:1, alignItems: 'center', justifyContent: 'center', marginBottom:0.5, backgroundColor: '#2cee71'}}
                  onPress={() => this.chonLoaiBaoCaoCuaXe()}
                >
                  <Text style={{ color: '#0031FF', }}>Chọn BC</Text>
                </TouchableOpacity>*/}
                {this.state.loadingBaoCao ?
                  <ActivityIndicator
                    animating={this.state.loadingBaoCao}
                    size="large"
                    color='#ff246d'
                    style={[styles.centering, styles.gray]}
                  /> :
                  <TouchableOpacity style={{ flex:1, alignItems: 'center', justifyContent: 'center', marginTop:0.5, backgroundColor: '#43425C' }}
                    onPress={() => this.xemBaoCaoCuaXe()}
                  >
                    <Text style={{ color: '#FFF',}}>Xem BC</Text>
                  </TouchableOpacity>
                }

              </View>
            </View>
            <View style={{ width: width - 2, height: height - 329, backgroundColor: '#fff', marginTop: 1 }}>
              {/*Danh sach hanh trinh* height - 305
               onEndReached = { () => this.phanTrangDulieuHanhTrinh()} //kéo đến hết listview sẽ load thêm dữ liệu
                onEndReachedThreshold = {5} // cách bên dưới 5 pixel
              */}
              <ListView style={{ flex: 1, margin: 0, backgroundColor:'#43425C', borderBottomColor:'#FFF', borderBottomWidth:1}}
                automaticallyAdjustContentInsets={false}
                dataSource={this.state.dataSectionBaoCao}
                enableEmptySections={true}
                renderRow={this.renderRowItemBaoCao.bind(this)}
                renderSectionHeader={this.renderSectionHeaderBaoCao.bind(this)}
              >
              </ListView>
            </View>
          </View>
          :null}
          {/* ket thucs Màn hình báo cáo*/}

          {/*
          * Màn hình tài khoản
          */}
          {this.state.indexTabselector == 3 ?
          <View style={{ width: width, height: height - 100, backgroundColor: '#43425C', position: 'absolute', zIndex: 6, flexDirection: 'column', alignItems: 'center', borderBottomColor:'#FFF', borderBottomWidth:1 }}>
            <Image 
              style={{width: width, height: 200 }} 
              source = {bg_user}/>
            <Image 
              style={{width: 100, height: 100, borderRadius: 50, position: 'absolute', zIndex: 1, marginTop: 150, borderColor:'#fff', borderWidth: 2}} 
              source = {img_profile_default}/>
            <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 60}}>{this.state.titleTenTaiKhoan != null ? 'Tài khoản: ' + this.state.titleTenTaiKhoan.Username:''}</Text>  
            <TouchableOpacity 
              style={{ width: 100, height: 45, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' , marginTop: 30, backgroundColor:'#440C4E', borderColor: '#FFF', borderWidth:2, borderRadius:5}}
              onPress = {() => this.funcDangXuat()}
            >
              <Text
                style={{ flex:1, textAlign: 'center', color: '#FFF' }}>ĐĂNG XUẤT</Text>
            </TouchableOpacity>
         
          </View>
          :null}
          {/*
          * kết thúc Màn hình tài khoản
          */}
          <MapView
            provider={this.props.provider}
            ref={ref => { this.map = ref }}
            showsCompass={true}
            scrollEnabled={true}
            loadingEnabled
            loadingIndicatorColor="#666666"
            loadingBackgroundColor="#eeeeee"
            style={{ flex: 1, backgroundColor: '#8BF49F', flexDirection: 'row', justifyContent: 'center' }}
            initialRegion={
              {
                latitude: this.state.indexTabselector == 0 ? this.state.dataDevice[0].Lat : this.state.arrHanhTrinh.length > 0 ? this.state.arrHanhTrinh[0].latitude:0,
                longitude: this.state.indexTabselector == 0 ? this.state.dataDevice[0].Lon : this.state.arrHanhTrinh.length > 0 ? this.state.arrHanhTrinh[0].longitude:0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            }
          >

            {/*hiển thị lộ trình của xe*/}
              <MapView.Polyline
                key={0}
                coordinates={this.state.arrHanhTrinh}
                strokeColor = {this.state.indexTabselector == 1 ? '#ff0101': 'transparent'}
                lineJoin='round'
                fillColor= {this.state.indexTabselector == 1 ? '#ff0101': 'transparent'}
                strokeWidth={3}
              />
              
              {this.state.obectXeChay != null ? this.state.indexTabselector == 1 ? 
                
                  <MapView.Marker
                    coordinate={this.state.obectXeChay}
                    key={65891}
                    image={iconCarRun}
                    style = {{transform:[{rotate: this.state.obectXeChay.Direction + 'deg'}]}}
                  />
                : null : null}
              
            {/**
              rovider={PROVIDER_GOOGLE} // su dung map google
               style={{transform: [{ rotate: marker.Direction +'deg'}]}}
            **/}

            {this.state.indexTabselector == 0 ? this.state.dataDeviceSelect.map((marker, i) => (
              <MapView.Marker
                onPress={() => this.LayDiaChi(marker)}
                coordinate={{
                  latitude: marker.Lat,
                  longitude: marker.Lon
                }}
                key={i}
                image={this.setIconStatusCar(marker)}
               
              >
                <MapView.Callout style={{ padding: 5, alignItems: 'center' }} >
                  <View>
                    <View style={styles.titleCallout}>
                      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{marker.Name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Tốc độ:</Text>
                      <Text style={{ fontSize: 14 }}> {marker.Stat != 3 ? marker.Speed : 0} km/h</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Nhiên liệu:</Text>
                      <Text style={{ fontSize: 14 }}> {marker.Fuel} % </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Tình trạng:</Text>
                      <Text numberOfLines={3} style={{ fontSize: 14, width: width - 100 }}> {this.isStatusCar(marker.Stat, marker.Status)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Động cơ:</Text>
                      <Text style={{ fontSize: 14 }}> {this.CheckIsEngine(marker.Stat, marker.IsEngine)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Lái xe liên tục:</Text>
                      <Text style={{ fontSize: 14 }}> 0 giờ 0 phút</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Lái xe trong ngày:</Text>
                      <Text style={{ fontSize: 14 }}>  0 giờ 0 phút</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Contermet đồng hồ:</Text>
                      <Text style={{ fontSize: 14 }}> 0 km</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Tổng km trong ngày:</Text>
                      <Text style={{ fontSize: 14 }}> 0 km</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Nhận tín hiệu lúc:</Text>
                      <Text style={{ fontSize: 14 }}> {this.converDateTime(marker.Time)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>Địa chỉ:</Text>
                      <Text numberOfLines={3} style={{ fontSize: 14, width: width - 100 }}> {this.state.diaChi == null ? "Đang cập nhật" : this.state.diaChi}</Text>
                    </View>
                  </View>
                </MapView.Callout>
              </MapView.Marker>

            )) :this.state.indexTabselector == 1 ? this.state.arrHanhTrinh.map((v, i) => {

                switch(v.keyCheck)
                  {
                    case 'BT':
                      return  <MapView.Marker
                        onPress={() => this.LayDiaChi({Lat: v.latitude, Lon: v.longitude})}
                        coordinate={v}
                        key={i}
                        image={iconBatDauHanhTrinh}
                      > 
                        <MapView.Callout style={{ padding: 5, alignItems: 'center', justifyContent:'center' }} >
                          <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
                              <Text style={{ fontWeight: 'bold' }}>Địa chỉ:</Text>
                              <Text numberOfLines={3} style={{ fontSize: 14, width: width - 100 }}> {this.state.diaChi == null ? "Đang cập nhật" : this.state.diaChi}</Text>
                            </View>
                          </View>
                        </MapView.Callout>
                      </MapView.Marker>

                    case 'KT':
                      return  <MapView.Marker
                        onPress={() => this.LayDiaChi({Lat: v.latitude, Lon: v.longitude})}
                        coordinate={v}
                        key={i}
                        image={iconKetThucHanhTrinh}
                      > 
                        <MapView.Callout style={{ padding: 5, alignItems: 'center', justifyContent:'center' }} >
                          <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
                              <Text style={{ fontWeight: 'bold' }}>Địa chỉ:</Text>
                              <Text numberOfLines={3} style={{ fontSize: 14, width: width - 100 }}> {this.state.diaChi == null ? "Đang cập nhật" : this.state.diaChi}</Text>
                            </View>
                          </View>
                        </MapView.Callout>
                      </MapView.Marker>

                    case 'DL':
                      return  <MapView.Marker
                        onPress={() => this.LayDiaChi({Lat: v.latitude, Lon: v.longitude})}
                        coordinate={v}
                        key={i}
                        image={iconDiemDungHanhTrinh}
                      > 
                        <MapView.Callout style={{ padding: 5, alignItems: 'center', justifyContent:'center' }} >
                          <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
                              <Text style={{ fontWeight: 'bold' }}>Địa chỉ:</Text>
                              <Text numberOfLines={3} style={{ fontSize: 14, width: width - 100 }}> {this.state.diaChi == null ? "Đang cập nhật" : this.state.diaChi}</Text>
                            </View>
                          </View>
                        </MapView.Callout>
                      </MapView.Marker>
                  }
                }
            ):null}
          </MapView>

          <View style={{ width: width, height: 75 }}>
            <ScrollView
              automaticallyAdjustContentInsets={false}
              horizontal={true}
              scrollEnabled={false}
              style={{ flex: 1, backgroundColor: '#43425C', flexDirection: 'row' }}
            >
              <TouchableOpacity
                onPress={() => this.tabClick(0)}
              >
                <View style={styles.tabMenuBoderRight}>
                  <Icon name="md-search" style={{ fontSize: 20, color: this.colorTab(0) }} />
                  <Text style={{ fontSize: 10, color: this.colorTab(0) }}>Giám Sát</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.tabClick(1)}
              >
                <View style={styles.tabMenuBoderRight}>
                  <Icon name="md-map" style={{ fontSize: 20, color: this.colorTab(1) }} />
                  <Text style={{ fontSize: 10, color: this.colorTab(1) }}>Hành Trình</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.tabClick(2)}
              >
                <View style={styles.tabMenuBoderRight}>
                  <Icon name="ios-stats" style={{ fontSize: 20, color: this.colorTab(2) }} />
                  <Text style={{ fontSize: 10, color: this.colorTab(2) }}>Báo Cáo</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.tabClick(3)}
              >
                <View style={{ flex: 1, width: width / 4, padding: 5, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="ios-contact" style={{ fontSize: 20, color: this.colorTab(3) }} />
                  <Text style={{ fontSize: 10, color: this.colorTab(3) }}>Tài Khoản</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>

          </View>
        </View>

      )

    } else {
      return (
        <View style={{ flex: 1 }} >
          {this.state.loading == true ? <ActivityIndicator
            animating={this.state.loading}
            size="large"
            color='#ff246d'
            style={[styles.centering, styles.gray]}
          /> : <LoginGPS rootView={this} />}
        </View>
      )
    }
  }
}

THKGPS.PropTypes = {
  provider: MapView.ProviderPropType
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  titleCallout: {
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomColor: '#e74c3c',
    borderStyle: 'solid',
    borderBottomWidth: 1,
  }
  ,
  tabMenuBoderRight: {
    flex: 1,
    width: width / 4,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'white'
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#43425C',
  }
});

AppRegistry.registerComponent('THKGPS', () => THKGPS);

