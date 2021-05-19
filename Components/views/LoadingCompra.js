import React from 'react'
import { View} from 'react-native';


import LottieView from 'lottie-react-native';


const LoadingCompra = ({loadCambio}) => {




    return (
       <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:'white',opacity:0.8}}>

        <LottieView
        
        source={loadCambio} autoPlay loop />
        
       </View>
    )
}

export default LoadingCompra;