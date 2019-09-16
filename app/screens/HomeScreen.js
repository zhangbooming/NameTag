import React from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements'
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import CodeInput from 'react-native-confirmation-code-input';
import TimerCountdown from 'react-native-timer-countdown';
import Emoji from 'react-native-emoji';
import firebase from '../../config/config.js';
import UserAuth from '../components/auth.js'

class Home extends React.Component {

  constructor(props) {
    super(props);
    console.disableYellowBox = true
    this.state = {
      loggedin: false,
      userId: '',
      phoneNumberCheck: true,
      emailCheck: true,
      linkedinCheck: true,
      facebookCheck: true,
      startGroup: false,
      joinGroup: false,
      groupcode: 'testcode',
      groupusers: [],
    }
    this.wordList = [
      "able", "also", "ants", "area", "army", "atom", "away", "baby", "back", "ball",
      "band", "bank", "bare", "bark", "barn", "base", "bean", "bear", "beat", "been", "bell", "belt", "bend",
      "bent", "best", "bill", "bite", "blew", "blow", "blue", "boat", "body", "bone", "book", "born",
      "both", "bowl", "burn", "bush", "busy", "cage", "cake", "call", "calm", "came", "camp",
      "card", "care", "case", "cast", "cave", "cell", "cent", "city", "clay", "club", "coal", "coat",
      "cold", "come", "cook", "cool", "copy", "corn", "cost", "crew", "crop", "dark", "date", "dawn", "dead", "deal",
      "dear", "deep", "deer", "desk", "dirt", "dish", "does", "done", "door", "down", "draw", "drew",
      "drop", "duck", "dull", "dust", "duty", "each", "earn", "east", "easy", "eat", "edge", "else", "end", "even", "ever",
      "face", "fact", "fair", "fall", "farm", "fast", "fear", "feed", "feel", "feet", "fell", "felt",
      "fill", "film", "find", "fine", "fire", "firm", "fish", "five", "flat", "flew", "flow", "food", "foot",
      "form", "fort", "four", "free", "from", "fuel", "full", "gain", "game", "gate", "gave", "gift", "girl", "give", "glad",
      "goes", "gold", "gone", "good", "gray", "grew", "grow", "gulf", "hair", "half", "hall", "hand", "hang", "hard",
      "have", "heat", "held", "help", "herd", "here", "hide", "high", "hill", "hold", "hole", "home", "hope", "horn",
      "hour", "huge", "hung", "hunt", "hurt", "idea", "inch", "into", "iron", "jack", "join", "jump",
      "just", "keep", "kept", "kids", "kill", "kind", "knew", "know", "lack", "lady", "laid", "lake", "lamp", "land", "last", "late", "leaf",
      "left", "life", "lift", "like", "line", "lion", "lips", "list", "live", "load", "long", "look", "lose", "loss", "lost", "loud",
      "love", "luck", "made", "mail", "main", "make", "many", "mark", "mass", "meal", "mean", "meat", "meet", "mice", "mile", "milk", "mill",
      "mind", "mine", "mood", "moon", "more", "most", "move", "must", "name", "near", "neck", "nest", "news", "next", "nice", "nine",
      "none", "noon", "nose", "note", "noun", "nuts", "once", "only", "onto", "open", "over", "pack", "page", "paid", "pain",
      "pair", "pale", "park", "part", "pass", "past", "path", "pick", "pile", "pine", "pink", "pipe", "plan", "play", "plus", "poem", "poet",
      "pole", "pond", "pony", "pool", "poor", "port", "post", "pour", "pull", "pure", "push", "race", "rain", "rate",
      "rays", "read", "real", "rear", "rest", "rice", "rich", "ride", "ring", "rise", "road", "roar", "rock",
      "roll", "roof", "room", "root", "rope", "rose", "rule", "rush", "safe", "said", "sail", "sale", "salt", "same", "sand", "sang", "save", "seat", "seed",
      "seen", "sell", "send", "sent", "sets", "ship", "shoe", "shop", "shot", "show", "shut", "sick",
      "sign", "silk", "sing", "sink", "size", "skin", "slip", "slow", "snow", "soap", "soft", "soil", "sold", "some", "song", "soon", "sort", "spin", "star", "stay",
      "step", "stop", "such", "suit", "sure", "swam", "swim", "tail", "take", "talk", "tall", "tank", "tape", "task",
      "team", "tell", "tent", "term", "test", "than", "that", "thee", "them", "then", "they", "thin", "this",
      "thou", "thus", "tide", "till", "time", "tiny", "told", "tone", "took", "tool",
      "torn", "town", "trap", "tree", "trip", "tube", "tune", "turn", "type", "unit", "upon", "vast", "verb", "very",
      "view", "vote", "wait", "walk", "wall", "want", "warm", "warn", "wash", "wave", "weak", "wear", "week",
      "well", "went", "were", "west", "what", "when", "whom", "wide", "wife", "wild", "will", "wind", "wing", "wire", "wise", "wish", "with", "wolf",
      "wood", "wool", "word", "wore", "work", "yard", "year", "your", "zero", "zulu"
    ]
  }

  generateRandomNumber(min, max) {
    let random_number = Math.random() * (max - min) + min;
    return Math.floor(random_number);
  }

  generateCode() {
    this.state.groupcode = this.wordList[this.generateRandomNumber(0, this.wordList.length)];
  }


  componentDidMount = () => {
    var that = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        that.setState({
          loggedin: true,
          userId: user.uid
        });
        var UserId = user.uid;
        console.log("UserId:::" + UserId)
        firebase.database().ref('Users/' + UserId).once('value').then(function (snapshot) {
          console.log("Have send the request...")
          const exists = (snapshot.val() != null);
          if (exists) {
            Email = snapshot.val().Email
            console.log("Email::", Email)
            Phone = snapshot.val().Phone
            console.log("Phone::", Phone)
            UserName = snapshot.val().UserName
            console.log("UserName::", UserName)
            LinkedIn = snapshot.val().LinkedIn
            console.log("LinkedIn::", LinkedIn)
            Facebook = snapshot.val().Facebook
            console.log("Facebook::", Facebook)
            Image1 = snapshot.val().Image;
            console.log("Image1::", Image1);
            console.log("Email:", Email, "Phone", Phone, "UserName", UserName, "LinkedIn", LinkedIn, "Facebook", Facebook, "Image1", Image1)
            that.setValue(Email, Phone, UserName, LinkedIn, Facebook, Image1)
          }
        }).catch(error => console.log(error));

      } else {
        that.setState({
          loggedin: false
        })
      }
    })

  }

  setValue(Email, Phone, UserName, LinkedIn, Facebook, Image1) {
    this.setState({
      Email: Email,
      Phone: Phone,
      UserName: UserName,
      LinkedIn: LinkedIn,
      Facebook: Facebook,
      Image: Image1
    })
    console.log("success");
  }

  userLogout() {
    firebase.auth().signOut();
  }


  createGroup(userId) {
    var that = this;
    this.generateCode()
    firebase.database().ref('Groups').once('value')
      .then((snapshot) => {
        const exists = (snapshot.val() != null);
        if (exists) {
          codeDict = snapshot.val()
          // console.warn(codeDict)
          for (var key in codeDict) {
            if (codeDict[key] == '') {
              this.setState({ groupcode: key });
            }
          }
        }
      })
    firebase.database().ref('Groups/' + this.state.groupcode).set([userId]);
    setTimeout(function () { that.navtoGroup() }, 500);
  }


  navtoGroup() {
    this.props.navigation.navigate('Group', { groupcode: this.state.groupcode })
  }

  navtoEnterCode() {
    this.props.navigation.navigate('EnterCode', { userId: this.state.userId })
  }

  // Email: Email,
  // Phone: Phone,
  // UserName: UserName,
  // LinkedIn: LinkedIn,
  // Facebook: Facebook,
  // Image: Image1
  navtoProfile() {
    this.props.navigation.navigate('Profile',
    { userId: this.state.userId,
      Email:this.state.Email,
      UserName:this.state.UserName,
      LinkedIn:this.state.LinkedIn,
      Facebook:this.state.Facebook,
      Image:this.state.Image,
      Phone:this.state.Phone
     })
  }

  render() {
    return (



      <View style={styles.container}>
        {this.state.loggedin == true ? (
          <View>
          <View style={{alignItems:'flex-end'}}>
          <TouchableOpacity
style={styles.profileButton}
            onPress={(() => this.navtoProfile())}>
            <Emoji name="busts_in_silhouette" style={{fontSize:33}} />
                        </TouchableOpacity>
                        </View>

          <Emoji name="wave" style={{fontSize: 33, marginTop:20}} />
            <Text style={styles.welcomeText}>Welcome back, {this.state.UserName}.</Text>


            <View style={styles.checkContainer}>
            <CheckBox style={styles.checkbox}
              title='Phone Number'
              checked={this.state.phoneNumberCheck}
              onPress={() => this.setState({ phoneNumberCheck: !this.state.phoneNumberCheck })}
            />

            <CheckBox style={styles.checkbox}
              title='Email'
              checked={this.state.emailCheck}
              onPress={() => this.setState({ emailCheck: !this.state.emailCheck })}
            />

            <CheckBox style={styles.checkbox}
              title='Facebook'
              checked={this.state.facebookCheck}
              onPress={() => this.setState({ facebookCheck: !this.state.facebookCheck })}
            />
            <View style={styles.buttonRow}>

            <TouchableOpacity style={styles.customButtonSmall}
              loading
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              onPress={() => this.createGroup(this.state.userId)}
            >
              <Text style={styles.customButtonText}>START</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.customButtonSmall}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              onPress={() => this.navtoEnterCode()}>
              <Text style={styles.customButtonText}> JOIN </Text>
            </TouchableOpacity>
            </View>
            </View>

            <TouchableOpacity onPress={() => this.userLogout()}
              style={styles.customButton}
            ><Text style={styles.customButtonText} > LOG OUT</Text></TouchableOpacity>
          </View>
        ) : (
            <View>
              <UserAuth message="please login to use NameTag"></UserAuth>
            </View>
          )}

      </View>

    );
  }


}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:'100%',
    padding:'10%',
    backgroundColor:'#1FA2FF'
  },
  checkbox: {
    margin: 100,
    height: 100,
    borderColor: '#7a42f4',
    borderWidth: 1,
    paddingTop: 100,
    backgroundColor: '#000',
    padding: 200,
  },
  customButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
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
  customButtonSmall: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 15,
    paddingHorizontal: 30,
    marginTop:12,
    paddingVertical: 10,
    borderColor:'#1FA2FF',
    backgroundColor: '#1FA2FF',
    borderWidth:2,
    borderRadius: 100,
  },
  customButtonSmallText: {
    color: '#1FA2FF',
    fontWeight: '700',
    letterSpacing: 1,
  },
  customButtonText: {
    color: 'white',
    fontWeight: '700',
    letterSpacing: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 25
  },
  profileButton:{
    marginRight: 0,
    marginTop: 45,
    backgroundColor:'white',
    borderRadius:100,
    padding:10,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowColor: 'black',
    shadowOffset: { height: 5, width: 5 },
  },
  checkContainer:{
    backgroundColor:'white',
    borderRadius:4,
    padding:10,
    paddingTop:30,
    paddingBottom:10,
    shadowOpacity: 0.23,
    shadowRadius: 24,
    shadowColor: 'black',
    shadowOffset: { height: 10, width: 10 },
  },
  buttonRow:{
    alignItems: 'flex-start',
    justifyContent:'flex-start',
flexDirection:'row',
  }


})

export default Home;
