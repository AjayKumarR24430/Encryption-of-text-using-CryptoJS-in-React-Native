import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import CryptoJS from 'crypto-js';

export default class App extends Component {

  constructor() {
    super();
    //initialization
    this.state = {
      encryptText : '',
      output: [{
        'cxz': '',
        'sxz': '',
        'xiv': ''
      }]
     }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  encfn = (n) => {
    let r=CryptoJS.lib.WordArray.random(256)
    let t=CryptoJS.lib.WordArray.random(16)
    let h= "aaaaaaaa";
    let o=CryptoJS.PBKDF2(h,r,{hasher:CryptoJS.algo.SHA512,keySize:8,iterations:999})
    let i=CryptoJS.AES.encrypt(n,o,{iv:t})
    let e={
    cxz:CryptoJS.enc.Base64.stringify(i.ciphertext),
    sxz:CryptoJS.enc.Hex.stringify(r),
    xiv:CryptoJS.enc.Hex.stringify(t)
    }
      const state = this.state;
      state['output']['cxz']= e.cxz;
      state['output']['sxz'] = e.sxz;
      state['output']['xiv'] = e.xiv;
      this.setState(state)
      return e;
  }
  
  render(){
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={{marginTop: 70, fontSize: 35, marginBottom: 40}}>
          CryptoJS Encryption
        </Text>
        <TextInput
        style={{ width:250, height: 40, marginBottom: 50,borderColor: 'gray', borderWidth: 1 }}
        placeholder= {'Enter text to encrypt'}
        value={this.state.encryptText}
        onChangeText={(val) => this.updateInputVal(val, 'encryptText')}
        />
        <Button 
        title= {'Press this button to encrypt'}
        onPress = {() => {this.encfn(this.state.encryptText)}}
        />
        <Text style={{marginTop: 30, fontSize: 25, marginLeft: 20, marginRight: 20}}>
          cxz value is: {this.state.output.cxz}
          {"\n"}{"\n"}
          sxz value is: {this.state.output.sxz}
          {"\n"}{"\n"}
          xiv value is: {this.state.output.xiv}
        </Text>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
