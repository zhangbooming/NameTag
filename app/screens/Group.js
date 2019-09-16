import React from 'react';
import { FlatList, StyleSheet, Text, Alert, View, Image, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { CheckBox, Badge, Button, ListItem, Icon } from 'react-native-elements'
import CodeInput from 'react-native-confirmation-code-input';
import TimerCountdown from 'react-native-timer-countdown';
import firebase from '../../config/config.js';
import { Permissions, Contacts } from 'expo';
import { PullToRefresh } from 'antd-mobile';




class Group extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      input: true,
      code: "ABLE",
      checked: true,
      ready: false,
      userInfo: []
    }

  }
  componentDidMount() {
    this.getGroupInfo();
  }

  keyExtractor = (item, index) => index

  renderItem = ({ item, index }) => (
    <View>
      <ListItem key={index}
        title={item.UserName}
        subtitle={item.Email}
        leftAvatar={{ source: { uri: item.Image } }}
        onPress={() => { this.addContactAsync(item) }}
        rightIcon={{ name: 'person-add' }}
      />
    </View>
  )


  refresh() {
    console.log("refresh has been excuted!!!")
    this.state.userInfo = []
    var that = this;
    firebase.database().ref('Groups/' + that.state.code).once('value').then(
      function (snapshot) {
        const exists = (snapshot.val() != null);
        if (exists) {
          that.setState({
            groupusers: snapshot.val()
          })
          console.log("this.state.groupusers:", that.state.groupusers)
          that.getUsers(that.state.groupusers)
          setTimeout(that.dummyfunction, 1000);
        }
      })
  }

  getGroupInfo() {
    //const code_groupusers = this.props.navigation.getParam('groupusers', 'failed');
    var that = this;
    const groupcode = this.props.navigation.getParam('groupcode', 'failed');
    this.setState({ code: groupcode });
    console.log("groupcode:", groupcode);
    firebase.database().ref('Groups/' + groupcode).on('value', function (snapshot) {
      const exists = (snapshot.val() != null);
      if (exists) {
        that.setState({
          groupusers: snapshot.val()
        })
        console.log("this.state.groupusers:", that.state.groupusers)
        that.getUsers(that.state.groupusers)
        setTimeout(that.dummyfunction, 1000);
      }
    })



  }

  dummyfunction() { }

  getUsers(groupusers) {
    var that = this;
    this.setState({userInfo: [] });
    for (i in groupusers) {
      firebase.database().ref('Users/' + groupusers[i]).once('value')
        .then((snapshot) => {
          const exists = (snapshot.val() != null);
          if (exists) {
            that.state.userInfo.push(snapshot.val());
            //console.log("groupusers Unit:",snapshot.val())
            //console.log("Phone:",snapshot.val().Phone)
            console.log("this.state.userInfo:", this.state.userInfo)
            that.setState({ ready: true })
          }
        })
    }
  }

  async addContactAsync(item) {
    // Ask for permission to query contacts.
    const permission = await Permissions.askAsync(Permissions.CONTACTS);

    if (permission.status !== 'granted') {
      // Permission was denied...
      return;
    }
    console.log(item);
    const contact = {
      //[Contacts.Fields.FirstName]: item.UserName,
      [Contacts.Fields.LastName]: item['UserName'],
      [Contacts.Fields.Emails]: [{ ['email']: item['Email'], ['label']: "E-mail" }],
      [Contacts.Fields.PhoneNumbers]: [{ ['number']: item['Phone'].toString(), ['label']: "Phone" }],
      [Contacts.Fields.UrlAddresses]: [{ ['url']: item['Facebook'], ['label']: "Facebook" }]
    }
    const contactId = await Contacts.addContactAsync(contact);
    Alert.alert(
      'You have successfully added',
      item['UserName'],
      'to your contacts!'
    );
  }

  render() {

    return (

      <View style={styles.container}>
      <View style={styles.codeContainer}>
      <Text style={styles.codeBefore}>YOUR CODE IS: </Text>
      <Text style={styles.code}>{this.state.code} </Text>
      </View>
        <TouchableOpacity style={styles.customButton} onPress={() => this.refresh()}>
          <Text style = {styles.customButtonText}>REFRESH</Text>
        </TouchableOpacity>


        {this.state.ready == true ? (
          <FlatList
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            data={this.state.userInfo}
            renderItem={this.renderItem} />
        ) : (
            <View>
              <Text>Waiting......</Text>
            </View>
          )}


      </View>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1FA2FF',
    width:'100%',
    height:'100%',
    padding:'10%',
  },
  codeContainer:{
    alignItems:'center',
    marginTop:40
  },
  checkbox: {
    margin: 100,
    height: 100,
    borderColor: '#7a42f4',
    borderWidth: 1,
    paddingTop: 100
  },
  customButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    marginBottom: 30,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderColor:'white',
    borderWidth:2,
    borderRadius: 100,
    shadowOpacity: 0.15,
    shadowRadius: 24,
    shadowColor: 'black',
    shadowOffset: { height: 0, width: 0 },
  },
  customButtonText: {
    color: 'white',
    fontWeight: '700',
    letterSpacing: 1,
  },
  code: {
    textTransform: 'uppercase',
    fontWeight: '700',
  textAlign:'center',
  fontSize:60,
  color:'white'
},
  codeBefore :{
    marginTop:15,
    fontSize:20,
    textAlign:'center',
    color:'white'
  }
})

export default Group;
