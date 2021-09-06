import React, { Component } from 'react'
import { Text,StyleSheet,View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }

    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==='granted'
        })
    }

    handleBarcodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState==='clicked'&&hasCameraPermissions){
            return(
                <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned} style={StyleSheet.absoluteFillObject}>
                </BarCodeScanner>
            )
        }
        else if(buttonState === 'normal'){
            return(
                <View style = {styles.container}>
                    <Text style={styles.displayText}>{
                        hasCameraPermissions===true?this.state.scannedData:"Request camera permission"
                    }</Text>
                    <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions}>
                        <Text style={styles.buttonText}>Scan QR code</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline'
    },
    scanButton:{
        backgroundColor:'skyblue',
        padding:10,
        margin:10
    },
    buttonText:{
        fontSize:20
    }
})