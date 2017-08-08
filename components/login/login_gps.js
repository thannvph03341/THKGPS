import React, {Component} from 'react'
import {Text, 
        TextInput,
        TouchableOpacity, 
        View, Alert, 
        StyleSheet, Image, Button, Dimensions, KeyboardAvoidingView, StatusBar } from 'react-native'

const {width, height} = Dimensions.get('window')


 export default class LoginGPS extends Component {

     constructor(props){
         super(props)
         this.state = ({
             dataUser:{
                 user:'',
                 passwork:''
             }
         })
     }

     render(){
         return (
                <KeyboardAvoidingView behavior='padding' style = {style_login.container}>
                    <StatusBar
                        barStyle = 'light-content'
                    />
                    <View style={{flex:1, justifyContent:'flex-end', alignItems:'center', flexDirection:'column'}}>
                        <Image style = {{width:125, height:145}}
                        source={require('../../components/image/ios/logo_app_gps.png')}/>
                        <Text style={{fontSize:20, color:'white'}}>Đăng Nhập</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', flexDirection:'column', margin:20}}>
                        <TextInput 
                                placeholder = 'Tài khoản'
                                placeholderTextColor = 'rgba(145,145,145,1)'
                                returnKeyType = 'next'
                                autoCapitalize = 'none'
                                autoCorrect = {false}
                                ref = {(user) => this.inputUser = user}
                                onSubmitEditing = {() => this.inputPassword.focus()}
                                onChangeText = {(user) => this.state.dataUser.user = user}
                                style={{ backgroundColor:'#fff', height:40, padding: 6, margin: 3,  width: width - 47}}/>
                        
                            <TextInput 
                                placeholder = 'Mật khẩu'
                                placeholderTextColor = 'rgba(145,145,145,1)'
                                secureTextEntry = {true}
                                autoCorrect = {false}
                             
                                ref = {(pass) => this.inputPassword = pass}
                                onChangeText = {(passwork) => this.state.dataUser.passwork = passwork}
                                style={{backgroundColor:'#fff', height:40, padding: 6, margin: 3, width: width - 47}}/>

                            <TouchableOpacity 
                                style={{
                                    backgroundColor:'#43425C', 
                                    height:40, 
                                    width: width - 47, 
                                    flexDirection:'column',
                                    alignItems:'center', 
                                    justifyContent:'center', 
                                    borderColor:'white',
                                    borderWidth:2,
                                    borderStyle:'solid', top:3}}
                                    ref = {(btn) => this.btnDangNhap = btn}
                                    onPress = {() => this.props.rootView.LoginFunc({Username:this.state.dataUser.user, password:this.state.dataUser.passwork}, 'nguoiDungDangNhap')}>
                                    <Text style={{color:'white'}}>Đăng Nhập</Text>
                        </TouchableOpacity>
                        {/*<Text style={{width:width, textAlign:'center', color:'white', fontWeight:'bold', fontSize:18, top: 15}}>© Copyright THK</Text>*/}
                    </View>
                </KeyboardAvoidingView>
         )
     }
 }

 const style_login = StyleSheet.create({
    container:{flex:1, backgroundColor: '#43425C'},
    logo:{

    }

 })

 