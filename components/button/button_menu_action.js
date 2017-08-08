import React,{Component} from 'react'
import {
    Text, View, StyleSheet
} from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

export default class ButtonMenuAction extends Component{
    render(){
        return(
             <ActionButton buttonColor="rgba(231,76,60,1)">
                      <ActionButton.Item buttonColor='#9b59b6' title='Giám Sát' onPress={() => console.log("notes tapped!")}>
                        <Icon name="md-search" style={styles_button.actionButtonIcon} />
                      </ActionButton.Item>
                      <ActionButton.Item buttonColor='#2ecc71' title='Hành Trình' onPress={() => console.log("")}>
                        <Icon name="md-map" style={styles_button.actionButtonIcon}/>  
                      </ActionButton.Item>
                      <ActionButton.Item buttonColor='#f1c40f' title='Định Tuyến' onPress={() => console.log("")}>
                        <Icon name="ios-train" style={styles_button.actionButtonIcon}/>  
                      </ActionButton.Item>
                      <ActionButton.Item buttonColor='#2c3e50' title='Tạm Dừng' onPress={() => console.log("")}>
                        <Icon name="ios-pause" style={styles_button.actionButtonIcon}/>  
                      </ActionButton.Item>
                      <ActionButton.Item buttonColor='#d35400' title='Báo Cáo' onPress={() => console.log("")}>
                        <Icon name="ios-stats" style={styles_button.actionButtonIcon}/>  
                      </ActionButton.Item>
                      <ActionButton.Item buttonColor='#1abc9c' title='Cài Đặt' onPress={() => console.log("")}>
                        <Icon name="ios-settings" style={styles_button.actionButtonIcon}/>  
                      </ActionButton.Item>
             </ActionButton>
        )
    }
}

 const styles_button = StyleSheet.create({
      instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
      },
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      }
    });