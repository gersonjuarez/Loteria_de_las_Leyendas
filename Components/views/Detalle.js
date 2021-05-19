import React from 'react'
import { View, Text, StyleSheet,Button} from 'react-native';

const Detalle = ({navigation}) => {
    return (
       
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
        <Button 
        title='Quedarse en este componente'
        onPress={()=>navigation.push("Detalle")}
        />
         <Button 
        title='Regresar a Inicio'
        onPress={()=>navigation.navigate("Inicio")}
        />
         <Button 
        title='Atras'
        onPress={()=>navigation.goBack()}
        />

        <Button 
        title='Regresar a la primer pantalla'
        onPress={()=>navigation.popToTop()}
        />
      </View>


    )
}

export default Detalle;
