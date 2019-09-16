import React, { Component, createRef } from 'react';
import { Button, FlatList, StyleSheet,Text, View, Image, TouchableHighlight, Platform } from 'react-native'
import firebase from '../../config/config.js';
// import CodeInput from 'react-native-confirmation-code-input';
import AddContact from '../components/AddContact.js';
import CodeFiled from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  linearGradient: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    minHeight: 555,
  },
  

  inputLabel: {
    paddingTop: 100,
    paddingBottom: 10,
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  inputSubLabel: {
    color: 'rgba(255,255,255,.7)',
  },
  inputWrapStyle: {
    height: 60,
    marginTop: 30,
  },
  input: {
    height: 60,
    width: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#000',
    color: '#fff',
    backgroundColor: '#030c31',
    fontSize: 30,
    fontWeight: '700',
  },
  inputNotEmpty: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  resetCode: {
    marginTop: 25,
    color: '#4b5ba4',
  },
  nextButton: {
    marginTop: 80,
    height: 70,
    borderRadius: 2,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 5,
      },
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

class Search extends Component{

    constructor(props) {
        super(props);
        this.state={
            Email:null,
            Phone:null,
            UserName:null,
            input:true
        }
    }

    onFinishCheckingCode(code){
        this.setState({
          input: false
        })
        console.log(code);
        this.sendRequest((code.toString()))
      }

    closeContact(){
        this.setState({
          input: true
        })
     }

    setValue(Email,Phone,UserName){
        console.log('hhhhhhhhhhhhhh')
        this.setState({
            Email:Email,
            Phone:Phone,
            UserName:UserName
        })
        console.log("success");
    }

    sendRequest(Code){
        var that = this;
        console.log("******************");
        firebase.database().ref('Groups/'+Code).once('value').then(function(snapshot){
            const exists = (snapshot.val() != null);
            if (exists)  {
              UserId = snapshot.val()
              console.log(snapshot.val(),"hhhhh")
              console.log('Single  Value: ',UserId)
              firebase.database().ref('Users/'+UserId).once('value').then(function(snapshot){
                const exists = (snapshot.val() != null);
                if(exists){
                    Email = snapshot.val().Email
                    Phone = snapshot.val().Phone
                    UserName = snapshot.val().UserName
                    console.log("Email:",Email,"Phone",Phone,"UserName",UserName)
                    that.setValue(Email,Phone,UserName)
                }
              })
            }
          }).catch(error => console.log(error));
    }



    onFinishCheckingCode = code => {
      if (code === '1234') {
        return Alert.alert('Confirmation Code', 'Successful!', [{ text: 'OK' }], {
          cancelable: false,
        });
      }

      Alert.alert('Confirmation Code', 'Code not match!', [{ text: 'OK' }], {
        cancelable: false,
      });

      // If code does not match, clear input with: this.refs.codeInputRef1.clear()
      this.codeInputRef.current.clear();
    };

    inputStyle = (index, isActive, hasValue) => {
      if (hasValue) {
        return styles.inputNotEmpty;
      }
      return null;
    };

    inputProps = () => ({
      keyboardType: 'numeric',
      style: styles.input,
    });

    static containerProps = { style: styles.inputWrapStyle };

    static buttonColors = ['#8096ee', '#a571ff'];

    static rootColors = ['#2f3d6c', '#161e3c'];

    codeInputRef = createRef();

    render()
    {
      if (this.state.input){
        return(
          <View  style={{backgroundColor: '#CC99FF'}}>
            <Text style={{fontWeight: 'bold', marginTop:200, textAlign: 'center', fontSize: 32}}>
              Enter 4-digit Code to search for contacts
            </Text>
            <CodeFiled
              ref={this.codeInputRef}
              inputPosition="full-width"
              variant="clear"
              codeLength={4}
              inputProps={this.inputProps}
              inputStyle={this.inputStyle}
              containerProps={Search.containerProps}
              onFulfill={this.onFinishCheckingCode}
            />
          </View>
        )
      }
      else{

        return(
          <View>
             <AddContact
             Email={this.state.Email}
             Phone={this.state.Phone}
             UserName={this.state.UserName}
             goBack={()=>this.closeContact()}/>
      </View>
        )
    }
  }

}

export default Search;
