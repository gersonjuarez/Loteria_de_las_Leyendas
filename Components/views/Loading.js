import React,{useEffect} from 'react'
import { View,Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import LottieView from 'lottie-react-native';


const Loading = ({navigation}) => {




    return (
       <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

        <Image  source={require('./Tabs/assets/gato.gif')} resizeMode='contain' style={{width:'50%',height:'50%'}}   />

       </View>
    )
}

export default Loading;
