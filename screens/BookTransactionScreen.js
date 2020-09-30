import React from 'react';
import { Text, View,TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal',
    }
  }
  getCameraPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions:status==='granted',
    })
  }
  handleBarcodeScanned=(type,data)=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:'normal',
    })
  }
    render() {
      const hasCameraPermissions=this.state.hasCameraPermissions;
      const scanned=this.state.scanned;
      const buttonState=this.state.buttonState;
      if(buttonState==='clicked'&&hasCameraPermissions){
        return(
          <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned} />
        )
      }
      else if(buttonState==='normal'){

      
      return (
        
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Issue or Return</Text>
          <TouchableOpacity onPress={this.getCameraPermissions}>
          <Text>Scan QR code  </Text>
          </TouchableOpacity>
        </View>
      );
      }
    }
  }