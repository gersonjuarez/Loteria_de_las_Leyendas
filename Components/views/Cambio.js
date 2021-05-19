import React from 'react'
import { ActivityIndicator,View,StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';

const Cambio = () => {
    return (
        <View style={{justifyContent:"center",alignItems:"center", alignContent:"center",backgroundColor: 'white',
        opacity: 0.7
        ,height:'25%'}}>

        <LottieView source={require('./Tabs/assets/cambio2.json')}  autoPlay loop />
               </View>
    )
}

export default Cambio
