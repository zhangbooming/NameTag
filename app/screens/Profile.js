import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Alert} from 'react-native';
import { Card, ListItem, Button, Icon, Input } from 'react-native-elements'

class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state={
            text: ''
        }
    }

    componentWillMount() {
      const userId = this.props.navigation.getParam('userId', 'failed');
      const UserName = this.props.navigation.getParam('UserName', 'failed');
      const Email = this.props.navigation.getParam('Email', 'failed');
      const Phone = this.props.navigation.getParam('Phone', 'failed');
      const Facebook = this.props.navigation.getParam('Facebook', 'failed');
      const Image = this.props.navigation.getParam('Image', 'failed');
      //alert(userId);
      this.setState({
        userId:userId,
        userName:UserName,
        Image:Image,
        Phone:Phone,
        Facebook:Facebook,
        Email:Email
      })
    }

    onPressButton(){
        Alert.alert(
         'You have updated your profile.'
        )
    }

    render()
    {
        return(
            <View style={styles.container}>
              {/* <Text>Image:{this.state.Image}</Text> */}
                    <Card
                      containerStyle={{marginTop: 50}}
                      //image={require('../../assets/profilePhoto.jpg')}
                      //image = {require('http://facebook.github.io/react/img/logo_og.png')}
                      //image = {{source:{}}}
                      //image={{ source: { uri: 'https://firebasestorage.googleapis.com/v0/b/myfirstproject-3cbe1.appspot.com/o/user_image%2FBoya.jpg?alt=media&token=11becd64-b01d-4aa8-9635-c18b28b85e9a' } }}
                      //imageProps={{marginTop: 20, resizeMode: 'contain'}}
                      >
                      <Image
                        source={{
                          uri: this.state.Image,
                          cache: 'only-if-cached',
                        }}
                        style={{width: 60, height: 60,resizeMode:'contain'}}
                        />
                      <ListItem
                        key={0}
                        title={"Your Name"}
                        textInput={true}
                        rightTitle={this.state.userName}
                        //textInputValue={this.state.userName}
                        hideChevron
                      />

                      <ListItem
                        key={1}
                        title={"Phone"}
                        textInput={true}
                        rightTitle={this.state.Phone.toString()}
                        //textInputValue={this.state.Phone}
                        hideChevron
                      />
                      <ListItem
                        key={2}
                        title={"Email"}
                        textInput={true}
                        rightTitle={this.state.Email}
                        //textInputValue={this.state.Email}
                        hideChevron
                      />
                       <ListItem
                        key={2}
                        title={"Facebook"}
                        textInput={true}
                        rightTitle={this.state.Facebook}
                        //textInputValue={this.state.Facebook}
                        hideChevron
                      />
                      <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        onPress={()=>this.onPressButton()}
                        backgroundColor='#03A9F4'
                        buttonStyle={{marginTop: 10, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Save' />
                    </Card>

            </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%',
    padding:'10%',
    backgroundColor:'#1FA2FF'
  },
})

export default Profile;
