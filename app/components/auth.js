import React from 'react'
import { TouchableOpacity, Button, TextInput, KeyboardAvoidingView, StyleSheet, Text, View,Image} from 'react-native'
import firebase from '../../config/config.js';
import Emoji from 'react-native-emoji';


class userAuth extends React.Component{

    login = async () => {
        var email = this.state.email;
        var pass = this.state.pass;
        if(email !='' && pass != ''){
        try {
            let user = await firebase.auth().signInWithEmailAndPassword(email,pass)//'BoyangZhang2020@u.northwestern.edu', '12345678')
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }else{
        alert('email or password is empty..')
    }
}

    constructor(props){
        super(props);
        this.login();
        this.state = {
            authStep: 1,
            email: '',
            pass: '',
        }
    }

    componentDidMount = () =>{

    }

    render(){
        return(
            <View>

                      <Text style={{fontSize:36, color:'white', fontWeight:'bold', marginVertical:40}}>
                      <Emoji name="bookmark"/> nametag </Text>
                      <View style={{backgroundColor:'white',  padding:'10%', borderRadius:5  ,  shadowOpacity: 0.35,
                          shadowRadius: 24,
                          shadowColor: 'black',
                          shadowOffset: { height: 5, width: 5 },}}>
                          <Text style={{color: '#1FA2FF', fontWeight:'700'}}> Email Address</Text>
                        <TextInput
                        editable={true}
                        keyboardType={'email-address'}
                        autoCapitalize = 'none'
                        placeholder={'enter your email address'}
                        onChangeText={(texts) => this.setState({email:texts})}
                        value={this.state.email}
                        style={{width:250,height:45, marginVertical:10, padding:10,borderWidth:2, borderColor:'white',borderRadius:3,color:'black'}}
                        />
                        <Text style={{color: '#1FA2FF', fontWeight:'700', marginTop:15}}> Password</Text>

                        <TextInput
                        editable={true}
                        secureTextEntry={true}
                        autoCapitalize = 'none'
                        placeholder={'enter your password'}
                        onChangeText={(texts) => this.setState({pass:texts})}
                        value={this.state.pass}
                        style={{width:250,height:45, marginVertical:10, padding:10,borderWidth:2, borderColor:'white',borderRadius:3, color:'black'}}
                        />
                        <TouchableOpacity
                            style={styles.customButton}
                            onPress={(() => this.login())}>
                            <Text style={styles.customButtonText}>LOG IN</Text>
                        </TouchableOpacity>
                        </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  customButton: {
    alignSelf: 'flex-start',
    marginTop: 30,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderColor:'#1FA2FF',
    borderWidth:2,
    borderRadius: 100,
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
  },
  customButtonText: {
    color: '#1FA2FF',
    fontWeight: '700',
    fontSize:16
  },
})

export default userAuth;
