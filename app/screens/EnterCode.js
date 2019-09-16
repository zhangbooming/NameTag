import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon, Input, Text } from 'react-native-elements';
import firebase from '../../config/config.js';
import Emoji from 'react-native-emoji';


class EnterCode extends React.Component{

    constructor(props){
        super(props);
        this.state={
          code:''
        }
    }

    updateCode(text){
      var that = this
      this.setState({code:text.toLowerCase()})
      setTimeout(function(){
        if (that.state.code.length == 4){
          that.joinGroup(that.state.code)
        }
      },100)

    }

    joinGroup(groupcode){
      var that = this;

      firebase.database().ref('Groups/'+groupcode).once('value')
      .then((snapshot) => {
        const exists = (snapshot.val() != null);
        if (exists)  {
          this.setState({
            joinGroup:true,
            groupcode:groupcode,
            groupusers:snapshot.val()
          });
        }
      })
      setTimeout(function(){that.props.navigation.navigate('Group',{groupcode:that.state.code, groupusers:that.state.groupusers})}, 500);
    }

    render(){
      return(
        <View style={styles.container}>
          <Text style={{fontWeight: 'bold', marginTop:150, textAlign: 'center', fontSize: 14, color:'white', letterSpacing:1, fontWeight:'700'}}>
          <Emoji name="coffee" style={{fontSize: 30}} />{"\n"}{"\n"}
            ENTER CODE, FIND CONTACTS!</Text>
          <TextInput
              style={{height: 85, borderColor: 'white', borderWidth:'3px', Width: 1, marginTop:25, borderRadius:15, padding:10, fontSize:35, color:'white', fontWeight:'700'}}
              onChangeText={(text) => this.updateCode(text)}
              value={this.state.text}
            />
        </View>
      )
    }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1FA2FF',
    width:'100%',
    height:'100%',
    padding:'10%',
  },
})

export default EnterCode;
