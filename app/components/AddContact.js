import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Alert} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Contacts from 'react-native-contacts';

class AddContact extends React.Component{

    constructor(props){
        super(props);
        this.foo = '2332'
    }

    onPressButton(){
    	Alert.alert(
         'You have successfully added Wei'
      	)
        this.props.goBack();
    }

    render()
    {
        return(

                <View>
					<Card
					  containerStyle={{marginTop: 200}}
					  image={require('../../assets/profilePhoto.jpg')}
					  imageProps={{marginTop: 20, resizeMode: 'contain'}}>
					  <ListItem
				        key={0}
				        title={"Name: Wei Hang"}
				        hideChevron
				      />
					  <ListItem
				        key={1}
				        title={"Phone: 7732731448"}
				        hideChevron
				      />
					  <ListItem
				        key={2}
				        title={"E-mail: wehang2020@u.northwestesrn.edu"}
				        hideChevron
				      />
					  <Button
					  	icon={<Icon name='code' color='#ffffff' />}
					  	onPress={()=>this.onPressButton()}
					    backgroundColor='#03A9F4'
					    buttonStyle={{marginTop: 10, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
					    title='Add Contact' />
					</Card>
                </View>
        )
    }

}

export default AddContact;

