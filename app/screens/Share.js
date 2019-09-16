import React from 'react';
import { FlatList, StyleSheet,Text, View, Image, Button, Icon } from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import TimerCountdown from 'react-native-timer-countdown';

class Share extends React.Component{

    constructor(props){
      super(props);
      this.state={
        input: true,
        wordList:[
             "able","also","ants","area","army","atom","away","baby","back","ball",
             "band","bank","bare","bark","barn","base","bean","bear","beat","been","bell","belt","bend",
             "bent","best","bill","bite","blew","blow","blue","boat","body","bone","book","born",
             "both","bowl","burn","burst","bus","bush","busy","cage","cake","call","calm","came","camp",
             "card","care","case","cast","cave","cell","cent","city","clay","club","coal","coat",
             "cold","come","cook","cool","copy","corn","cost","crew","crop","dark","date","dawn","dead","deal",
             "dear","deep","deer","desk","dirt","dish","does","done","door","down","dozen","draw","drew",
             "drop","duck","dull","dust","duty","each","earn","east","easy","eat","edge","else","end","even","ever",
             "face","fact", "fair","fall","farm","fast","fear","feed","feel","feet","fell","felt","few",
             "fill","film","find","fine","fire","firm","fish","five","flat","flew","flow","food","foot",
             "form","fort","four","free","from","fuel","full","gain","game","gate","gave","gift","girl","give","glad",
             "goes","gold","gone","good","gray","grew","grow","gulf","hair","half","hall","hand","hang","hard",
             "have","heat","held","help","herd","here","hide","high","hill","hold","hole","home","hope","horn",
             "hour","huge","hung","hunt","hurt","idea","inch","into","iron","jack","join","jump",
             "just","keep","kept","kids","kill","kind","knew","know","lack","lady","laid","lake","lamp","land","last","late","leaf",
             "left","life","lift","like","line","lion","lips","list","live","load","long","look","lose","loss","lost","loud",
             "love","luck","made","mail","main","make","many","mark","mass","meal","mean","meat","meet","mice","mile","milk","mill",
             "mind","mine","mood","moon","more","most","move","must","name","near","neck","nest","news","next","nice","nine",
             "none","noon","nose","note","noun","nuts","once","only","onto","open","over","pack","page","paid","pain",
             "pair","pale","park","part","pass","past","path","pick","pile","pine","pink","pipe","plan","play","plus","poem","poet",
             "pole","pond","pony","pool","poor","port","post","pour","pull","pure","push","race","rain","rate",
             "rays","read","real","rear","rest","rice","rich","ride","ring","rise","road","roar","rock",
             "roll","roof","room","root","rope","rose","rule","rush","safe","said","sail","sale","salt","same","sand","sang","save","seat","seed",
             "seems","seen","sell","send","sent","sets","ship","shoe","shop","shot","show","shut","sick",
             "sign","silk","sing","sink","size","skin","slip","slow","snow","soap","soft","soil","sold","some","song","soon","sort","spin","star","stay",
             "step","stop","such","suit","sure","swam","swim","tail","take","talk","tall","tank","tape","task",
             "team","tell","tent","term","test","than","that","thee","them","then","they","thin","this",
             "thou","thus","tide","till","time","tiny","told","tone","took","tool",
             "torn","town","trap","tree","trip","tube","tune","turn","type","unit","upon","vast","verb","very",
             "view","vote","wait","walk","wall","want","warm","warn","wash","wave","weak","wear","week",
             "well","went","were","west","wet","what","when","whom","wide","wife","wild","will","wind","wing","wire","wise","wish","with","wolf",
             "wood","wool","word","wore","work","yard","year","your","zero","zulu"
           ],
           code: "0000",
      }
    }


    onFinishCheckingCode(c){
      this.setState({
        input: false,
        code: c.toString()
      })
    }

    closeContact(){
      this.setState({
        input: true
      })
    }

    render()
    {
      if (this.state.input){
        return(
          <View style={{backgroundColor: '#CC99FF'}}>
            <Text style={{fontWeight: 'bold', marginTop:200, textAlign: 'center', fontSize: 32, padding:30}}>
              Enter 4-digit Code to share your profile
            </Text>
            <CodeInput
              ref="codeInputRef"
              activeColor='rgba(0, 0, 0, 1)'
              inactiveColor='rgba(0,0,0, 1.3)'
              codeLength={4}
              className='border-b'
              autoFocus={false}
              containerStyle={{marginTop: 150 }}
              codeInputStyle={{ fontWeight: '800' }}
              onFulfill={(code) => this.onFinishCheckingCode(code)}
            />
          </View>
        )
      }
      else{
        return(
          <View>
            <View  style={{backgroundColor: '#99CCFF'}}>
              <Text style={{backgroundColor: '#99CCFF', fontWeight: 'bold', marginTop:200, textAlign: 'center', fontSize: 32}}>
                You are sharing your profile at {"\n\n"}
                {this.state.code}
                {"\n\n"}
              </Text>
            </View>
            <Text style={{textAlign: 'center', fontSize: 20}}>
            {"\n Time to expire:"}
            </Text>
            <TimerCountdown
                initialSecondsRemaining={1000*300}
                onTick={secondsRemaining => console.log('tick', secondsRemaining)}
                onTimeElapsed={() => console.log('complete')}
                allowFontScaling={true}
                style={{ textAlign: 'center', marginTop: 20, fontSize: 20 }}
            />

            <Button
                onPress={()=>this.closeContact()}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Stop sharing now' />
          </View>
        )
      }
    }

}



export default Share;
